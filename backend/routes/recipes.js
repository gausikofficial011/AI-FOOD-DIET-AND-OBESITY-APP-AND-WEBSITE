// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/auth');
// const Recipe = require('../models/Recipe');
// const Food = require('../models/Food');

// router.get('/', protect, async (req, res) => {
//   try {
//     const { category, difficulty, search } = req.query;
//     let query = { $or: [{ isPublic: true }, { createdBy: req.user._id }] };
//     if (category) query.category = category;
//     if (difficulty) query.difficulty = difficulty;
//     if (search) query.title = { $regex: search, $options: 'i' };

//     const recipes = await Recipe.find(query).populate('ingredients.food')
//       .populate('createdBy', 'username').sort({ createdAt: -1 });
//     res.json(recipes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get('/suggestions', protect, async (req, res) => {
//   try {
//     const recipes = await Recipe.find({ isPublic: true })
//       .populate('ingredients.food').limit(10);
//     res.json(recipes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.post('/', protect, async (req, res) => {
//   try {
//     const recipe = new Recipe({ ...req.body, createdBy: req.user._id });
//     await recipe.save();
//     res.status(201).json(recipe);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// // Delete a recipe by ID
// router.delete('/:id', protect, async (req, res) => {
//   try {
//     const recipe = await Recipe.findOne({
//       _id: req.params.id,
//       createdBy: req.user._id // Ensure user owns the recipe
//     });

//     if (!recipe) {
//       return res.status(404).json({ message: 'Recipe not found or you do not have permission to delete it' });
//     }

//     await recipe.deleteOne();
//     res.json({ message: 'Recipe deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
// new
// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/auth');
// const Recipe = require('../models/Recipe');
// const Food = require('../models/Food');
// const axios = require('axios');

// // External API configuration
// const DUMMY_JSON_API = 'https://dummyjson.com/recipes';

// // Helper function to map external recipe data to our schema
// const mapExternalRecipe = (externalRecipe, isCustom = false) => {
//   return {
//     _id: isCustom ? `custom-${Date.now()}` : `external-${externalRecipe.id}`,
//     title: externalRecipe.name,
//     description: externalRecipe.review || '',
//     preparationTime: externalRecipe.prepTimeMinutes,
//     cookingTime: externalRecipe.cookTimeMinutes,
//     servings: externalRecipe.servings,
//     nutrition: {
//       calories: externalRecipe.caloriesPerServing,
//       protein: estimateProtein(externalRecipe.tags),
//       carbs: estimateCarbs(externalRecipe.tags),
//       fat: estimateFat(externalRecipe.tags)
//     },
//     difficulty: externalRecipe.difficulty,
//     category: mapMealTypeToCategory(externalRecipe.mealType),
//     image: externalRecipe.image,
//     tags: externalRecipe.tags,
//     mealType: externalRecipe.mealType,
//     cuisine: externalRecipe.cuisine,
//     instructions: externalRecipe.instructions,
//     ingredients: externalRecipe.ingredients.map((ing, index) => ({
//       name: ing,
//       amount: 100,
//       unit: 'grams'
//     })),
//     rating: externalRecipe.rating,
//     reviewCount: externalRecipe.reviewCount,
//     isExternal: !isCustom,
//     isPublic: true,
//     createdAt: isCustom ? new Date() : new Date(externalRecipe.id * 1000)
//   };
// };

// // Helper functions for nutrition estimation
// const estimateProtein = (tags) => {
//   if (!tags) return 15;
//   const lowerTags = tags.map(t => t.toLowerCase());
//   if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 25;
//   if (lowerTags.includes('vegetarian')) return 8;
//   return 15;
// };

// const estimateCarbs = (tags) => {
//   if (!tags) return 20;
//   const lowerTags = tags.map(t => t.toLowerCase());
//   if (lowerTags.includes('pasta') || lowerTags.includes('rice')) return 45;
//   if (lowerTags.includes('dessert')) return 35;
//   return 20;
// };

// const estimateFat = (tags) => {
//   if (!tags) return 12;
//   const lowerTags = tags.map(t => t.toLowerCase());
//   if (lowerTags.includes('dessert') || lowerTags.includes('fried')) return 18;
//   return 12;
// };

// const mapMealTypeToCategory = (mealTypes) => {
//   if (!mealTypes || mealTypes.length === 0) return 'other';
//   const firstType = mealTypes[0].toLowerCase();
//   switch(firstType) {
//     case 'breakfast': return 'breakfast';
//     case 'lunch': return 'lunch';
//     case 'dinner': return 'dinner';
//     case 'dessert': return 'dessert';
//     case 'snack': return 'snack';
//     default: return 'other';
//   }
// };

// // Get all recipes (combines external and user recipes)
// router.get('/', protect, async (req, res) => {
//   try {
//     const { category, difficulty, search, tag, page = 1, limit = 10 } = req.query;
//     const skip = (page - 1) * limit;
    
//     // Fetch external recipes
//     let externalRecipes = [];
//     try {
//       const externalResponse = await axios.get(`${DUMMY_JSON_API}?limit=100`);
//       externalRecipes = externalResponse.data.recipes.map(recipe => 
//         mapExternalRecipe(recipe)
//       );
//     } catch (externalError) {
//       console.error('Error fetching external recipes:', externalError.message);
//       // Continue with local recipes if external API fails
//     }

//     // Build query for local recipes
//     let query = { 
//       $or: [
//         { isPublic: true }, 
//         { createdBy: req.user._id }
//       ] 
//     };
    
//     // Apply filters for local recipes
//     if (category && category !== 'all') query.category = category;
//     if (difficulty && difficulty !== 'all') query.difficulty = difficulty;
//     if (search) {
//       query.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } },
//         { tags: { $regex: search, $options: 'i' } }
//       ];
//     }
//     if (tag && tag !== 'all') query.tags = tag;

//     // Fetch local recipes
//     const localRecipes = await Recipe.find(query)
//       .populate('createdBy', 'username')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(parseInt(limit));

//     // Combine and filter all recipes
//     let allRecipes = [...externalRecipes, ...localRecipes.map(r => r.toObject())];

//     // Apply filters to combined list
//     if (category && category !== 'all') {
//       allRecipes = allRecipes.filter(recipe => recipe.category === category);
//     }
//     if (difficulty && difficulty !== 'all') {
//       allRecipes = allRecipes.filter(recipe => recipe.difficulty === difficulty);
//     }
//     if (search) {
//       const searchLower = search.toLowerCase();
//       allRecipes = allRecipes.filter(recipe => 
//         recipe.title.toLowerCase().includes(searchLower) ||
//         recipe.description?.toLowerCase().includes(searchLower) ||
//         recipe.tags?.some(tag => tag.toLowerCase().includes(searchLower))
//       );
//     }
//     if (tag && tag !== 'all') {
//       allRecipes = allRecipes.filter(recipe => 
//         recipe.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
//       );
//     }

//     // Apply pagination
//     const total = allRecipes.length;
//     const paginatedRecipes = allRecipes.slice(skip, skip + parseInt(limit));

//     res.json({
//       recipes: paginatedRecipes,
//       total,
//       page: parseInt(page),
//       pages: Math.ceil(total / limit)
//     });
//   } catch (error) {
//     console.error('Error in GET /recipes:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get recipe suggestions
// router.get('/suggestions', protect, async (req, res) => {
//   try {
//     // Fetch external recipes for suggestions
//     let suggestions = [];
//     try {
//       const response = await axios.get(`${DUMMY_JSON_API}?limit=5`);
//       suggestions = response.data.recipes.map(recipe => 
//         mapExternalRecipe(recipe)
//       );
//     } catch (externalError) {
//       console.error('Error fetching suggestions:', externalError.message);
//       // Fallback to local recipes
//       suggestions = await Recipe.find({ isPublic: true })
//         .populate('ingredients.food')
//         .limit(5)
//         .sort({ createdAt: -1 });
//     }

//     res.json(suggestions);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get available tags (from external API)
// router.get('/tags', protect, async (req, res) => {
//   try {
//     const response = await axios.get(`${DUMMY_JSON_API}/tags`);
//     res.json(response.data);
//   } catch (error) {
//     console.error('Error fetching tags:', error.message);
//     // Return default tags if external API fails
//     res.json([
//       'vegetarian', 'healthy', 'dessert', 'dinner', 
//       'lunch', 'breakfast', 'snack', 'protein', 'pasta'
//     ]);
//   }
// });

// // Get recipe by ID (handles both external and local)
// router.get('/:id', protect, async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Check if it's an external recipe ID
//     if (id.startsWith('external-')) {
//       const externalId = id.replace('external-', '');
//       try {
//         const response = await axios.get(`${DUMMY_JSON_API}/${externalId}`);
//         const recipe = mapExternalRecipe(response.data);
//         res.json(recipe);
//       } catch (externalError) {
//         return res.status(404).json({ message: 'External recipe not found' });
//       }
//     } 
//     // Check if it's a custom recipe ID
//     else if (id.startsWith('custom-')) {
//       // For custom recipes, they're stored in memory on frontend
//       return res.status(404).json({ message: 'Custom recipe not found in database' });
//     }
//     // It's a local database recipe
//     else {
//       const recipe = await Recipe.findOne({
//         _id: id,
//         $or: [{ isPublic: true }, { createdBy: req.user._id }]
//       }).populate('ingredients.food').populate('createdBy', 'username');

//       if (!recipe) {
//         return res.status(404).json({ message: 'Recipe not found' });
//       }
//       res.json(recipe);
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Create a new recipe
// router.post('/', protect, async (req, res) => {
//   try {
//     const recipeData = {
//       ...req.body,
//       createdBy: req.user._id,
//       isExternal: false,
//       isPublic: req.body.isPublic || false,
//       likes: [],
//       saves: []
//     };

//     // Convert ingredients if they come from the simplified frontend form
//     if (recipeData.ingredients && Array.isArray(recipeData.ingredients)) {
//       recipeData.ingredients = recipeData.ingredients.map(ing => ({
//         food: ing.foodId, // This should be a Food ID
//         amount: ing.amount,
//         unit: ing.unit || 'grams'
//       }));
//     }

//     const recipe = new Recipe(recipeData);
//     await recipe.save();
    
//     // Populate the createdBy field for response
//     await recipe.populate('createdBy', 'username');
    
//     res.status(201).json(recipe);
//   } catch (error) {
//     console.error('Error creating recipe:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Like a recipe
// router.post('/:id/like', protect, async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Check if it's an external recipe
//     if (id.startsWith('external-') || id.startsWith('custom-')) {
//       // For external/custom recipes, we'll handle likes in memory on frontend
//       // Return success but don't store in database
//       return res.json({ 
//         message: 'Like recorded (frontend only)',
//         recipeId: id,
//         liked: true 
//       });
//     }
    
//     // It's a local database recipe
//     const recipe = await Recipe.findById(id);
    
//     if (!recipe) {
//       return res.status(404).json({ message: 'Recipe not found' });
//     }

//     // Check if user already liked the recipe
//     const alreadyLiked = recipe.likes.includes(req.user._id);
    
//     if (alreadyLiked) {
//       // Unlike
//       recipe.likes = recipe.likes.filter(userId => !userId.equals(req.user._id));
//     } else {
//       // Like
//       recipe.likes.push(req.user._id);
//     }
    
//     await recipe.save();
//     res.json({ 
//       likes: recipe.likes.length,
//       liked: !alreadyLiked,
//       recipeId: recipe._id 
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Save a recipe to meal plan
// router.post('/:id/save', protect, async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Check if it's an external recipe
//     if (id.startsWith('external-') || id.startsWith('custom-')) {
//       // For external/custom recipes, we'll handle saves in memory on frontend
//       return res.json({ 
//         message: 'Save recorded (frontend only)',
//         recipeId: id,
//         saved: true 
//       });
//     }
    
//     // It's a local database recipe
//     const recipe = await Recipe.findById(id);
    
//     if (!recipe) {
//       return res.status(404).json({ message: 'Recipe not found' });
//     }

//     // Check if user already saved the recipe
//     const alreadySaved = recipe.saves.includes(req.user._id);
    
//     if (alreadySaved) {
//       // Remove from saves
//       recipe.saves = recipe.saves.filter(userId => !userId.equals(req.user._id));
//     } else {
//       // Add to saves
//       recipe.saves.push(req.user._id);
//     }
    
//     await recipe.save();
//     res.json({ 
//       saves: recipe.saves.length,
//       saved: !alreadySaved,
//       recipeId: recipe._id 
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Delete a recipe by ID
// router.delete('/:id', protect, async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     // Check if it's an external or custom recipe
//     if (id.startsWith('external-') || id.startsWith('custom-')) {
//       return res.status(400).json({ 
//         message: 'Cannot delete external or custom recipes from database' 
//       });
//     }
    
//     // It's a local database recipe
//     const recipe = await Recipe.findOne({
//       _id: id,
//       createdBy: req.user._id // Ensure user owns the recipe
//     });

//     if (!recipe) {
//       return res.status(404).json({ 
//         message: 'Recipe not found or you do not have permission to delete it' 
//       });
//     }

//     await recipe.deleteOne();
//     res.json({ message: 'Recipe deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get user's saved recipes
// router.get('/user/saved', protect, async (req, res) => {
//   try {
//     const savedRecipes = await Recipe.find({ saves: req.user._id })
//       .populate('createdBy', 'username')
//       .sort({ createdAt: -1 });
    
//     res.json(savedRecipes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get user's created recipes
// router.get('/user/created', protect, async (req, res) => {
//   try {
//     const userRecipes = await Recipe.find({ createdBy: req.user._id })
//       .populate('createdBy', 'username')
//       .sort({ createdAt: -1 });
    
//     res.json(userRecipes);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;

// new1
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Recipe = require('../models/Recipe');
const Food = require('../models/Food');
const axios = require('axios');

// External API configuration
const DUMMY_JSON_API = 'https://dummyjson.com/recipes';

// Helper function to map external recipe data to our schema
// Helper function to map external recipe data to our schema
const mapExternalRecipe = (externalRecipe) => {
  // Normalize difficulty to lowercase
  const normalizeDifficulty = (difficulty) => {
    if (!difficulty) return 'medium';
    const lower = difficulty.toLowerCase();
    if (['easy', 'medium', 'hard'].includes(lower)) return lower;
    return 'medium'; // Default value
  };

  return {
    title: externalRecipe.name,
    description: externalRecipe.review || '',
    preparationTime: externalRecipe.prepTimeMinutes,
    cookingTime: externalRecipe.cookTimeMinutes,
    servings: externalRecipe.servings,
    nutrition: {
      calories: externalRecipe.caloriesPerServing,
      protein: estimateProtein(externalRecipe.tags),
      carbs: estimateCarbs(externalRecipe.tags),
      fat: estimateFat(externalRecipe.tags)
    },
    difficulty: normalizeDifficulty(externalRecipe.difficulty), // Normalize here
    category: mapMealTypeToCategory(externalRecipe.mealType),
    image: externalRecipe.image,
    tags: externalRecipe.tags,
    mealType: externalRecipe.mealType,
    cuisine: externalRecipe.cuisine,
    instructions: externalRecipe.instructions,
    ingredients: externalRecipe.ingredients.map((ing, index) => ({
      name: ing,
      amount: 100,
      unit: 'grams'
    })),
    rating: externalRecipe.rating,
    reviewCount: externalRecipe.reviewCount,
    isExternal: true,
    isPublic: true,
    externalId: externalRecipe.id.toString(),
    // createdBy: null
  };
};

// Helper functions for nutrition estimation
const estimateProtein = (tags) => {
  if (!tags) return 15;
  const lowerTags = tags.map(t => t.toLowerCase());
  if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 25;
  if (lowerTags.includes('vegetarian')) return 8;
  return 15;
};

const estimateCarbs = (tags) => {
  if (!tags) return 20;
  const lowerTags = tags.map(t => t.toLowerCase());
  if (lowerTags.includes('pasta') || lowerTags.includes('rice')) return 45;
  if (lowerTags.includes('dessert')) return 35;
  return 20;
};

const estimateFat = (tags) => {
  if (!tags) return 12;
  const lowerTags = tags.map(t => t.toLowerCase());
  if (lowerTags.includes('dessert') || lowerTags.includes('fried')) return 18;
  return 12;
};

const mapMealTypeToCategory = (mealTypes) => {
  if (!mealTypes || mealTypes.length === 0) return 'other';
  const firstType = mealTypes[0].toLowerCase();
  switch(firstType) {
    case 'breakfast': return 'breakfast';
    case 'lunch': return 'lunch';
    case 'dinner': return 'dinner';
    case 'dessert': return 'dessert';
    case 'snack': return 'snack';
    default: return 'other';
  }
};

// Function to load DummyJSON data into database (smart loading - no duplicates)
const loadDummyJSONRecipes = async () => {
  try {
    console.log('🔄 Checking for new recipes from DummyJSON API...');
    
    // Fetch all recipes from DummyJSON
    const response = await axios.get(`${DUMMY_JSON_API}?limit=100`);
    const externalRecipes = response.data.recipes;
    
    // Get all existing external IDs from database
    const existingExternalIds = await Recipe.find({ 
      isExternal: true,
      externalId: { $exists: true }
    }).select('externalId');
    
    const existingIdSet = new Set(existingExternalIds.map(r => r.externalId));
    
    let newCount = 0;
    let existingCount = 0;
    let errorCount = 0;
    
    // Process each recipe
    for (const externalRecipe of externalRecipes) {
      try {
        const externalId = externalRecipe.id.toString();
        
        // Check if recipe already exists by externalId
        if (existingIdSet.has(externalId)) {
          existingCount++;
          continue; // Skip already existing recipes
        }
        
        // Create new recipe
        const mappedRecipe = mapExternalRecipe(externalRecipe);
        const recipe = new Recipe(mappedRecipe);
        await recipe.save();
        newCount++;
        
        console.log(`✅ Loaded new recipe: ${externalRecipe.name} (ID: ${externalId})`);
        
      } catch (recipeError) {
        console.error(`❌ Error processing recipe ${externalRecipe.id}:`, recipeError.message);
        errorCount++;
      }
    }
    
    console.log(`📊 DummyJSON recipes check completed:`);
    console.log(`   ✅ New recipes loaded: ${newCount}`);
    console.log(`   ⏭️  Existing recipes skipped: ${existingCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📈 Total external recipes in DB: ${existingCount + newCount}`);
    
    return { 
      new: newCount, 
      existing: existingCount, 
      errors: errorCount,
      total: existingCount + newCount
    };
  } catch (error) {
    console.error('❌ Error loading DummyJSON recipes:', error.message);
    throw error;
  }
};

// Initialize DummyJSON data on server start - SMART LOADING
const initializeExternalRecipes = async () => {
  try {
    // Check if we need to load recipes
    const externalRecipeCount = await Recipe.countDocuments({ isExternal: true });
    
    if (externalRecipeCount === 0) {
      console.log('📥 No external recipes found, loading from DummyJSON...');
      const result = await loadDummyJSONRecipes();
      console.log(`🎉 Initial load complete: ${result.new} recipes loaded`);
    } else {
      console.log(`📊 ${externalRecipeCount} external recipes already exist in database`);
    }
  } catch (error) {
    console.error('❌ Error initializing external recipes:', error);
  }
};

// ========== API ROUTES ==========

// Get all recipes (from database - includes external and user recipes)
router.get('/',  async (req, res) => {
  try {
    const { category, difficulty, search, tag, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    // Build query
    let query = { 
      $or: [
        { isPublic: true }, 
        { createdBy: req.user?._id }
      ] 
    };
    
    // Apply filters
    if (category && category !== 'all') query.category = category;
    if (difficulty && difficulty !== 'all') query.difficulty = difficulty;
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
        { cuisine: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (tag && tag !== 'all') {
      query.tags = { $in: [tag] };
    }

    // Fetch recipes from database
    const recipes = await Recipe.find(query)
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Recipe.countDocuments(query);

    res.json({
      recipes,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error in GET /recipes:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get recipe suggestions
router.get('/suggestions', protect, async (req, res) => {
  try {
    // Get random recipes from database
    const suggestions = await Recipe.aggregate([
      { $match: { isPublic: true } },
      { $sample: { size: 5 } }
    ]);
    
    // Populate createdBy field
    await Recipe.populate(suggestions, { path: 'createdBy', select: 'username' });
    
    res.json(suggestions);
  } catch (error) {
    console.error('Error in GET /recipes/suggestions:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get available tags (from database)
router.get('/tags', protect, async (req, res) => {
  try {
    // Get all unique tags from database
    const tags = await Recipe.distinct('tags', { tags: { $exists: true, $ne: [] } });
    res.json(tags);
  } catch (error) {
    console.error('Error in GET /recipes/tags:', error);
    // Return default tags if database fails
    res.json([
      'vegetarian', 'healthy', 'dessert', 'dinner', 
      'lunch', 'breakfast', 'snack', 'protein', 'pasta'
    ]);
  }
});

// Get recipe by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    
    const recipe = await Recipe.findOne({
      _id: id,
      $or: [{ isPublic: true }, { createdBy: req.user._id }]
    }).populate('createdBy', 'username');

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    
    res.json(recipe);
  } catch (error) {
    console.error('Error in GET /recipes/:id:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new recipe
router.post('/', protect, async (req, res) => {
  try {
    const recipeData = {
      ...req.body,
      createdBy: req.user._id,
      isExternal: false,
      isPublic: req.body.isPublic || false,
      likes: [],
      saves: []
    };

    // Convert ingredients if they come from the simplified frontend form
    if (recipeData.ingredients && Array.isArray(recipeData.ingredients)) {
      recipeData.ingredients = recipeData.ingredients.map(ing => ({
        food: ing.foodId, // This should be a Food ID
        amount: ing.amount,
        unit: ing.unit || 'grams'
      }));
    }

    const recipe = new Recipe(recipeData);
    await recipe.save();
    
    // Populate the createdBy field for response
    await recipe.populate('createdBy', 'username');
    
    res.status(201).json(recipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ message: error.message });
  }
});

// Like a recipe
router.post('/:id/like', protect, async (req, res) => {
  try {
    const { id } = req.params;
    
    const recipe = await Recipe.findById(id);
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user already liked the recipe
    const alreadyLiked = recipe.likes.includes(req.user._id);
    
    if (alreadyLiked) {
      // Unlike
      recipe.likes = recipe.likes.filter(userId => !userId.equals(req.user._id));
    } else {
      // Like
      recipe.likes.push(req.user._id);
    }
    
    await recipe.save();
    res.json({ 
      likes: recipe.likes.length,
      liked: !alreadyLiked,
      recipeId: recipe._id 
    });
  } catch (error) {
    console.error('Error in POST /recipes/:id/like:', error);
    res.status(500).json({ message: error.message });
  }
});

// Save a recipe to meal plan
router.post('/:id/save', protect, async (req, res) => {
  try {
    const { id } = req.params;
    
    const recipe = await Recipe.findById(id);
    
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Check if user already saved the recipe
    const alreadySaved = recipe.saves.includes(req.user._id);
    
    if (alreadySaved) {
      // Remove from saves
      recipe.saves = recipe.saves.filter(userId => !userId.equals(req.user._id));
    } else {
      // Add to saves
      recipe.saves.push(req.user._id);
    }
    
    await recipe.save();
    res.json({ 
      saves: recipe.saves.length,
      saved: !alreadySaved,
      recipeId: recipe._id 
    });
  } catch (error) {
    console.error('Error in POST /recipes/:id/save:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a recipe by ID
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Only allow deletion of non-external recipes
    const recipe = await Recipe.findOne({
      _id: id,
      createdBy: req.user._id,
      isExternal: false // Prevent deletion of external recipes
    });

    if (!recipe) {
      return res.status(404).json({ 
        message: 'Recipe not found or you do not have permission to delete it' 
      });
    }

    await recipe.deleteOne();
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /recipes/:id:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get user's saved recipes
router.get('/user/saved', protect, async (req, res) => {
  try {
    const savedRecipes = await Recipe.find({ saves: req.user._id })
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });
    
    res.json(savedRecipes);
  } catch (error) {
    console.error('Error in GET /recipes/user/saved:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get user's created recipes
router.get('/user/created', protect, async (req, res) => {
  try {
    const userRecipes = await Recipe.find({ 
      createdBy: req.user._id,
      isExternal: false 
    })
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });
    
    res.json(userRecipes);
  } catch (error) {
    console.error('Error in GET /recipes/user/created:', error);
    res.status(500).json({ message: error.message });
  }
});

// Admin endpoint to refresh DummyJSON data (smart refresh - only new recipes)
router.post('/admin/refresh-external',  async (req, res) => {
  try {
    const result = await loadDummyJSONRecipes();
    
    res.json({
      message: 'External recipes refreshed successfully',
      ...result
    });
  } catch (error) {
    console.error('Error refreshing external recipes:', error);
    res.status(500).json({ 
      message: 'Error refreshing external recipes',
      error: error.message 
    });
  }
});

// Get statistics
router.get('/stats/counts', protect, async (req, res) => {
  try {
    const totalRecipes = await Recipe.countDocuments();
    const externalRecipes = await Recipe.countDocuments({ isExternal: true });
    const userRecipes = await Recipe.countDocuments({ 
      isExternal: false,
      createdBy: req.user._id 
    });
    const savedRecipes = await Recipe.countDocuments({ saves: req.user._id });
    
    res.json({
      totalRecipes,
      externalRecipes,
      userRecipes,
      savedRecipes
    });
  } catch (error) {
    console.error('Error in GET /recipes/stats/counts:', error);
    res.status(500).json({ message: error.message });
  }
});

// Export the router and helper functions
module.exports = {
  router,
  initializeExternalRecipes,
  loadDummyJSONRecipes
};