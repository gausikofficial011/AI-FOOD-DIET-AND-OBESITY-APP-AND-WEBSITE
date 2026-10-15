const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const mongoose = require('mongoose');

// Save text food analysis to Chat collection
router.post('/save-analysis', async (req, res) => {
  try {
    const { 
      userId,
      foodInput,
      items,
      mealType = 'snack',
      date,
      nutritionData,
      totalCalories = 0
    } = req.body;

    console.log('📝 Saving text food analysis to Chat collection...');
    console.log('👤 User ID:', userId);
    console.log('📄 Input:', foodInput);
    console.log('🍽️ Items count:', items?.length);

    // Validate required fields
    if (!userId || !foodInput || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Create nutrition message
    const nutritionMessage = createNutritionMessage(items, foodInput, totalCalories, mealType);
    
    // Create chat message object
    const chatMessage = {
      role: 'text_analysis', // Changed to 'text_analysis' to match enum
      content: nutritionMessage,
      source: 'text_analysis',
      isImageAnalysis: false,
      metadata: {
        analysisType: 'text_food_analysis',
        foodInput: foodInput,
        mealType: mealType,
        date: date || new Date().toISOString(),
        itemsCount: items.length,
        totalCalories: totalCalories,
        items: items.map(item => ({
          name: item.name,
          calories: item.calories,
          protein: item.protein_g,
          carbs: item.carbohydrates_total_g,
          fat: item.fat_total_g,
          fiber: item.fiber_g,
          sugar: item.sugar_g,
          servingSize: item.serving_size_g
        }))
      },
      nutritionData: nutritionData || {},
      timestamp: new Date()
    };

    // Create new chat entry for text analysis
    const chat = new Chat({
      user: new mongoose.Types.ObjectId(userId),
      messages: [
        // Add user message (what they searched)
        {
          role: 'user',
          content: `Food Analysis Request: "${foodInput}"`,
          timestamp: new Date(),
          metadata: {
            requestType: 'food_analysis',
            foodInput: foodInput,
            mealType: mealType
          }
        },
        // Add bot response with analysis
        chatMessage
      ],
      title: `Food Text Analysis - ${new Date().toLocaleDateString()}`,
      hasImageAnalysis: false,
      metadata: {
        analysisType: 'text_food',
        foodInput: foodInput,
        mealType: mealType,
        totalItems: items.length,
        totalCalories: totalCalories
      }
    });

    await chat.save();
    console.log('✅ Text analysis saved to Chat collection:', chat._id);

    res.status(201).json({
      success: true,
      message: 'Food analysis saved to chat successfully',
      data: {
        chatId: chat._id,
        messageId: chat.messages[1]._id,
        itemsCount: items.length,
        totalCalories: totalCalories
      },
      chat: {
        id: chat._id,
        title: chat.title,
        createdAt: chat.createdAt
      }
    });

  } catch (error) {
    console.error('💥 Error saving text analysis:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Helper function to create nutrition message
function createNutritionMessage(items, foodInput, totalCalories, mealType) {
  let message = `📊 **Text Food Analysis Results**\n\n`;
  message += `**Food Description:** ${foodInput}\n`;
  message += `**Meal Type:** ${mealType.charAt(0).toUpperCase() + mealType.slice(1)}\n`;
  message += `**Analysis Date:** ${new Date().toLocaleDateString()}\n\n`;
  
  message += `**Detected Food Items:**\n`;
  items.forEach((item, index) => {
    const itemName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
    message += `${index + 1}. **${itemName}**\n`;
    message += `   • Calories: ${item.calories?.toFixed(0) || 0} kcal\n`;
    message += `   • Protein: ${item.protein_g?.toFixed(1) || 0}g\n`;
    message += `   • Carbs: ${item.carbohydrates_total_g?.toFixed(1) || 0}g\n`;
    message += `   • Fat: ${item.fat_total_g?.toFixed(1) || 0}g\n`;
    if (item.fiber_g) message += `   • Fiber: ${item.fiber_g.toFixed(1)}g\n`;
    if (item.sugar_g) message += `   • Sugar: ${item.sugar_g.toFixed(1)}g\n`;
    if (item.serving_size_g) message += `   • Serving: ${item.serving_size_g}g\n`;
    message += `\n`;
  });
  
  message += `**Total Nutrition Summary:**\n`;
  const totalProtein = items.reduce((sum, item) => sum + (item.protein_g || 0), 0);
  const totalCarbs = items.reduce((sum, item) => sum + (item.carbohydrates_total_g || 0), 0);
  const totalFat = items.reduce((sum, item) => sum + (item.fat_total_g || 0), 0);
  const totalFiber = items.reduce((sum, item) => sum + (item.fiber_g || 0), 0);
  const totalSugar = items.reduce((sum, item) => sum + (item.sugar_g || 0), 0);
  
  message += `• **Total Calories:** ${totalCalories.toFixed(0)} kcal\n`;
  message += `• **Total Protein:** ${totalProtein.toFixed(1)}g\n`;
  message += `• **Total Carbs:** ${totalCarbs.toFixed(1)}g\n`;
  message += `• **Total Fat:** ${totalFat.toFixed(1)}g\n`;
  if (totalFiber > 0) message += `• **Total Fiber:** ${totalFiber.toFixed(1)}g\n`;
  if (totalSugar > 0) message += `• **Total Sugar:** ${totalSugar.toFixed(1)}g\n`;
  
  message += `\n**Analysis saved to your chat history!**`;
  
  return message;
}

// Get user's text analysis history
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const chats = await Chat.find({
      user: new mongoose.Types.ObjectId(userId),
      'messages.source': 'text_analysis'
    })
    .sort({ createdAt: -1 })
    .limit(50);
    
    const analysisHistory = chats.map(chat => {
      const analysisMessage = chat.messages.find(msg => 
        msg.source === 'text_analysis'
      );
      
      return {
        chatId: chat._id,
        title: chat.title,
        date: chat.createdAt,
        foodInput: chat.metadata?.foodInput || analysisMessage?.metadata?.foodInput || '',
        mealType: chat.metadata?.mealType || analysisMessage?.metadata?.mealType || 'snack',
        itemsCount: chat.metadata?.totalItems || analysisMessage?.metadata?.itemsCount || 0,
        totalCalories: chat.metadata?.totalCalories || analysisMessage?.metadata?.totalCalories || 0,
        analysis: analysisMessage?.metadata || null
      };
    });
    
    res.json({
      success: true,
      count: analysisHistory.length,
      history: analysisHistory
    });
    
  } catch (error) {
    console.error('Error getting analysis history:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;