// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/auth');
// const Meal = require('../models/Meal');
// const WaterIntake = require('../models/WaterIntake');
// const moment = require('moment');

// // @route   POST /api/export/export
// // @desc    Export nutrition data
// router.post('/export', protect, async (req, res) => {
//   try {
//     const { format, startDate, endDate } = req.body;

//     // Fetch data
//     const meals = await Meal.find({
//       user: req.user._id,
//       date: {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate)
//       }
//     }).populate('entries.food');

//     const waterIntakes = await WaterIntake.find({
//       user: req.user._id,
//       date: {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate)
//       }
//     });

//     if (format === 'excel') {
//       // For now, return JSON
//       const data = {
//         meals: meals.map(m => ({
//           date: m.date,
//           mealType: m.mealType,
//           entries: m.entries.map(e => ({
//             food: e.food.name,
//             amount: e.servingAmount,
//             nutrition: e.food.nutrition
//           })),
//           totalNutrition: m.totalNutrition
//         })),
//         waterIntakes: waterIntakes.map(w => ({
//           date: w.date,
//           amount: w.amount,
//           unit: w.unit
//         }))
//       };

//       res.setHeader('Content-Type', 'application/json');
//       res.setHeader('Content-Disposition', `attachment; filename=nutrition-data-${startDate}-${endDate}.json`);
//       return res.json(data);
//     }

//     res.status(400).json({ message: 'Invalid format' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // @route   POST /api/export/import
// // @desc    Import nutrition data
// router.post('/import', protect, async (req, res) => {
//   try {
//     const { format, data } = req.body;

//     let importedCount = 0;

//     if (format === 'json' && data.meals) {
//       for (const mealData of data.meals) {
//         const meal = new Meal({
//           user: req.user._id,
//           date: mealData.date,
//           mealType: mealData.mealType,
//           entries: mealData.entries,
//           totalNutrition: mealData.totalNutrition
//         });

//         await meal.save();
//         importedCount++;
//       }
//     }

//     res.json({
//       message: `Successfully imported ${importedCount} records`,
//       count: importedCount
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
// new
// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/auth');
// const Meal = require('../models/Meal');
// const WaterIntake = require('../models/WaterIntake');
// const User = require('../models/User');
// const Food = require('../models/Food');
// const Recipe = require('../models/Recipe');
// const moment = require('moment');
// const ExcelJS = require('exceljs');
// const mongoose = require('mongoose');
// const axios = require('axios'); // Add axios for API calls

// // @route   POST /api/export/export
// // @desc    Export user data including BMI, meals
// router.post('/export', protect, async (req, res) => {
//   try {
//     const { format, startDate, endDate } = req.body;
//     const userId = req.user._id;

//     console.log(`Export request for user ${userId} from ${startDate} to ${endDate}`);

//     // Get user details
//     const user = await User.findById(userId).select('-password');
//     console.log('User found:', user?.username);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Calculate BMI
//     const bmi = calculateBMI(user);
//     console.log('BMI:', bmi);

//     // Fetch all meals - NO POPULATION needed since food is Mixed type
//     const meals = await Meal.find({
//       user: userId,
//       date: {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate)
//       }
//     }).sort({ date: -1 });

//     console.log('Meals found:', meals.length);

//     if (format === 'excel') {
//       // Create workbook
//       const workbook = new ExcelJS.Workbook();
//       workbook.creator = 'Nutrition App';
//       workbook.created = new Date();

//       // ========== 1. User Profile Sheet ==========
//       const userSheet = workbook.addWorksheet('User Profile');
//       userSheet.columns = [
//         { header: 'Field', key: 'field', width: 25 },
//         { header: 'Value', key: 'value', width: 35 }
//       ];

//       userSheet.addRows([
//         { field: 'Username', value: user.username },
//         { field: 'Email', value: user.email },
//         { field: 'Full Name', value: user.profile?.fullName || 'N/A' },
//         { field: 'Date of Birth', value: user.profile?.dateOfBirth ? 
//           moment(user.profile.dateOfBirth).format('YYYY-MM-DD') : 'N/A' },
//         { field: 'Gender', value: user.profile?.gender || 'N/A' },
//         { field: 'Height', value: user.profile?.height ? 
//           `${user.profile.height.value} ${user.profile.height.unit}` : 'N/A' },
//         { field: 'Weight', value: user.profile?.weight ? 
//           `${user.profile.weight.value} ${user.profile.weight.unit}` : 'N/A' },
//         { field: 'Activity Level', value: user.profile?.activityLevel || 'N/A' },
//         { field: 'BMI', value: bmi },
//         { field: 'BMI Category', value: getBMICategory(bmi) },
//         { field: 'Daily Calorie Target', value: user.dailyTargets?.calories || 2000 },
//         { field: 'Account Created', value: moment(user.createdAt).format('YYYY-MM-DD HH:mm') }
//       ]);

//       // ========== 2. Meals Log Sheet ==========
//       const mealsLogSheet = workbook.addWorksheet('Meals Log');
//       mealsLogSheet.columns = [
//         { header: 'Date', key: 'date', width: 15 },
//         { header: 'Meal Type', key: 'mealType', width: 12 },
//         { header: 'Food Name/Recipe', key: 'foodName', width: 30 },
//         { header: 'Amount', key: 'amount', width: 10 },
//         { header: 'Unit', key: 'unit', width: 10 },
//         { header: 'Calories (kcal)', key: 'calories', width: 15 },
//         { header: 'Protein (g)', key: 'protein', width: 12 },
//         { header: 'Carbs (g)', key: 'carbs', width: 12 },
//         { header: 'Fat (g)', key: 'fat', width: 12 }
//       ];

//       // Process each meal entry
//       for (const meal of meals) {
//         console.log(`Processing meal with ${meal.entries.length} entries`);
        
//         for (const entry of meal.entries) {
//           let foodName = 'Unknown';
//           let unit = 'serving';
//           let nutrition = { calories: 0, protein: 0, carbs: 0, fat: 0 };
          
//           // Check what type of food entry we have
//           if (typeof entry.food === 'string') {
//             if (entry.food.startsWith('recipe-')) {
//               // It's a recipe from dummyjson API
//               const recipeId = entry.food.replace('recipe-', '');
//               console.log(`Fetching recipe ${recipeId} from API`);
              
//               try {
//                 const response = await axios.get(`https://dummyjson.com/recipes/${recipeId}`);
//                 const recipe = response.data;
//                 foodName = recipe.name || recipe.title || `Recipe ${recipeId}`;
                
//                 // Use nutrition from recipe if available
//                 if (recipe.nutrition) {
//                   nutrition = recipe.nutrition;
//                 } else {
//                   // Estimate nutrition based on tags (same as in MealSchema)
//                   const tags = recipe.tags || [];
//                   nutrition = {
//                     calories: recipe.caloriesPerServing || 300,
//                     protein: estimateProtein(tags),
//                     carbs: estimateCarbs(tags),
//                     fat: estimateFat(tags)
//                   };
//                 }
//               } catch (error) {
//                 console.error(`Error fetching recipe ${recipeId}:`, error.message);
//                 foodName = `Recipe ${recipeId} (API Error)`;
//               }
//             } else if (mongoose.Types.ObjectId.isValid(entry.food)) {
//               // It's an ObjectId string - try to find in Food collection
//               const food = await Food.findById(entry.food);
//               if (food) {
//                 foodName = food.name;
//                 unit = food.servingSize?.unit || 'serving';
//                 nutrition = food.nutrition || nutrition;
//               } else {
//                 foodName = 'Food (Not Found)';
//               }
//             } else {
//               // It's just a string (custom food name)
//               foodName = entry.food;
//             }
//           } else if (entry.food && entry.food._id) {
//             // Already populated or has structure
//             if (entry.food.name) {
//               foodName = entry.food.name;
//               unit = entry.food.servingSize?.unit || 'serving';
//               nutrition = entry.food.nutrition || nutrition;
//             } else if (entry.food.title) {
//               foodName = entry.food.title;
//               nutrition = entry.food.nutrition || nutrition;
//             }
//           }
          
//           // Calculate nutrition based on serving amount
//           const servingAmount = entry.servingAmount || 1;
//           const calculatedCalories = (nutrition.calories || 0) * servingAmount;
//           const calculatedProtein = (nutrition.protein || 0) * servingAmount;
//           const calculatedCarbs = (nutrition.carbs || 0) * servingAmount;
//           const calculatedFat = (nutrition.fat || 0) * servingAmount;

//           mealsLogSheet.addRow({
//             date: moment(meal.date).format('YYYY-MM-DD HH:mm'),
//             mealType: meal.mealType || 'meal',
//             foodName: foodName,
//             amount: servingAmount,
//             unit: unit,
//             calories: calculatedCalories,
//             protein: calculatedProtein,
//             carbs: calculatedCarbs,
//             fat: calculatedFat
//           });
//         }
//       }

//       // ========== 3. Meal Summary Sheet ==========
//       const summarySheet = workbook.addWorksheet('Meal Summary');
//       summarySheet.columns = [
//         { header: 'Date', key: 'date', width: 12 },
//         { header: 'Meals Count', key: 'mealsCount', width: 12 },
//         { header: 'Food Items', key: 'foodItems', width: 12 },
//         { header: 'Total Calories', key: 'totalCalories', width: 15 },
//         { header: 'Total Protein (g)', key: 'totalProtein', width: 15 },
//         { header: 'Total Carbs (g)', key: 'totalCarbs', width: 15 },
//         { header: 'Total Fat (g)', key: 'totalFat', width: 15 }
//       ];

//       // Group meals by date
//       const mealsByDate = {};
//       meals.forEach(meal => {
//         const dateStr = moment(meal.date).format('YYYY-MM-DD');
//         if (!mealsByDate[dateStr]) {
//           mealsByDate[dateStr] = {
//             meals: 0,
//             foodItems: 0,
//             totals: {
//               calories: 0,
//               protein: 0,
//               carbs: 0,
//               fat: 0
//             }
//           };
//         }
//         mealsByDate[dateStr].meals += 1;
//         mealsByDate[dateStr].foodItems += meal.entries.length;
//         mealsByDate[dateStr].totals.calories += meal.totalNutrition?.calories || 0;
//         mealsByDate[dateStr].totals.protein += meal.totalNutrition?.protein || 0;
//         mealsByDate[dateStr].totals.carbs += meal.totalNutrition?.carbs || 0;
//         mealsByDate[dateStr].totals.fat += meal.totalNutrition?.fat || 0;
//       });

//       // Add rows to summary
//       Object.keys(mealsByDate).sort().reverse().forEach(dateStr => {
//         const dayData = mealsByDate[dateStr];
//         summarySheet.addRow({
//           date: dateStr,
//           mealsCount: dayData.meals,
//           foodItems: dayData.foodItems,
//           totalCalories: dayData.totals.calories.toFixed(1),
//           totalProtein: dayData.totals.protein.toFixed(1),
//           totalCarbs: dayData.totals.carbs.toFixed(1),
//           totalFat: dayData.totals.fat.toFixed(1)
//         });
//       });

//       // ========== 4. Export Summary Sheet ==========
//       const exportSummarySheet = workbook.addWorksheet('Export Summary');
//       exportSummarySheet.columns = [
//         { header: 'Data Type', key: 'type', width: 25 },
//         { header: 'Count', key: 'count', width: 15 },
//         { header: 'Date Range', key: 'range', width: 30 }
//       ];

//       const totalFoodEntries = meals.reduce((acc, meal) => acc + meal.entries.length, 0);

//       exportSummarySheet.addRows([
//         { type: 'User Profile', count: 1, range: 'N/A' },
//         { type: 'Meals Logged', count: meals.length, range: `${moment(startDate).format('YYYY-MM-DD')} to ${moment(endDate).format('YYYY-MM-DD')}` },
//         { type: 'Food Entries', count: totalFoodEntries, range: 'N/A' },
//         { type: 'Export Date', count: '', range: moment().format('YYYY-MM-DD HH:mm:ss') }
//       ]);

//       // Style headers
//       workbook.worksheets.forEach(worksheet => {
//         const headerRow = worksheet.getRow(1);
//         headerRow.font = { bold: true, size: 12 };
//         headerRow.fill = {
//           type: 'pattern',
//           pattern: 'solid',
//           fgColor: { argb: 'FF4F81BD' }
//         };
//         headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
//       });

//       // Set response headers
//       res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//       res.setHeader('Content-Disposition', `attachment; filename=nutrition-data-${user.username}-${moment().format('YYYY-MM-DD-HHmm')}.xlsx`);

//       // Write to response
//       await workbook.xlsx.write(res);
//       res.end();
      
//       console.log('Export completed successfully');
      
//     } else if (format === 'json') {
//       // Process meals for JSON export
//       const mealsWithDetails = [];
      
//       for (const meal of meals) {
//         const entriesWithDetails = [];
        
//         for (const entry of meal.entries) {
//           let foodDetails = {
//             name: 'Unknown',
//             type: 'unknown',
//             nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }
//           };
          
//           if (typeof entry.food === 'string') {
//             if (entry.food.startsWith('recipe-')) {
//               const recipeId = entry.food.replace('recipe-', '');
//               foodDetails.type = 'recipe';
              
//               try {
//                 const response = await axios.get(`https://dummyjson.com/recipes/${recipeId}`);
//                 const recipe = response.data;
//                 foodDetails.name = recipe.name || recipe.title || `Recipe ${recipeId}`;
                
//                 if (recipe.nutrition) {
//                   foodDetails.nutrition = recipe.nutrition;
//                 } else {
//                   const tags = recipe.tags || [];
//                   foodDetails.nutrition = {
//                     calories: recipe.caloriesPerServing || 300,
//                     protein: estimateProtein(tags),
//                     carbs: estimateCarbs(tags),
//                     fat: estimateFat(tags)
//                   };
//                 }
//               } catch (error) {
//                 foodDetails.name = `Recipe ${recipeId} (API Error)`;
//               }
//             } else if (mongoose.Types.ObjectId.isValid(entry.food)) {
//               const food = await Food.findById(entry.food);
//               if (food) {
//                 foodDetails.name = food.name;
//                 foodDetails.type = 'food';
//                 foodDetails.nutrition = food.nutrition || foodDetails.nutrition;
//               }
//             } else {
//               foodDetails.name = entry.food;
//               foodDetails.type = 'custom';
//             }
//           }
          
//           entriesWithDetails.push({
//             food: foodDetails,
//             servingAmount: entry.servingAmount || 1
//           });
//         }
        
//         mealsWithDetails.push({
//           date: meal.date,
//           mealType: meal.mealType,
//           entries: entriesWithDetails,
//           totalNutrition: meal.totalNutrition
//         });
//       }

//       // JSON export data
//       const data = {
//         exportInfo: {
//           exportedAt: new Date(),
//           dateRange: { start: startDate, end: endDate },
//           user: userId,
//           format: 'json'
//         },
//         user: {
//           profile: {
//             username: user.username,
//             email: user.email,
//             fullName: user.profile?.fullName,
//             dateOfBirth: user.profile?.dateOfBirth,
//             gender: user.profile?.gender,
//             height: user.profile?.height,
//             weight: user.profile?.weight,
//             activityLevel: user.profile?.activityLevel,
//             bmi: bmi,
//             bmiCategory: getBMICategory(bmi)
//           },
//           dailyTargets: user.dailyTargets
//         },
//         meals: mealsWithDetails,
//         summary: {
//           totalMeals: meals.length,
//           totalFoodEntries: meals.reduce((acc, meal) => acc + meal.entries.length, 0),
//           dateRange: `${moment(startDate).format('YYYY-MM-DD')} to ${moment(endDate).format('YYYY-MM-DD')}`
//         }
//       };

//       res.setHeader('Content-Type', 'application/json');
//       res.setHeader('Content-Disposition', `attachment; filename=nutrition-data-${user.username}-${moment().format('YYYY-MM-DD')}.json`);
//       return res.json(data);
//     }

//     else {
//       res.status(400).json({ message: 'Invalid format. Use "excel" or "json"' });
//     }

//   } catch (error) {
//     console.error('Export error:', error);
//     res.status(500).json({ 
//       message: 'Export failed', 
//       error: error.message,
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// });

// // Helper functions for recipe nutrition estimation (same as in MealSchema)
// function estimateProtein(tags) {
//   if (!Array.isArray(tags)) return 15;
//   const lowerTags = tags.map(t => t.toLowerCase());
//   if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 25;
//   if (lowerTags.includes('vegetarian')) return 8;
//   return 15;
// }

// function estimateCarbs(tags) {
//   if (!Array.isArray(tags)) return 20;
//   const lowerTags = tags.map(t => t.toLowerCase());
//   if (lowerTags.includes('pasta') || lowerTags.includes('rice')) return 45;
//   if (lowerTags.includes('dessert')) return 35;
//   return 20;
// }

// function estimateFat(tags) {
//   if (!Array.isArray(tags)) return 12;
//   const lowerTags = tags.map(t => t.toLowerCase());
//   if (lowerTags.includes('dessert') || lowerTags.includes('fried')) return 18;
//   return 12;
// }

// // Helper function to calculate BMI
// function calculateBMI(user) {
//   if (!user.profile?.height?.value || !user.profile?.weight?.value) {
//     return 'N/A';
//   }
  
//   const heightInMeters = user.profile.height.unit === 'cm' 
//     ? user.profile.height.value / 100 
//     : user.profile.height.value * 0.0254;
  
//   const weightInKg = user.profile.weight.unit === 'kg'
//     ? user.profile.weight.value
//     : user.profile.weight.value * 0.453592;
  
//   const bmi = weightInKg / (heightInMeters * heightInMeters);
  
//   return parseFloat(bmi.toFixed(2));
// }

// // Helper function to get BMI category
// function getBMICategory(bmi) {
//   if (bmi === 'N/A' || isNaN(bmi)) return 'N/A';
  
//   if (bmi < 18.5) return 'Underweight';
//   if (bmi < 25) return 'Normal weight';
//   if (bmi < 30) return 'Overweight';
//   return 'Obese';
// }

// module.exports = router;

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Meal = require('../models/Meal');
const WaterIntake = require('../models/WaterIntake');
const User = require('../models/User');
const Food = require('../models/Food');
const Recipe = require('../models/Recipe');
const moment = require('moment');
const ExcelJS = require('exceljs');
const mongoose = require('mongoose');
const axios = require('axios');
const nodemailer = require('nodemailer');

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure:false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
   tls: {
    rejectUnauthorized: false
  }
});

// Test email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// @route   POST /api/export/export
// @desc    Export user data including BMI, meals
router.post('/export', protect, async (req, res) => {
  try {
    const { format, startDate, endDate, email } = req.body;
    const userId = req.user._id;

    console.log(`Export request for user ${userId} from ${startDate} to ${endDate}`);

    // Get user details
    const user = await User.findById(userId).select('-password');
    console.log('User found:', user?.username);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate BMI
    const bmi = calculateBMI(user);
    console.log('BMI:', bmi);

    // Fetch all meals
    const meals = await Meal.find({
      user: userId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: -1 });

    console.log('Meals found:', meals.length);

    // Create workbook for Excel or generate JSON data
    let workbook;
    let jsonData;
    
    if (format === 'excel') {
      workbook = await createExcelWorkbook(user, meals, bmi, startDate, endDate);
    } else if (format === 'json') {
      jsonData = await createJsonData(user, meals, bmi, startDate, endDate);
    } else {
      return res.status(400).json({ message: 'Invalid format. Use "excel" or "json"' });
    }

    // If email is provided, send via email
    if (email) {
      try {
        await sendExportViaEmail(user, format, workbook, jsonData, startDate, endDate);
        return res.json({ 
          success: true, 
          message: 'Export has been sent to your email',
          email: email
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        
        // If email fails, still provide download option
        if (format === 'excel') {
          return sendExcelDownload(res, workbook, user);
        } else {
          return sendJsonDownload(res, jsonData, user);
        }
      }
    } else {
      // Direct download
      if (format === 'excel') {
        return sendExcelDownload(res, workbook, user);
      } else {
        return sendJsonDownload(res, jsonData, user);
      }
    }

  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ 
      message: 'Export failed', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// @route   POST /api/export/email
// @desc    Send export via email
router.post('/email', protect, async (req, res) => {
  try {
    const { format, startDate, endDate, email, reportType } = req.body;
    const userId = req.user._id;

    // Get user details
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Calculate BMI
    const bmi = calculateBMI(user);

    // Fetch meals
    const meals = await Meal.find({
      user: userId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: -1 });

    // Generate export
    let workbook;
    let jsonData;
    
    if (format === 'excel') {
      workbook = await createExcelWorkbook(user, meals, bmi, startDate, endDate);
    } else if (format === 'json') {
      jsonData = await createJsonData(user, meals, bmi, startDate, endDate);
    } else {
      return res.status(400).json({ success: false, message: 'Invalid format' });
    }

    // Send email
    await sendExportViaEmail(user, format, workbook, jsonData, startDate, endDate, reportType);

    res.json({ 
      success: true, 
      message: `Export has been sent to ${email || user.email}`,
      email: email || user.email
    });

  } catch (error) {
    console.error('Email export error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to send export email',
      error: error.message
    });
  }
});

// Helper function to create Excel workbook
async function createExcelWorkbook(user, meals, bmi, startDate, endDate) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Nutrition App';
  workbook.created = new Date();

  // 1. User Profile Sheet
  const userSheet = workbook.addWorksheet('User Profile');
  userSheet.columns = [
    { header: 'Field', key: 'field', width: 25 },
    { header: 'Value', key: 'value', width: 35 }
  ];

  userSheet.addRows([
    { field: 'Username', value: user.username },
    { field: 'Email', value: user.email },
    { field: 'Full Name', value: user.profile?.fullName || 'N/A' },
    { field: 'Date of Birth', value: user.profile?.dateOfBirth ? 
      moment(user.profile.dateOfBirth).format('YYYY-MM-DD') : 'N/A' },
    { field: 'Gender', value: user.profile?.gender || 'N/A' },
    { field: 'Height', value: user.profile?.height ? 
      `${user.profile.height.value} ${user.profile.height.unit}` : 'N/A' },
    { field: 'Weight', value: user.profile?.weight ? 
      `${user.profile.weight.value} ${user.profile.weight.unit}` : 'N/A' },
    { field: 'Activity Level', value: user.profile?.activityLevel || 'N/A' },
    { field: 'BMI', value: bmi },
    { field: 'BMI Category', value: getBMICategory(bmi) },
    { field: 'Daily Calorie Target', value: user.dailyTargets?.calories || 2000 },
    { field: 'Account Created', value: moment(user.createdAt).format('YYYY-MM-DD HH:mm') }
  ]);

  // 2. Meals Log Sheet
  const mealsLogSheet = workbook.addWorksheet('Meals Log');
  mealsLogSheet.columns = [
    { header: 'Date', key: 'date', width: 15 },
    { header: 'Meal Type', key: 'mealType', width: 12 },
    { header: 'Food Name/Recipe', key: 'foodName', width: 30 },
    { header: 'Amount', key: 'amount', width: 10 },
    { header: 'Unit', key: 'unit', width: 10 },
    { header: 'Calories (kcal)', key: 'calories', width: 15 },
    { header: 'Protein (g)', key: 'protein', width: 12 },
    { header: 'Carbs (g)', key: 'carbs', width: 12 },
    { header: 'Fat (g)', key: 'fat', width: 12 }
  ];

  for (const meal of meals) {
    for (const entry of meal.entries) {
      let foodName = 'Unknown';
      let unit = 'serving';
      let nutrition = { calories: 0, protein: 0, carbs: 0, fat: 0 };
      
      if (typeof entry.food === 'string') {
        if (entry.food.startsWith('recipe-')) {
          const recipeId = entry.food.replace('recipe-', '');
          try {
            const response = await axios.get(`https://dummyjson.com/recipes/${recipeId}`);
            const recipe = response.data;
            foodName = recipe.name || recipe.title || `Recipe ${recipeId}`;
            
            if (recipe.nutrition) {
              nutrition = recipe.nutrition;
            } else {
              const tags = recipe.tags || [];
              nutrition = {
                calories: recipe.caloriesPerServing || 300,
                protein: estimateProtein(tags),
                carbs: estimateCarbs(tags),
                fat: estimateFat(tags)
              };
            }
          } catch (error) {
            foodName = `Recipe ${recipeId}`;
          }
        } else if (mongoose.Types.ObjectId.isValid(entry.food)) {
          const food = await Food.findById(entry.food);
          if (food) {
            foodName = food.name;
            unit = food.servingSize?.unit || 'serving';
            nutrition = food.nutrition || nutrition;
          }
        } else {
          foodName = entry.food;
        }
      }
      
      const servingAmount = entry.servingAmount || 1;
      mealsLogSheet.addRow({
        date: moment(meal.date).format('YYYY-MM-DD HH:mm'),
        mealType: meal.mealType || 'meal',
        foodName: foodName,
        amount: servingAmount,
        unit: unit,
        calories: (nutrition.calories || 0) * servingAmount,
        protein: (nutrition.protein || 0) * servingAmount,
        carbs: (nutrition.carbs || 0) * servingAmount,
        fat: (nutrition.fat || 0) * servingAmount
      });
    }
  }

  // 3. Meal Summary Sheet
  const summarySheet = workbook.addWorksheet('Meal Summary');
  summarySheet.columns = [
    { header: 'Date', key: 'date', width: 12 },
    { header: 'Meals Count', key: 'mealsCount', width: 12 },
    { header: 'Food Items', key: 'foodItems', width: 12 },
    { header: 'Total Calories', key: 'totalCalories', width: 15 },
    { header: 'Total Protein (g)', key: 'totalProtein', width: 15 },
    { header: 'Total Carbs (g)', key: 'totalCarbs', width: 15 },
    { header: 'Total Fat (g)', key: 'totalFat', width: 15 }
  ];

  const mealsByDate = {};
  meals.forEach(meal => {
    const dateStr = moment(meal.date).format('YYYY-MM-DD');
    if (!mealsByDate[dateStr]) {
      mealsByDate[dateStr] = {
        meals: 0,
        foodItems: 0,
        totals: { calories: 0, protein: 0, carbs: 0, fat: 0 }
      };
    }
    mealsByDate[dateStr].meals += 1;
    mealsByDate[dateStr].foodItems += meal.entries.length;
    mealsByDate[dateStr].totals.calories += meal.totalNutrition?.calories || 0;
    mealsByDate[dateStr].totals.protein += meal.totalNutrition?.protein || 0;
    mealsByDate[dateStr].totals.carbs += meal.totalNutrition?.carbs || 0;
    mealsByDate[dateStr].totals.fat += meal.totalNutrition?.fat || 0;
  });

  Object.keys(mealsByDate).sort().reverse().forEach(dateStr => {
    const dayData = mealsByDate[dateStr];
    summarySheet.addRow({
      date: dateStr,
      mealsCount: dayData.meals,
      foodItems: dayData.foodItems,
      totalCalories: dayData.totals.calories.toFixed(1),
      totalProtein: dayData.totals.protein.toFixed(1),
      totalCarbs: dayData.totals.carbs.toFixed(1),
      totalFat: dayData.totals.fat.toFixed(1)
    });
  });

  // 4. Export Summary Sheet
  const exportSummarySheet = workbook.addWorksheet('Export Summary');
  exportSummarySheet.columns = [
    { header: 'Data Type', key: 'type', width: 25 },
    { header: 'Count', key: 'count', width: 15 },
    { header: 'Date Range', key: 'range', width: 30 }
  ];

  const totalFoodEntries = meals.reduce((acc, meal) => acc + meal.entries.length, 0);
  exportSummarySheet.addRows([
    { type: 'User Profile', count: 1, range: 'N/A' },
    { type: 'Meals Logged', count: meals.length, range: `${moment(startDate).format('YYYY-MM-DD')} to ${moment(endDate).format('YYYY-MM-DD')}` },
    { type: 'Food Entries', count: totalFoodEntries, range: 'N/A' },
    { type: 'Export Date', count: '', range: moment().format('YYYY-MM-DD HH:mm:ss') }
  ]);

  // Style headers
  workbook.worksheets.forEach(worksheet => {
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, size: 12 };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4F81BD' }
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  return workbook;
}

// Helper function to create JSON data
async function createJsonData(user, meals, bmi, startDate, endDate) {
  const mealsWithDetails = [];
  
  for (const meal of meals) {
    const entriesWithDetails = [];
    
    for (const entry of meal.entries) {
      let foodDetails = {
        name: 'Unknown',
        type: 'unknown',
        nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }
      };
      
      if (typeof entry.food === 'string') {
        if (entry.food.startsWith('recipe-')) {
          const recipeId = entry.food.replace('recipe-', '');
          foodDetails.type = 'recipe';
          
          try {
            const response = await axios.get(`https://dummyjson.com/recipes/${recipeId}`);
            const recipe = response.data;
            foodDetails.name = recipe.name || recipe.title || `Recipe ${recipeId}`;
            
            if (recipe.nutrition) {
              foodDetails.nutrition = recipe.nutrition;
            } else {
              const tags = recipe.tags || [];
              foodDetails.nutrition = {
                calories: recipe.caloriesPerServing || 300,
                protein: estimateProtein(tags),
                carbs: estimateCarbs(tags),
                fat: estimateFat(tags)
              };
            }
          } catch (error) {
            foodDetails.name = `Recipe ${recipeId}`;
          }
        } else if (mongoose.Types.ObjectId.isValid(entry.food)) {
          const food = await Food.findById(entry.food);
          if (food) {
            foodDetails.name = food.name;
            foodDetails.type = 'food';
            foodDetails.nutrition = food.nutrition || foodDetails.nutrition;
          }
        } else {
          foodDetails.name = entry.food;
          foodDetails.type = 'custom';
        }
      }
      
      entriesWithDetails.push({
        food: foodDetails,
        servingAmount: entry.servingAmount || 1
      });
    }
    
    mealsWithDetails.push({
      date: meal.date,
      mealType: meal.mealType,
      entries: entriesWithDetails,
      totalNutrition: meal.totalNutrition
    });
  }

  return {
    exportInfo: {
      exportedAt: new Date(),
      dateRange: { start: startDate, end: endDate },
      user: user._id,
      format: 'json'
    },
    user: {
      profile: {
        username: user.username,
        email: user.email,
        fullName: user.profile?.fullName,
        dateOfBirth: user.profile?.dateOfBirth,
        gender: user.profile?.gender,
        height: user.profile?.height,
        weight: user.profile?.weight,
        activityLevel: user.profile?.activityLevel,
        bmi: bmi,
        bmiCategory: getBMICategory(bmi)
      },
      dailyTargets: user.dailyTargets
    },
    meals: mealsWithDetails,
    summary: {
      totalMeals: meals.length,
      totalFoodEntries: meals.reduce((acc, meal) => acc + meal.entries.length, 0),
      dateRange: `${moment(startDate).format('YYYY-MM-DD')} to ${moment(endDate).format('YYYY-MM-DD')}`
    }
  };
}

// Helper function to send export via email
async function sendExportViaEmail(user, format, workbook, jsonData, startDate, endDate, reportType = 'export') {
  const recipientEmail = user.email;
  const username = user.username;
  const fileName = `nutrition-${reportType}-${username}-${moment().format('YYYY-MM-DD')}.${format === 'excel' ? 'xlsx' : 'json'}`;
  
  let attachments = [];
  
  if (format === 'excel') {
    // Convert workbook to buffer
    const buffer = await workbook.xlsx.writeBuffer();
    attachments.push({
      filename: fileName,
      content: buffer,
      contentType: format === 'excel' ? 
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 
        'application/json'
    });
  } else {
    // Convert JSON to string
    const jsonString = JSON.stringify(jsonData, null, 2);
    attachments.push({
      filename: fileName,
      content: jsonString,
      contentType: 'application/json'
    });
  }

  // Email content
  const mailOptions = {
    from: process.env.SMTP_FROM || 'Nutrition App <noreply@nutritionapp.com>',
    to: recipientEmail,
    subject: `Your ${reportType === 'mealReminders' ? 'Meal' : 'Weekly'} Nutrition Report`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .button { 
            display: inline-block; 
            padding: 12px 24px; 
            background-color: #4CAF50; 
            color: white; 
            text-decoration: none; 
            border-radius: 4px; 
            margin-top: 20px; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nutrition Report</h1>
          </div>
          <div class="content">
            <h2>Hello ${user.profile?.firstName || user.username}!</h2>
            <p>Your ${reportType === 'mealReminders' ? 'meal reminders' : 'weekly'} nutrition report is ready.</p>
            
            <h3>Report Details:</h3>
            <ul>
              <li><strong>Date Range:</strong> ${moment(startDate).format('MMMM D, YYYY')} to ${moment(endDate).format('MMMM D, YYYY')}</li>
              <li><strong>Format:</strong> ${format.toUpperCase()}</li>
              <li><strong>Export Date:</strong> ${moment().format('MMMM D, YYYY h:mm A')}</li>
            </ul>
            
            <p>You will find your report attached to this email. The file contains:</p>
            <ul>
              <li>Your profile information</li>
              <li>Meal logs with nutrition details</li>
              <li>Daily summaries</li>
              <li>BMI calculation</li>
            </ul>
            
            <p>If you have any questions about your report, please don't hesitate to contact our support team.</p>
            
            <p>Best regards,<br>The Nutrition App Team</p>
          </div>
          <div class="footer">
            <p>This email was sent by Nutrition App. Please do not reply to this email.</p>
            <p>© ${new Date().getFullYear()} Nutrition App. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    attachments: attachments
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.messageId);
  return info;
}

// Helper function to send Excel download
async function sendExcelDownload(res, workbook, user) {
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=nutrition-data-${user.username}-${moment().format('YYYY-MM-DD-HHmm')}.xlsx`);
  await workbook.xlsx.write(res);
  res.end();
}

// Helper function to send JSON download
function sendJsonDownload(res, jsonData, user) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename=nutrition-data-${user.username}-${moment().format('YYYY-MM-DD')}.json`);
  return res.json(jsonData);
}

// Helper functions remain the same
function estimateProtein(tags) {
  if (!Array.isArray(tags)) return 15;
  const lowerTags = tags.map(t => t.toLowerCase());
  if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 25;
  if (lowerTags.includes('vegetarian')) return 8;
  return 15;
}

function estimateCarbs(tags) {
  if (!Array.isArray(tags)) return 20;
  const lowerTags = tags.map(t => t.toLowerCase());
  if (lowerTags.includes('pasta') || lowerTags.includes('rice')) return 45;
  if (lowerTags.includes('dessert')) return 35;
  return 20;
}

function estimateFat(tags) {
  if (!Array.isArray(tags)) return 12;
  const lowerTags = tags.map(t => t.toLowerCase());
  if (lowerTags.includes('dessert') || lowerTags.includes('fried')) return 18;
  return 12;
}

function calculateBMI(user) {
  if (!user.profile?.height?.value || !user.profile?.weight?.value) {
    return 'N/A';
  }
  
  const heightInMeters = user.profile.height.unit === 'cm' 
    ? user.profile.height.value / 100 
    : user.profile.height.value * 0.0254;
  
  const weightInKg = user.profile.weight.unit === 'kg'
    ? user.profile.weight.value
    : user.profile.weight.value * 0.453592;
  
  const bmi = weightInKg / (heightInMeters * heightInMeters);
  
  return parseFloat(bmi.toFixed(2));
}

function getBMICategory(bmi) {
  if (bmi === 'N/A' || isNaN(bmi)) return 'N/A';
  
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

module.exports = router;