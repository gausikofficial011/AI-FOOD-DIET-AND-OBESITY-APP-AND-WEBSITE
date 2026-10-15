// const mongoose = require('mongoose');

// const MealEntrySchema = new mongoose.Schema({
//   food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
//   servingAmount: { type: Number, required: true, default: 1 }
// });

// const MealSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   date: { type: Date, required: true, default: Date.now },
//   mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
//   entries: [MealEntrySchema],
//   totalNutrition: {
//     calories: { type: Number, default: 0 },
//     protein: { type: Number, default: 0 },
//     carbs: { type: Number, default: 0 },
//     fat: { type: Number, default: 0 },
//     fiber: { type: Number, default: 0 }
//   },
//   notes: String
// });

// MealSchema.pre('save', async function(next) {
//   let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0, totalFiber = 0;
  
//   for (const entry of this.entries) {
//     const food = await mongoose.model('Food').findById(entry.food);
//     if (food) {
//       const multiplier = entry.servingAmount / food.servingSize.amount;
//       totalCalories += food.nutrition.calories * multiplier;
//       totalProtein += food.nutrition.protein * multiplier;
//       totalCarbs += food.nutrition.carbs * multiplier;
//       totalFat += food.nutrition.fat * multiplier;
//       totalFiber += food.nutrition.fiber * multiplier;
//     }
//   }
  
//   this.totalNutrition = {
//     calories: Math.round(totalCalories),
//     protein: Math.round(totalProtein * 10) / 10,
//     carbs: Math.round(totalCarbs * 10) / 10,
//     fat: Math.round(totalFat * 10) / 10,
//     fiber: Math.round(totalFiber * 10) / 10
//   };
//   next();
// });

// module.exports = mongoose.model('Meal', MealSchema);
// new--working
// const mongoose = require('mongoose');

// const MealEntrySchema = new mongoose.Schema({
//   food: { 
//     type: mongoose.Schema.Types.Mixed, // Changed from ObjectId to Mixed to support both ObjectId and String (for recipes)
//     required: true 
//   },
//   servingAmount: { type: Number, required: true, default: 1 }
// });

// const MealSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   date: { type: Date, required: true, default: Date.now },
//   mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
//   entries: [MealEntrySchema],
//   totalNutrition: {
//     calories: { type: Number, default: 0 },
//     protein: { type: Number, default: 0 },
//     carbs: { type: Number, default: 0 },
//     fat: { type: Number, default: 0 },
//     fiber: { type: Number, default: 0 }
//   },
//   notes: String
// });

// // Helper functions for recipe nutrition estimation
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

// MealSchema.pre('save', async function(next) {
//   const axios = require('axios');
//   let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0, totalFiber = 0;
  
//   for (const entry of this.entries) {
//     let food = null;
    
//     // Check if it's a recipe from API (starts with 'recipe-')
//     if (typeof entry.food === 'string' && entry.food.startsWith('recipe-')) {
//       try {
//         const recipeId = entry.food.replace('recipe-', '');
//         const response = await axios.get(`https://dummyjson.com/recipes/${recipeId}`);
//         const recipe = response.data;
        
//         // Map recipe to food format
//         food = {
//           servingSize: { amount: 1, unit: 'serving' },
//           nutrition: {
//             calories: recipe.caloriesPerServing,
//             protein: estimateProtein(recipe.tags),
//             carbs: estimateCarbs(recipe.tags),
//             fat: estimateFat(recipe.tags),
//             fiber: 0
//           }
//         };
//       } catch (error) {
//         console.error('Error fetching recipe:', error.message);
//         continue; // Skip this entry if recipe fetch fails
//       }
//     } else {
//       // Get food from database
//       food = await mongoose.model('Food').findById(entry.food);
//     }
    
//     if (food) {
//       const multiplier = entry.servingAmount / food.servingSize.amount;
//       totalCalories += food.nutrition.calories * multiplier;
//       totalProtein += food.nutrition.protein * multiplier;
//       totalCarbs += food.nutrition.carbs * multiplier;
//       totalFat += food.nutrition.fat * multiplier;
//       totalFiber += (food.nutrition.fiber || 0) * multiplier;
//     }
//   }
  
//   this.totalNutrition = {
//     calories: Math.round(totalCalories),
//     protein: Math.round(totalProtein * 10) / 10,
//     carbs: Math.round(totalCarbs * 10) / 10,
//     fat: Math.round(totalFat * 10) / 10,
//     fiber: Math.round(totalFiber * 10) / 10
//   };
//   next();
// });

// module.exports = mongoose.model('Meal', MealSchema);

// new2
// const mongoose = require('mongoose');

// const MealEntrySchema = new mongoose.Schema({
//   food: { 
//     type: mongoose.Schema.Types.Mixed, // Can be ObjectId, String (recipe), or Object (CalorieNinjas)
//     required: true 
//   },
//   servingAmount: { type: Number, required: true, default: 1 },
//   // Add metadata for CalorieNinjas entries
//   metadata: {
//     type: mongoose.Schema.Types.Mixed,
//     default: null
//   }
// });

// const MealSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   date: { type: Date, required: true, default: Date.now },
//   mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
//   entries: [MealEntrySchema],
//   totalNutrition: {
//     calories: { type: Number, default: 0 },
//     protein: { type: Number, default: 0 },
//     carbs: { type: Number, default: 0 },
//     fat: { type: Number, default: 0 },
//     fiber: { type: Number, default: 0 }
//   },
//   notes: String,
//   // Add source field to identify where meal came from
//   source: {
//     type: String,
//     enum: ['regular', 'calorieninjas', 'dummyjson'],
//     default: 'regular'
//   }
// });

// // Helper functions for recipe nutrition estimation
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

// MealSchema.pre('save', async function(next) {
//   const axios = require('axios');
//   let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0, totalFiber = 0;
  
//   for (const entry of this.entries) {
//     let food = null;
    
//     // Check if it's a recipe from API (starts with 'recipe-')
//     if (typeof entry.food === 'string' && entry.food.startsWith('recipe-')) {
//       try {
//         const recipeId = entry.food.replace('recipe-', '');
//         const response = await axios.get(`https://dummyjson.com/recipes/${recipeId}`);
//         const recipe = response.data;
        
//         // Map recipe to food format
//         food = {
//           servingSize: { amount: 1, unit: 'serving' },
//           nutrition: {
//             calories: recipe.caloriesPerServing,
//             protein: estimateProtein(recipe.tags),
//             carbs: estimateCarbs(recipe.tags),
//             fat: estimateFat(recipe.tags),
//             fiber: 0
//           }
//         };
//       } catch (error) {
//         console.error('Error fetching recipe:', error.message);
//         continue; // Skip this entry if recipe fetch fails
//       }
//     } 
//     // Check if it's CalorieNinjas data (food is an object)
//     else if (typeof entry.food === 'object' && entry.food.calories !== undefined) {
//       // This is CalorieNinjas data stored directly
//       food = {
//         servingSize: { 
//           amount: entry.food.serving_size_g || 100, 
//           unit: 'grams' 
//         },
//         nutrition: {
//           calories: entry.food.calories || 0,
//           protein: entry.food.protein_g || 0,
//           carbs: entry.food.carbohydrates_total_g || 0,
//           fat: entry.food.fat_total_g || 0,
//           fiber: entry.food.fiber_g || 0
//         }
//       };
//     }
//     else {
//       // Get food from database
//       food = await mongoose.model('Food').findById(entry.food);
//     }
    
//     if (food) {
//       const multiplier = entry.servingAmount / (food.servingSize.amount || 1);
//       totalCalories += (food.nutrition.calories || 0) * multiplier;
//       totalProtein += (food.nutrition.protein || 0) * multiplier;
//       totalCarbs += (food.nutrition.carbs || 0) * multiplier;
//       totalFat += (food.nutrition.fat || 0) * multiplier;
//       totalFiber += (food.nutrition.fiber || 0) * multiplier;
//     }
//   }
  
//   this.totalNutrition = {
//     calories: Math.round(totalCalories),
//     protein: Math.round(totalProtein * 10) / 10,
//     carbs: Math.round(totalCarbs * 10) / 10,
//     fat: Math.round(totalFat * 10) / 10,
//     fiber: Math.round(totalFiber * 10) / 10
//   };
//   next();
// });

// module.exports = mongoose.model('Meal', MealSchema);
// new3
const mongoose = require('mongoose');

const MealEntrySchema = new mongoose.Schema({
  food: { 
    type: mongoose.Schema.Types.Mixed, // Can be ObjectId, String (recipe), or Object (CalorieNinjas)
    required: true 
  },
  servingAmount: { type: Number, required: true, default: 1 },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  }
});

const MealSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true, default: Date.now },
  mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
  entries: [MealEntrySchema],
  totalNutrition: {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    fiber: { type: Number, default: 0 }
  },
  notes: String,
  source: {
    type: String,
    enum: ['regular', 'calorieninjas', 'dummyjson'],
    default: 'regular'
  }
});

// Helper functions for recipe nutrition estimation
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

MealSchema.pre('save', async function(next) {
  const axios = require('axios');
  let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0, totalFiber = 0;
  
  for (const entry of this.entries) {
    let food = null;
    
    // Check if it's a recipe from API (starts with 'recipe-')
    if (typeof entry.food === 'string' && entry.food.startsWith('recipe-')) {
      try {
        const recipeId = entry.food.replace('recipe-', '');
        const response = await axios.get(`https://dummyjson.com/recipes/${recipeId}`);
        const recipe = response.data;
        
        food = {
          servingSize: { amount: 1, unit: 'serving' },
          nutrition: {
            calories: recipe.caloriesPerServing,
            protein: estimateProtein(recipe.tags),
            carbs: estimateCarbs(recipe.tags),
            fat: estimateFat(recipe.tags),
            fiber: 0
          }
        };
      } catch (error) {
        console.error('Error fetching recipe:', error.message);
        continue;
      }
    } 
    // Check if it's CalorieNinjas data (food is an object with calories)
    else if (typeof entry.food === 'object' && entry.food.calories !== undefined) {
      // **FIXED: Use CalorieNinjas data directly**
      // CalorieNinjas gives nutrition per serving_size_g (usually 100g)
      const servingSize = entry.food.serving_size_g || 100;
      const servingAmount = entry.servingAmount || 1;
      
      // **CRITICAL FIX: Don't divide by serving_size_g, use it as-is**
      // If servingAmount = 1, we're consuming the full serving_size_g
      const ratio = servingAmount; // Simple multiplier
      
      totalCalories += (entry.food.calories || 0) * ratio;
      totalProtein += (entry.food.protein_g || 0) * ratio;
      totalCarbs += (entry.food.carbohydrates_total_g || 0) * ratio;
      totalFat += (entry.food.fat_total_g || 0) * ratio;
      totalFiber += (entry.food.fiber_g || 0) * ratio;
      
      continue; // Skip the rest of the loop for CalorieNinjas data
    }
    else {
      // Get food from database
      food = await mongoose.model('Food').findById(entry.food);
    }
    
    if (food) {
      const multiplier = entry.servingAmount / (food.servingSize.amount || 1);
      totalCalories += (food.nutrition.calories || 0) * multiplier;
      totalProtein += (food.nutrition.protein || 0) * multiplier;
      totalCarbs += (food.nutrition.carbs || 0) * multiplier;
      totalFat += (food.nutrition.fat || 0) * multiplier;
      totalFiber += (food.nutrition.fiber || 0) * multiplier;
    }
  }
  
  this.totalNutrition = {
    calories: Math.round(totalCalories),
    protein: Math.round(totalProtein * 10) / 10,
    carbs: Math.round(totalCarbs * 10) / 10,
    fat: Math.round(totalFat * 10) / 10,
    fiber: Math.round(totalFiber * 10) / 10
  };
  next();
});

module.exports = mongoose.model('Meal', MealSchema);