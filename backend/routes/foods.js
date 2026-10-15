// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/auth');
// const Food = require('../models/Food');

// router.get('/', protect, async (req, res) => {
//   try {
//     const { search, category } = req.query;
//     let query = { $or: [{ isCustom: false }, { createdBy: req.user._id }] };
//     if (search) query.name = { $regex: search, $options: 'i' };
//     if (category && category !== 'all') query.category = category;
    
//     const foods = await Food.find(query).sort({ name: 1 });
//     res.json(foods);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.post('/', protect, async (req, res) => {
//   try {
//     const food = new Food({ ...req.body, isCustom: true, createdBy: req.user._id });
//     await food.save();
//     res.status(201).json(food);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
// new
// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/auth');
// const Food = require('../models/Food');
// const axios = require('axios');

// // Initialize recipes from dummyjson API
// router.get('/initialize-recipes', protect, async (req, res) => {
//   try {
//     // Check if user is admin
//     if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
//       return res.status(403).json({ message: 'Admin access required' });
//     }
    
//     const { limit = 30 } = req.query;
    
//     const response = await axios.get(`https://dummyjson.com/recipes?limit=${limit}`);
//     const recipes = response.data.recipes;
    
//     let addedCount = 0;
//     let skippedCount = 0;
    
//     for (const recipe of recipes) {
//       try {
//         // Check if recipe already exists
//         const existingFood = await Food.findOne({ 
//           name: { $regex: new RegExp(`^${recipe.name}$`, 'i') },
//           source: 'dummyjson'
//         });
        
//         if (existingFood) {
//           skippedCount++;
//           continue;
//         }
        
//         // Map recipe to food
//         const foodData = {
//           name: recipe.name,
//           category: mapCuisineToCategory(recipe.cuisine, recipe.tags, recipe.mealType),
//           servingSize: {
//             amount: 1,
//             unit: 'serving'
//           },
//           nutrition: {
//             calories: recipe.caloriesPerServing,
//             protein: estimateProtein(recipe.tags),
//             carbs: estimateCarbs(recipe.tags),
//             fat: estimateFat(recipe.tags),
//             fiber: 0,
//             sugar: 0
//           },
//           isCustom: false,
//           isRecipe: true,
//           source: 'dummyjson',
//           sourceId: recipe.id.toString(),
//           image: recipe.image,
//           difficulty: recipe.difficulty,
//           prepTimeMinutes: recipe.prepTimeMinutes,
//           cookTimeMinutes: recipe.cookTimeMinutes,
//           servings: recipe.servings,
//           mealType: recipe.mealType,
//           tags: recipe.tags,
//           cuisine: recipe.cuisine
//         };
        
//         const food = new Food(foodData);
//         await food.save();
//         addedCount++;
        
//       } catch (error) {
//         console.error(`Error saving recipe "${recipe.name}":`, error.message);
//         skippedCount++;
//       }
//     }
    
//     res.json({
//       message: 'Recipe initialization completed',
//       added: addedCount,
//       skipped: skippedCount,
//       total: await Food.countDocuments({})
//     });
    
//   } catch (error) {
//     console.error('Recipe initialization error:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get all foods (including recipes)
// router.get('/', protect, async (req, res) => {
//   try {
//     const { 
//       search, 
//       category, 
//       mealType, 
//       tag,
//       isRecipe,
//       page = 1,
//       limit = 20
//     } = req.query;
    
//     let query = { 
//       $or: [
//         { isCustom: false }, 
//         { createdBy: req.user._id }
//       ] 
//     };
    
//     if (search) query.name = { $regex: search, $options: 'i' };
//     if (category && category !== 'all') query.category = category;
//     if (mealType && mealType !== 'all') query.mealType = { $in: [mealType] };
//     if (tag && tag !== 'all') query.tags = { $in: [tag] };
//     if (isRecipe !== undefined) query.isRecipe = isRecipe === 'true';
    
//     const skip = (page - 1) * limit;
    
//     const [foods, total] = await Promise.all([
//       Food.find(query)
//         .sort({ name: 1 })
//         .skip(skip)
//         .limit(parseInt(limit)),
//       Food.countDocuments(query)
//     ]);
    
//     res.json({
//       foods,
//       pagination: {
//         total,
//         page: parseInt(page),
//         limit: parseInt(limit),
//         pages: Math.ceil(total / limit)
//       }
//     });
    
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get recipe tags
// router.get('/tags', protect, async (req, res) => {
//   try {
//     const tags = await Food.distinct('tags', { 
//       tags: { $exists: true, $ne: [] } 
//     });
//     res.json(tags);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get categories
// router.get('/categories', protect, async (req, res) => {
//   try {
//     const categories = await Food.distinct('category');
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Create custom food
// router.post('/', protect, async (req, res) => {
//   try {
//     const food = new Food({ 
//       ...req.body, 
//       isCustom: true, 
//       createdBy: req.user._id,
//       isRecipe: false,
//       source: 'custom'
//     });
//     await food.save();
//     res.status(201).json(food);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Helper functions (same as in script)
// function mapCuisineToCategory(cuisine, tags, mealType) {
//   const lowerTags = tags.map(t => t.toLowerCase());
//   const lowerMealType = mealType.map(m => m.toLowerCase());
  
//   if (lowerTags.includes('salad') || lowerTags.includes('vegetarian')) return 'vegetable';
//   if (lowerTags.includes('smoothie') || lowerMealType.includes('beverage')) return 'beverage';
//   if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 'protein';
//   if (lowerTags.includes('pasta') || lowerTags.includes('rice') || lowerTags.includes('grains')) return 'grains';
//   if (lowerTags.includes('dessert') || lowerTags.includes('cookies')) return 'fats';
//   if (cuisine === 'Italian' || cuisine === 'Mexican' || cuisine === 'Asian') return 'other';
  
//   return 'other';
// }

// function estimateProtein(tags) {
//   const lowerTags = tags.map(t => t.toLowerCase());
//   if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 25;
//   if (lowerTags.includes('vegetarian')) return 8;
//   return 15;
// }

// function estimateCarbs(tags) {
//   const lowerTags = tags.map(t => t.toLowerCase());
//   if (lowerTags.includes('pasta') || lowerTags.includes('rice')) return 45;
//   if (lowerTags.includes('dessert')) return 35;
//   return 20;
// }

// function estimateFat(tags) {
//   const lowerTags = tags.map(t => t.toLowerCase());
//   if (lowerTags.includes('dessert') || lowerTags.includes('fried')) return 18;
//   return 12;
// }

// module.exports = router;
// new3
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Food = require('../models/Food');
const axios = require('axios');

// Initialize recipes from dummyjson API
router.get('/initialize-recipes', protect, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin' && req.user.role !== 'superAdmin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const { limit = 30 } = req.query;
    
    const response = await axios.get(`https://dummyjson.com/recipes?limit=${limit}`);
    const recipes = response.data.recipes;
    
    let addedCount = 0;
    let skippedCount = 0;
    
    for (const recipe of recipes) {
      try {
        // Check if recipe already exists
        const existingFood = await Food.findOne({ 
          name: { $regex: new RegExp(`^${recipe.name}$`, 'i') },
          source: 'dummyjson'
        });
        
        if (existingFood) {
          skippedCount++;
          continue;
        }
        
        // Map recipe to food
        const foodData = {
          name: recipe.name,
          category: mapCuisineToCategory(recipe.cuisine, recipe.tags, recipe.mealType),
          servingSize: {
            amount: 1,
            unit: 'serving'
          },
          nutrition: {
            calories: recipe.caloriesPerServing,
            protein: estimateProtein(recipe.tags),
            carbs: estimateCarbs(recipe.tags),
            fat: estimateFat(recipe.tags),
            fiber: 0,
            sugar: 0
          },
          isCustom: false,
          isRecipe: true,
          source: 'dummyjson',
          sourceId: recipe.id.toString(),
          image: recipe.image,
          difficulty: recipe.difficulty,
          prepTimeMinutes: recipe.prepTimeMinutes,
          cookTimeMinutes: recipe.cookTimeMinutes,
          servings: recipe.servings,
          mealType: recipe.mealType,
          tags: recipe.tags,
          cuisine: recipe.cuisine,
          createdBy: req.user._id
        };
        
        const food = new Food(foodData);
        await food.save();
        addedCount++;
        
      } catch (error) {
        console.error(`Error saving recipe "${recipe.name}":`, error.message);
        skippedCount++;
      }
    }
    
    res.json({
      message: 'Recipe initialization completed',
      added: addedCount,
      skipped: skippedCount,
      total: await Food.countDocuments({})
    });
    
  } catch (error) {
    console.error('Recipe initialization error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all foods (including recipes)
// router.get('/', protect, async (req, res) => {
//   try {
//     const { 
//       search, 
//       category, 
//       mealType, 
//       tag,
//       isRecipe,
//       page = 1,
//       limit = 20
//     } = req.query;
    
//     let query = { 
//       $or: [
//         { isCustom: false }, 
//         { createdBy: req.user._id }
//       ] 
//     };
    
//     if (search) query.name = { $regex: search, $options: 'i' };
//     if (category && category !== 'all') query.category = category;
//     if (mealType && mealType !== 'all') query.mealType = { $in: [mealType] };
//     if (tag && tag !== 'all') query.tags = { $in: [tag] };
//     if (isRecipe !== undefined) query.isRecipe = isRecipe === 'true';
    
//     const skip = (page - 1) * limit;
    
//     const [foods, total] = await Promise.all([
//       Food.find(query)
//         .sort({ name: 1 })
//         .skip(skip)
//         .limit(parseInt(limit)),
//       Food.countDocuments(query)
//     ]);
    
//     res.json({
//       message:"Search Result",
//       foods,
//       pagination: {
//         total,
//         page: parseInt(page),
//         limit: parseInt(limit),
//         pages: Math.ceil(total / limit)
//       }
//     });
    
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// new
router.get('/', protect, async (req, res) => {
  try {
    const { 
      search, 
      category, 
      mealType, 
      tag,
      isRecipe,
      page = 1,
      limit = 20
    } = req.query;
    
    // Remove the $or condition completely
    let query = {};
    
    if (search) query.name = { $regex: search, $options: 'i' };
    if (category && category !== 'all') query.category = category;
    if (mealType && mealType !== 'all') query.mealType = { $in: [mealType] };
    if (tag && tag !== 'all') query.tags = { $in: [tag] };
    if (isRecipe !== undefined) query.isRecipe = isRecipe === 'true';
    
    const skip = (page - 1) * limit;
    
    const [foods, total] = await Promise.all([
      Food.find(query)
        .sort({ name: 1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Food.countDocuments(query)
    ]);
    
    res.json({
      message:"Search Result",
      foods,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get recipe tags
router.get('/tags', protect, async (req, res) => {
  try {
    const tags = await Food.distinct('tags', { 
      tags: { $exists: true, $ne: [] } 
    });
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get categories
router.get('/categories', protect, async (req, res) => {
  try {
    const categories = await Food.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get meal types
router.get('/meal-types', protect, async (req, res) => {
  try {
    const mealTypes = await Food.distinct('mealType');
    // Flatten array of arrays
    const flattened = [...new Set(mealTypes.flat())];
    res.json(flattened);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create custom food
router.post('/', protect, async (req, res) => {
  try {
    const food = new Food({ 
      ...req.body, 
      isCustom: true, 
      createdBy: req.user._id,
      isRecipe: false,
      source: 'custom'
    });
    await food.save();
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update food
router.put('/:id', protect, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    
    // Only allow creators to update their custom foods
    if (food.isCustom && food.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this food' });
    }
    
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json(updatedFood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete custom food
router.delete('/:id', protect, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    
    // Only allow deletion of custom foods created by the user
    if (!food.isCustom || food.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this food' });
    }
    
    await Food.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper functions
function mapCuisineToCategory(cuisine, tags, mealType) {
  const lowerTags = tags.map(t => t.toLowerCase());
  const lowerMealType = mealType.map(m => m.toLowerCase());
  
  if (lowerTags.includes('salad') || lowerTags.includes('vegetarian')) return 'vegetable';
  if (lowerTags.includes('smoothie') || lowerMealType.includes('beverage')) return 'beverage';
  if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 'protein';
  if (lowerTags.includes('pasta') || lowerTags.includes('rice') || lowerTags.includes('grains')) return 'grains';
  if (lowerTags.includes('dessert') || lowerTags.includes('cookies')) return 'fats';
  if (cuisine === 'Italian' || cuisine === 'Mexican' || cuisine === 'Asian') return 'other';
  
  return 'other';
}

function estimateProtein(tags) {
  const lowerTags = tags.map(t => t.toLowerCase());
  if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 25;
  if (lowerTags.includes('vegetarian')) return 8;
  return 15;
}

function estimateCarbs(tags) {
  const lowerTags = tags.map(t => t.toLowerCase());
  if (lowerTags.includes('pasta') || lowerTags.includes('rice')) return 45;
  if (lowerTags.includes('dessert')) return 35;
  return 20;
}

function estimateFat(tags) {
  const lowerTags = tags.map(t => t.toLowerCase());
  if (lowerTags.includes('dessert') || lowerTags.includes('fried')) return 18;
  return 12;
}

module.exports = router;