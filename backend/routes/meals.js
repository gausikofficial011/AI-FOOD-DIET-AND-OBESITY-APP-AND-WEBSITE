// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/auth');
// const Meal = require('../models/Meal');

// router.get('/', protect, async (req, res) => {
//   try {
//     const { date } = req.query;
//     const query = { user: req.user._id };
//     if (date) {
//       const startDate = new Date(date); startDate.setHours(0,0,0,0);
//       const endDate = new Date(date); endDate.setHours(23,59,59,999);
//       query.date = { $gte: startDate, $lte: endDate };
//     }

//     const meals = await Meal.find(query).populate('entries.food').sort({ date: -1 });
//     res.json(meals);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.post('/', protect, async (req, res) => {
//   try {
//     const meal = new Meal({ user: req.user._id, ...req.body });
//     await meal.save();
//     await meal.populate('entries.food');
//     res.status(201).json(meal);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// router.delete('/:id', protect, async (req, res) => {
//   try {
//     const meal = await Meal.findOne({
//       _id: req.params.id,
//       user: req.user._id // Ensure user owns the meal
//     });

//     if (!meal) {
//       return res.status(404).json({ message: 'Meal not found' });
//     }

//     await meal.deleteOne();
//     res.json({ message: 'Meal deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get('/summary', protect, async (req, res) => {
//   try {
//     const { date } = req.query;
//     const startDate = new Date(date || new Date()); startDate.setHours(0,0,0,0);
//     const endDate = new Date(startDate); endDate.setHours(23,59,59,999);

//     const meals = await Meal.find({ user: req.user._id, date: { $gte: startDate, $lte: endDate } })
//       .populate('entries.food');

//     const summary = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, meals: [] };

//     meals.forEach(meal => {
//       summary.calories += meal.totalNutrition.calories;
//       summary.protein += meal.totalNutrition.protein;
//       summary.carbs += meal.totalNutrition.carbs;
//       summary.fat += meal.totalNutrition.fat;
//       summary.fiber += meal.totalNutrition.fiber;
//       summary.meals.push(meal);
//     });

//     res.json(summary);
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
// const axios = require('axios');

// // Helper function to fetch recipe data from API
// const fetchRecipeById = async (recipeId) => {
//   try {
//     const id = recipeId.replace('recipe-', '');
//     const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
//     const recipe = response.data;
    
//     // Map recipe to food format
//     return {
//       _id: `recipe-${recipe.id}`,
//       name: recipe.name,
//       category: mapCuisineToCategory(recipe.cuisine, recipe.tags, recipe.mealType),
//       servingSize: { amount: 1, unit: 'serving' },
//       nutrition: {
//         calories: recipe.caloriesPerServing,
//         protein: estimateProtein(recipe.tags),
//         carbs: estimateCarbs(recipe.tags),
//         fat: estimateFat(recipe.tags),
//         fiber: 0,
//         sugar: 0
//       },
//       isRecipe: true,
//       image: recipe.image
//     };
//   } catch (error) {
//     console.error('Error fetching recipe:', error);
//     return null;
//   }
// };

// const mapCuisineToCategory = (cuisine, tags, mealType) => {
//   const lowerTags = tags.map(t => t.toLowerCase());
//   const lowerMealType = mealType.map(m => m.toLowerCase());
  
//   if (lowerTags.includes('salad') || lowerTags.includes('vegetarian')) return 'vegetable';
//   if (lowerTags.includes('smoothie') || lowerMealType.includes('beverage')) return 'beverage';
//   if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 'protein';
//   if (lowerTags.includes('pasta') || lowerTags.includes('rice') || lowerTags.includes('grains')) return 'grains';
//   if (lowerTags.includes('dessert') || lowerTags.includes('cookies')) return 'fats';
  
//   return 'other';
// };

// const estimateProtein = (tags) => {
//   const lowerTags = tags.map(t => t.toLowerCase());
//   if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 25;
//   if (lowerTags.includes('vegetarian')) return 8;
//   return 15;
// };

// const estimateCarbs = (tags) => {
//   const lowerTags = tags.map(t => t.toLowerCase());
//   if (lowerTags.includes('pasta') || lowerTags.includes('rice')) return 45;
//   if (lowerTags.includes('dessert')) return 35;
//   return 20;
// };

// const estimateFat = (tags) => {
//   const lowerTags = tags.map(t => t.toLowerCase());
//   if (lowerTags.includes('dessert') || lowerTags.includes('fried')) return 18;
//   return 12;
// };

// // Helper function to populate meal entries (database foods + API recipes)
// const populateMealEntries = async (meal) => {
//   const populatedEntries = await Promise.all(
//     meal.entries.map(async (entry) => {
//       if (entry.food && typeof entry.food === 'string' && entry.food.startsWith('recipe-')) {
//         // This is a recipe from the API
//         const recipeData = await fetchRecipeById(entry.food);
//         return {
//           ...entry.toObject(),
//           food: recipeData
//         };
//       } else {
//         // This is a database food (already populated by Mongoose)
//         return entry;
//       }
//     })
//   );
  
//   return populatedEntries;
// };

// router.get('/', protect, async (req, res) => {
//   try {
//     const { date } = req.query;
//     const query = { user: req.user._id };
    
//     if (date) {
//       const startDate = new Date(date); 
//       startDate.setHours(0, 0, 0, 0);
//       const endDate = new Date(date); 
//       endDate.setHours(23, 59, 59, 999);
//       query.date = { $gte: startDate, $lte: endDate };
//     }

//     const meals = await Meal.find(query).sort({ date: -1 });
    
//     // Populate each meal's entries (handling both DB foods and API recipes)
//     const populatedMeals = await Promise.all(
//       meals.map(async (meal) => {
//         // First populate database foods
//         await meal.populate('entries.food');
        
//         // Then handle recipe entries
//         const populatedEntries = await populateMealEntries(meal);
        
//         const mealObj = meal.toObject();
//         mealObj.entries = populatedEntries;
        
//         return mealObj;
//       })
//     );
    
//     res.json(populatedMeals);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.post('/', protect, async (req, res) => {
//   try {
//     // Calculate total nutrition based on entries
//     let totalNutrition = {
//       calories: 0,
//       protein: 0,
//       carbs: 0,
//       fat: 0,
//       fiber: 0
//     };

//     // Fetch nutrition info for each entry
//     for (const entry of req.body.entries) {
//       let foodData;
      
//       if (entry.food.startsWith('recipe-')) {
//         // Fetch from API
//         foodData = await fetchRecipeById(entry.food);
//       } else {
//         // Fetch from database
//         const Food = require('../models/Food');
//         foodData = await Food.findById(entry.food);
//       }

//       if (foodData) {
//         const multiplier = entry.servingAmount / foodData.servingSize.amount;
//         totalNutrition.calories += Math.round(foodData.nutrition.calories * multiplier);
//         totalNutrition.protein += foodData.nutrition.protein * multiplier;
//         totalNutrition.carbs += foodData.nutrition.carbs * multiplier;
//         totalNutrition.fat += foodData.nutrition.fat * multiplier;
//         totalNutrition.fiber += foodData.nutrition.fiber * multiplier;
//       }
//     }

//     const meal = new Meal({
//       user: req.user._id,
//       date: req.body.date,
//       mealType: req.body.mealType,
//       entries: req.body.entries,
//       totalNutrition
//     });

//     await meal.save();
    
//     // Populate the response
//     await meal.populate('entries.food');
//     const populatedEntries = await populateMealEntries(meal);
    
//     const mealObj = meal.toObject();
//     mealObj.entries = populatedEntries;
    
//     res.status(201).json(mealObj);
//   } catch (error) {
//     console.error('Error saving meal:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// router.delete('/:id', protect, async (req, res) => {
//   try {
//     const meal = await Meal.findOne({
//       _id: req.params.id,
//       user: req.user._id
//     });

//     if (!meal) {
//       return res.status(404).json({ message: 'Meal not found' });
//     }

//     await meal.deleteOne();
//     res.json({ message: 'Meal deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get('/summary', protect, async (req, res) => {
//   try {
//     const { date } = req.query;
//     const startDate = new Date(date || new Date()); 
//     startDate.setHours(0, 0, 0, 0);
//     const endDate = new Date(startDate); 
//     endDate.setHours(23, 59, 59, 999);

//     const meals = await Meal.find({ 
//       user: req.user._id, 
//       date: { $gte: startDate, $lte: endDate } 
//     });

//     const summary = { 
//       calories: 0, 
//       protein: 0, 
//       carbs: 0, 
//       fat: 0, 
//       fiber: 0, 
//       meals: [] 
//     };

//     // Populate meals with both DB foods and API recipes
//     const populatedMeals = await Promise.all(
//       meals.map(async (meal) => {
//         await meal.populate('entries.food');
//         const populatedEntries = await populateMealEntries(meal);
        
//         const mealObj = meal.toObject();
//         mealObj.entries = populatedEntries;
        
//         // Add to summary
//         summary.calories += meal.totalNutrition.calories || 0;
//         summary.protein += meal.totalNutrition.protein || 0;
//         summary.carbs += meal.totalNutrition.carbs || 0;
//         summary.fat += meal.totalNutrition.fat || 0;
//         summary.fiber += meal.totalNutrition.fiber || 0;
        
//         return mealObj;
//       })
//     );

//     summary.meals = populatedMeals;
//     res.json(summary);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;

// new1--working
// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/auth');
// const Meal = require('../models/Meal');
// const axios = require('axios');

// // Helper function to fetch recipe data from API
// const fetchRecipeById = async (recipeId) => {
//   try {
//     const id = recipeId.replace('recipe-', '');
//     const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
//     const recipe = response.data;
    
//     // Map recipe to food format
//     return {
//       _id: `recipe-${recipe.id}`,
//       name: recipe.name,
//       servingSize: { amount: 1, unit: 'serving' },
//       nutrition: {
//         calories: recipe.caloriesPerServing,
//         protein: estimateProtein(recipe.tags),
//         carbs: estimateCarbs(recipe.tags),
//         fat: estimateFat(recipe.tags),
//         fiber: 0,
//         sugar: 0
//       },
//       isRecipe: true,
//       image: recipe.image,
//       difficulty: recipe.difficulty,
//       mealType: recipe.mealType,
//       tags: recipe.tags
//     };
//   } catch (error) {
//     console.error('Error fetching recipe:', error.message);
//     return null;
//   }
// };

// // Helper functions for nutrition estimation
// const estimateProtein = (tags) => {
//   const lowerTags = tags.map(t => t.toLowerCase());
//   if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 25;
//   if (lowerTags.includes('vegetarian')) return 8;
//   return 15;
// };

// const estimateCarbs = (tags) => {
//   const lowerTags = tags.map(t => t.toLowerCase());
//   if (lowerTags.includes('pasta') || lowerTags.includes('rice')) return 45;
//   if (lowerTags.includes('dessert')) return 35;
//   return 20;
// };

// const estimateFat = (tags) => {
//   const lowerTags = tags.map(t => t.toLowerCase());
//   if (lowerTags.includes('dessert') || lowerTags.includes('fried')) return 18;
//   return 12;
// };

// // Helper function to populate meal entries (database foods + API recipes)
// const populateMealEntries = async (meal) => {
//   const populatedEntries = await Promise.all(
//     meal.entries.map(async (entry) => {
//       const entryObj = entry.toObject ? entry.toObject() : entry;
      
//       if (typeof entryObj.food === 'string' && entryObj.food.startsWith('recipe-')) {
//         // This is a recipe from the API
//         const recipeData = await fetchRecipeById(entryObj.food);
//         return {
//           ...entryObj,
//           food: recipeData
//         };
//       } else if (entryObj.food && entryObj.food._id) {
//         // Already populated database food
//         return entryObj;
//       } else {
//         // Need to populate database food
//         const Food = require('../models/Food');
//         const foodData = await Food.findById(entryObj.food);
//         return {
//           ...entryObj,
//           food: foodData
//         };
//       }
//     })
//   );
  
//   return populatedEntries;
// };

// router.get('/', protect, async (req, res) => {
//   try {
//     const { date } = req.query;
//     const query = { user: req.user._id };
    
//     if (date) {
//       const startDate = new Date(date); 
//       startDate.setHours(0, 0, 0, 0);
//       const endDate = new Date(date); 
//       endDate.setHours(23, 59, 59, 999);
//       query.date = { $gte: startDate, $lte: endDate };
//     }

//     const meals = await Meal.find(query).sort({ date: -1 });
    
//     // Populate each meal's entries (handling both DB foods and API recipes)
//     const populatedMeals = await Promise.all(
//       meals.map(async (meal) => {
//         // First try to populate database foods
//         await meal.populate('entries.food').catch(() => {
//           // Ignore populate errors for recipe IDs
//         });
        
//         // Then handle all entries (both DB and recipes)
//         const populatedEntries = await populateMealEntries(meal);
        
//         const mealObj = meal.toObject();
//         mealObj.entries = populatedEntries;
        
//         return mealObj;
//       })
//     );
    
//     res.json(populatedMeals);
//   } catch (error) {
//     console.error('Error fetching meals:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// router.post('/', protect, async (req, res) => {
//   try {
//     const meal = new Meal({ 
//       user: req.user._id, 
//       ...req.body 
//     });
    
//     // Pre-save hook will calculate totalNutrition
//     await meal.save();
    
//     // Populate the response
//     await meal.populate('entries.food').catch(() => {
//       // Ignore populate errors for recipe IDs
//     });
    
//     const populatedEntries = await populateMealEntries(meal);
    
//     const mealObj = meal.toObject();
//     mealObj.entries = populatedEntries;
    
//     res.status(201).json(mealObj);
//   } catch (error) {
//     console.error('Error saving meal:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// router.delete('/:id', protect, async (req, res) => {
//   try {
//     const meal = await Meal.findOne({
//       _id: req.params.id,
//       user: req.user._id // Ensure user owns the meal
//     });

//     if (!meal) {
//       return res.status(404).json({ message: 'Meal not found' });
//     }

//     await meal.deleteOne();
//     res.json({ message: 'Meal deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get('/summary', protect, async (req, res) => {
//   try {
//     const { date } = req.query;
//     const startDate = new Date(date || new Date()); 
//     startDate.setHours(0, 0, 0, 0);
//     const endDate = new Date(startDate); 
//     endDate.setHours(23, 59, 59, 999);

//     const meals = await Meal.find({ 
//       user: req.user._id, 
//       date: { $gte: startDate, $lte: endDate } 
//     });

//     const summary = { 
//       calories: 0, 
//       protein: 0, 
//       carbs: 0, 
//       fat: 0, 
//       fiber: 0, 
//       meals: [] 
//     };

//     // Populate meals with both DB foods and API recipes
//     const populatedMeals = await Promise.all(
//       meals.map(async (meal) => {
//         await meal.populate('entries.food').catch(() => {
//           // Ignore populate errors for recipe IDs
//         });
        
//         const populatedEntries = await populateMealEntries(meal);
        
//         const mealObj = meal.toObject();
//         mealObj.entries = populatedEntries;
        
//         // Add to summary
//         summary.calories += meal.totalNutrition.calories || 0;
//         summary.protein += meal.totalNutrition.protein || 0;
//         summary.carbs += meal.totalNutrition.carbs || 0;
//         summary.fat += meal.totalNutrition.fat || 0;
//         summary.fiber += meal.totalNutrition.fiber || 0;
        
//         return mealObj;
//       })
//     );

//     summary.meals = populatedMeals;
//     res.json(summary);
//   } catch (error) {
//     console.error('Error fetching summary:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
// new2
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Meal = require('../models/Meal');
const axios = require('axios');

// Helper function to fetch recipe data from API
const fetchRecipeById = async (recipeId) => {
  try {
    const id = recipeId.replace('recipe-', '');
    const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
    const recipe = response.data;
    
    // Map recipe to food format
    return {
      _id: `recipe-${recipe.id}`,
      name: recipe.name,
      servingSize: { amount: 1, unit: 'serving' },
      nutrition: {
        calories: recipe.caloriesPerServing,
        protein: estimateProtein(recipe.tags),
        carbs: estimateCarbs(recipe.tags),
        fat: estimateFat(recipe.tags),
        fiber: 0,
        sugar: 0
      },
      isRecipe: true,
      image: recipe.image,
      difficulty: recipe.difficulty,
      mealType: recipe.mealType,
      tags: recipe.tags
    };
  } catch (error) {
    console.error('Error fetching recipe:', error.message);
    return null;
  }
};

// Helper functions for nutrition estimation
const estimateProtein = (tags) => {
  const lowerTags = tags.map(t => t.toLowerCase());
  if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 25;
  if (lowerTags.includes('vegetarian')) return 8;
  return 15;
};

const estimateCarbs = (tags) => {
  const lowerTags = tags.map(t => t.toLowerCase());
  if (lowerTags.includes('pasta') || lowerTags.includes('rice')) return 45;
  if (lowerTags.includes('dessert')) return 35;
  return 20;
};

const estimateFat = (tags) => {
  const lowerTags = tags.map(t => t.toLowerCase());
  if (lowerTags.includes('dessert') || lowerTags.includes('fried')) return 18;
  return 12;
};

// Helper function to populate meal entries
const populateMealEntries = async (meal) => {
  const populatedEntries = await Promise.all(
    meal.entries.map(async (entry) => {
      const entryObj = entry.toObject ? entry.toObject() : entry;
      
      // If food is an object (CalorieNinjas data), return as-is
      if (typeof entryObj.food === 'object' && entryObj.food.calories !== undefined) {
        return entryObj;
      }
      
      if (typeof entryObj.food === 'string' && entryObj.food.startsWith('recipe-')) {
        // This is a recipe from the API
        const recipeData = await fetchRecipeById(entryObj.food);
        return {
          ...entryObj,
          food: recipeData
        };
      } else if (entryObj.food && entryObj.food._id) {
        // Already populated database food
        return entryObj;
      } else {
        // Need to populate database food
        const Food = require('../models/Food');
        const foodData = await Food.findById(entryObj.food);
        return {
          ...entryObj,
          food: foodData
        };
      }
    })
  );
  
  return populatedEntries;
};
// Add this route in your meals.js backend file

// Delete meals for a specific week
router.delete('/week/:startDate', protect, async (req, res) => {
  try {
    const { startDate } = req.params;
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    // Calculate week boundaries
    const dayOfWeek = start.getDay();
    const sunday = new Date(start);
    sunday.setDate(start.getDate() - dayOfWeek);
    sunday.setHours(0, 0, 0, 0);
    
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);
    saturday.setHours(23, 59, 59, 999);
    
    // Delete all meals for this user within this week
    const result = await Meal.deleteMany({
      user: req.user._id,
      date: { $gte: sunday, $lte: saturday }
    });
    
    res.json({
      message: `Successfully deleted ${result.deletedCount} meals for the week`,
      deletedCount: result.deletedCount
    });
    
  } catch (error) {
    console.error('Error deleting week data:', error);
    res.status(500).json({ message: error.message });
  }
});
// REGULAR meal routes (unchanged)
router.get('/', protect, async (req, res) => {
  try {
    const { date } = req.query;
    const query = { user: req.user._id };
    
    if (date) {
      const startDate = new Date(date); 
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date); 
      endDate.setHours(23, 59, 59, 999);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const meals = await Meal.find(query).sort({ date: -1 });
    
    const populatedMeals = await Promise.all(
      meals.map(async (meal) => {
        await meal.populate('entries.food').catch(() => {});
        
        const populatedEntries = await populateMealEntries(meal);
        
        const mealObj = meal.toObject();
        mealObj.entries = populatedEntries;
        
        return mealObj;
      })
    );
    
    res.json(populatedMeals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ message: error.message });
  }
});

// REGULAR meal creation (for database foods)
router.post('/', protect, async (req, res) => {
  try {
    const meal = new Meal({ 
      user: req.user._id, 
      ...req.body 
    });
    
    await meal.save();
    
    await meal.populate('entries.food').catch(() => {});
    
    const populatedEntries = await populateMealEntries(meal);
    
    const mealObj = meal.toObject();
    mealObj.entries = populatedEntries;
    
    res.status(201).json(mealObj);
  } catch (error) {
    console.error('Error saving meal:', error);
    res.status(500).json({ message: error.message });
  }
});

// NEW: Create meal from CalorieNinjas API data
router.post('/calorieninjas', protect, async (req, res) => {
  try {
    const { items, mealType, date, foodInput } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No food items provided' });
    }
    
    // Create entries with CalorieNinjas data directly (no Food DB storage)
    const entries = items.map(item => ({
      food: { // Store the complete CalorieNinjas object
        name: item.name,
        calories: item.calories,
        serving_size_g: item.serving_size_g,
        fat_total_g: item.fat_total_g,
        protein_g: item.protein_g,
        sodium_mg: item.sodium_mg,
        potassium_mg: item.potassium_mg,
        cholesterol_mg: item.cholesterol_mg,
        carbohydrates_total_g: item.carbohydrates_total_g,
        fiber_g: item.fiber_g,
        sugar_g: item.sugar_g
      },
      servingAmount: 1, // Default to 1 serving
      metadata: {
        source: 'calorieninjas',
        serving_size_g: item.serving_size_g,
        analyzed_at: new Date().toISOString()
      }
    }));
    
    // Create meal with CalorieNinjas data
    const meal = new Meal({
      user: req.user._id,
      date: date || new Date(),
      mealType: mealType,
      entries: entries,
      notes: `Added via CalorieNinjas: ${foodInput}`,
      source: 'calorieninjas' // Mark as from CalorieNinjas
    });
    
    await meal.save();
    
    // Return the meal (no population needed for CalorieNinjas data)
    res.status(201).json({
      message: 'Meal saved successfully from CalorieNinjas',
      meal: meal
    });
    
  } catch (error) {
    console.error('Error saving CalorieNinjas meal:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get weekly summary with CalorieNinjas support
router.get('/summary', protect, async (req, res) => {
  try {
    const { date } = req.query;
    const startDate = new Date(date || new Date()); 
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate); 
    endDate.setHours(23, 59, 59, 999);

    const meals = await Meal.find({ 
      user: req.user._id, 
      date: { $gte: startDate, $lte: endDate } 
    });

    const summary = { 
      calories: 0, 
      protein: 0, 
      carbs: 0, 
      fat: 0, 
      fiber: 0, 
      meals: [] 
    };

    // Populate meals with all types of entries
    const populatedMeals = await Promise.all(
      meals.map(async (meal) => {
        await meal.populate('entries.food').catch(() => {});
        
        const populatedEntries = await populateMealEntries(meal);
        
        const mealObj = meal.toObject();
        mealObj.entries = populatedEntries;
        
        // Add to summary
        summary.calories += meal.totalNutrition.calories || 0;
        summary.protein += meal.totalNutrition.protein || 0;
        summary.carbs += meal.totalNutrition.carbs || 0;
        summary.fat += meal.totalNutrition.fat || 0;
        summary.fiber += meal.totalNutrition.fiber || 0;
        
        return mealObj;
      })
    );

    summary.meals = populatedMeals;
    res.json(summary);
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get weekly data for dashboard
router.get('/weekly-data', protect, async (req, res) => {
  try {
    const { startDate } = req.query;
    
    // If no startDate provided, use current week
    const start = startDate ? new Date(startDate) : new Date();
    start.setHours(0, 0, 0, 0);
    
    // Get Sunday (start of week)
    const dayOfWeek = start.getDay();
    const sunday = new Date(start);
    sunday.setDate(start.getDate() - dayOfWeek);
    sunday.setHours(0, 0, 0, 0);
    
    // Get Saturday (end of week)
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);
    saturday.setHours(23, 59, 59, 999);
    
    // Get meals for the week
    const meals = await Meal.find({
      user: req.user._id,
      date: { $gte: sunday, $lte: saturday }
    });
    
    // Group meals by day and meal type
    const weekData = {
      Sunday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
      Monday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
      Tuesday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
      Wednesday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
      Thursday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
      Friday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 },
      Saturday: { breakfast: 0, lunch: 0, dinner: 0, total: 0 }
    };
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Populate with actual data
    meals.forEach(meal => {
      const dayName = days[meal.date.getDay()];
      const calories = meal.totalNutrition.calories || 0;
      
      if (weekData[dayName]) {
        weekData[dayName][meal.mealType] = (weekData[dayName][meal.mealType] || 0) + calories;
        weekData[dayName].total = (weekData[dayName].total || 0) + calories;
      }
    });
    
    res.json({
      weekData,
      days: days.map(day => ({
        name: day,
        ...weekData[day]
      }))
    });
    
  } catch (error) {
    console.error('Error fetching weekly data:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete meal
router.delete('/:id', protect, async (req, res) => {
  try {
    const meal = await Meal.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    await meal.deleteOne();
    res.json({ message: 'Meal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;