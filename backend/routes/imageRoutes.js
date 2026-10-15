// imageRoutes.js — Food image analysis via Google Gemini Vision AI
const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

/**
 * POST /api/image/analyze-gemini
 * Body: { imageBase64: "<base64 string or data URI>" }
 * Returns: structured nutrition data analyzed by Gemini Vision
 */
router.post('/analyze-gemini', async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'No image provided. Send imageBase64 in request body.' });
    }

    if (!genAI) {
      return res.status(500).json({ error: 'GEMINI_API_KEY not configured on server.' });
    }

    // Strip data URI prefix if present (e.g. "data:image/jpeg;base64,...")
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a professional nutritionist AI. Carefully analyze this food image and return ONLY a valid JSON object (no markdown, no code fences, no extra explanation) with this exact structure:
{
  "detectedFoods": ["food name 1", "food name 2"],
  "totalNutrition": {
    "calories": <number>,
    "protein": <number in grams>,
    "carbs": <number in grams>,
    "fat": <number in grams>,
    "fiber": <number in grams>,
    "sugar": <number in grams>
  },
  "items": [
    {
      "name": "food name",
      "servingSize": "estimated portion e.g. 200g",
      "calories": <number>,
      "protein": <number>,
      "carbs": <number>,
      "fat": <number>,
      "fiber": <number>,
      "sugar": <number>,
      "healthScore": <number 1-10>
    }
  ],
  "healthInsights": "2-3 sentence health summary of this meal",
  "mealCategory": "breakfast|lunch|dinner|snack"
}
Be as accurate as possible with nutrition estimates based on typical serving sizes for the food items visible.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Data
        }
      }
    ]);

    const responseText = result.response.text();
    console.log('🤖 Gemini raw response (first 200 chars):', responseText.substring(0, 200));

    // Extract JSON from response (Gemini sometimes wraps in markdown code fences)
    let jsonStr = responseText;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) jsonStr = jsonMatch[0];

    let nutritionData;
    try {
      nutritionData = JSON.parse(jsonStr);
    } catch (parseErr) {
      console.error('❌ Failed to parse Gemini JSON response:', responseText);
      return res.status(500).json({
        error: 'Failed to parse AI response as JSON',
        rawResponse: responseText
      });
    }

    console.log(`✅ Gemini analyzed food: ${(nutritionData.detectedFoods || []).join(', ')}`);

    res.json({
      success: true,
      source: 'Google Gemini Vision AI',
      nutrition: nutritionData
    });

  } catch (error) {
    console.error('❌ Gemini image analysis error:', error.message);
    res.status(500).json({
      error: 'Image analysis failed',
      message: error.message
    });
  }
});

module.exports = router;
