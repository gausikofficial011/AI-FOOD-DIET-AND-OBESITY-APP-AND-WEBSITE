// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const http = require('http');
// const socketIo = require('socket.io');

// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, { cors: { origin: "http://localhost:3000" } });

// app.use(cors());
// app.use(express.json());
// const { router: recipesRouter, initializeExternalRecipes } = require('./routes/recipes');
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nutritrack');

// io.on('connection', (socket) => {
//   socket.on('joinRoom', (userId) => socket.join(userId));
// });

// // Routes
// const authRoutes = require('./routes/auth');
// const foodRoutes = require('./routes/foods');
// const mealRoutes = require('./routes/meals');
// const waterRoutes = require('./routes/water');
// const reportRoutes = require('./routes/reports');
// const recipeRoutes = require('./routes/recipes');
// const socialRoutes = require('./routes/social');
// const notificationRoutes = require('./routes/notifications');
// const barcodeRoutes = require('./routes/barcode');
// const exportRoutes = require('./routes/export');

// app.use('/api/auth', authRoutes);
// app.use('/api/foods', foodRoutes);
// app.use('/api/meals', mealRoutes);
// app.use('/api/water', waterRoutes);
// app.use('/api/reports', reportRoutes);
// // app.use('/api/recipes', recipeRoutes);
// app.use('/api/recipes', recipesRouter);
// app.use('/api/social', socialRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/barcode', barcodeRoutes);
// app.use('/api/export', exportRoutes);

// app.get('/', (req, res) => res.json({ message: 'NutriTrack API Running' }));

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// new
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const http = require('http');
// const socketIo = require('socket.io');

// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, { cors: { origin: "http://localhost:3000" } });

// app.use(cors());
// app.use(express.json());

// // Database connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nutritrack', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Import the recipes router - IMPORTANT: Only import, don't define routes here
// const { router: recipesRouter, initializeExternalRecipes } = require('./routes/recipes');

// // Initialize external recipes AFTER MongoDB connection
// mongoose.connection.once('open', async () => {
//   console.log('✅ MongoDB connected successfully');
  
//   try {
//     // Auto-load recipes if they don't exist
//     await initializeExternalRecipes();
//     console.log('✅ Recipes initialization completed');
//   } catch (error) {
//     console.error('❌ Error initializing recipes:', error);
//   }
// });

// io.on('connection', (socket) => {
//   socket.on('joinRoom', (userId) => socket.join(userId));
// });

// // Import other routes
// const authRoutes = require('./routes/auth');
// const foodRoutes = require('./routes/foods');
// const mealRoutes = require('./routes/meals');
// const waterRoutes = require('./routes/water');
// const reportRoutes = require('./routes/reports');
// const socialRoutes = require('./routes/social');
// const notificationRoutes = require('./routes/notifications');
// const barcodeRoutes = require('./routes/barcode');
// const exportRoutes = require('./routes/export');

// // Use routes
// app.use('/api/auth', authRoutes);
// app.use('/api/foods', foodRoutes);
// app.use('/api/meals', mealRoutes);
// app.use('/api/water', waterRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api/recipes', recipesRouter); // Use the imported router
// app.use('/api/social', socialRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/barcode', barcodeRoutes);
// app.use('/api/export', exportRoutes);

// app.get('/', (req, res) => res.json({ message: 'NutriTrack API Running' }));

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📡 API available at http://localhost:${PORT}/api`);
// });
// new2--working
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const multer = require('multer');
// const socketIo = require('socket.io');
// const axios = require('axios');
// const upload = multer({ dest: 'uploads/' });
// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, { cors: { origin: "http://localhost:3000" } });

// app.use(cors());
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));
// // Existing multer setup


// // 1️⃣ GET /upload → simple HTML form for testing in browser
// app.get('/upload', (req, res) => {
//   res.send(`
//     <h2>Test Image Upload</h2>
//     <form action="/upload" method="POST" enctype="multipart/form-data">
//       <input type="file" name="image" accept="image/*" required />
//       <button type="submit">Upload</button>
//     </form>
//   `);
// });

// // 2️⃣ POST /upload → handles image from React or HTML form



// // Database connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nutritrack', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Import models and axios for auto-initialization
// const Food = require('./models/Food');


// // Function to auto-initialize recipes on server start
// const autoInitializeRecipes = async () => {
//   try {
//     console.log('🚀 Checking if recipes need initialization...');
    
//     // Check if any recipes already exist in Food collection
//     const existingRecipeCount = await Food.countDocuments({ 
//       source: 'dummyjson' 
//     });
    
//     if (existingRecipeCount > 0) {
//       console.log(`✅ ${existingRecipeCount} recipes already exist in database. Skipping auto-initialization.`);
//       return;
//     }
    
//     console.log('📋 No recipes found. Starting auto-initialization from dummyjson API...');
    
//     // Fetch recipes from dummyjson API
//     const response = await axios.get('https://dummyjson.com/recipes?limit=50');
//     const recipes = response.data.recipes;
    
//     console.log(`📥 Fetched ${recipes.length} recipes from API`);
    
//     let addedCount = 0;
//     let skippedCount = 0;
    
//     // Helper functions (same as in recipes.js)
//     const mapCuisineToCategory = (cuisine, tags, mealType) => {
//       const lowerTags = tags.map(t => t.toLowerCase());
//       const lowerMealType = mealType.map(m => m.toLowerCase());
      
//       if (lowerTags.includes('salad') || lowerTags.includes('vegetarian')) return 'vegetable';
//       if (lowerTags.includes('smoothie') || lowerMealType.includes('beverage')) return 'beverage';
//       if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 'protein';
//       if (lowerTags.includes('pasta') || lowerTags.includes('rice') || lowerTags.includes('grains')) return 'grains';
//       if (lowerTags.includes('dessert') || lowerTags.includes('cookies')) return 'fats';
//       if (cuisine === 'Italian' || cuisine === 'Mexican' || cuisine === 'Asian') return 'other';
      
//       return 'other';
//     };

//     const estimateProtein = (tags) => {
//       const lowerTags = tags.map(t => t.toLowerCase());
//       if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 25;
//       if (lowerTags.includes('vegetarian')) return 8;
//       return 15;
//     };

//     const estimateCarbs = (tags) => {
//       const lowerTags = tags.map(t => t.toLowerCase());
//       if (lowerTags.includes('pasta') || lowerTags.includes('rice')) return 45;
//       if (lowerTags.includes('dessert')) return 35;
//       return 20;
//     };

//     const estimateFat = (tags) => {
//       const lowerTags = tags.map(t => t.toLowerCase());
//       if (lowerTags.includes('dessert') || lowerTags.includes('fried')) return 18;
//       return 12;
//     };
    
//     // Process each recipe
//     for (const recipe of recipes) {
//       try {
//         // Check if recipe already exists (case-insensitive, prevent duplicates)
//         const existingFood = await Food.findOne({ 
//           name: { $regex: new RegExp(`^${recipe.name}$`, 'i') },
//           source: 'dummyjson'
//         });
        
//         if (existingFood) {
//           console.log(`⏩ Skipping existing recipe: ${recipe.name}`);
//           skippedCount++;
//           continue;
//         }
        
//         // Create food document from recipe
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
//           cuisine: recipe.cuisine,
//            isExternal: true,
//   externalId: recipe.id.toString(),
//         };
        
//         const food = new Food(foodData);
//         await food.save();
//         addedCount++;
//         console.log(`✅ Added: ${recipe.name}`);
        
//         // Small delay to avoid overwhelming the database
//         await new Promise(resolve => setTimeout(resolve, 100));
        
//       } catch (error) {
//         console.error(`❌ Error saving "${recipe.name}":`, error.message);
//         skippedCount++;
//       }
//     }
    
//     console.log('\n🎉 Recipe auto-initialization completed!');
//     console.log(`📈 Added: ${addedCount} new recipes`);
//     console.log(`⏭️ Skipped: ${skippedCount} (already exist or errors)`);
//     console.log(`📊 Total foods in database: ${await Food.countDocuments({})}`);
    
//   } catch (error) {
//     console.error('❌ Auto-initialization failed:', error.message);
//     console.log('⚠️ Server will continue running without recipes');
//   }
// };

// // Auto-initialize when MongoDB connects
// mongoose.connection.once('open', async () => {
//   console.log('✅ MongoDB connected successfully');
  
//   // Start auto-initialization in background (non-blocking)
//   autoInitializeRecipes().then(() => {
//     console.log('🏁 Recipe initialization process completed');
//   }).catch(error => {
//     console.error('💥 Failed to initialize recipes:', error);
//   });
// });

// app.post('/api/upload', upload.single('image'), async (req, res) => {
//   if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

//   try {
//     const imagePath = path.join(__dirname, req.file.path);

//     // Read image as binary
//     const imageData = fs.readFileSync(imagePath);

//     // Call LogMeals API
//     const response = await axios.post(
//       'https://api.logmeal.es/v2/image/nutrition',
//       imageData,
//       {
//         headers: {
//           'Authorization': `Bearer ${process.env.LOGMEALS_TOKEN}`,
//           'Content-Type': 'image/jpeg'
//         }
//       }
//     );

//     // Delete temporary file
//     fs.unlinkSync(imagePath);

//     // If request came from browser form, show JSON as HTML
//     if (req.headers.accept && req.headers.accept.includes('text/html')) {
//       res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
//     } else {
//       // Otherwise, respond with JSON (for React API)
//       res.json(response.data);
//     }
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.status(500).json({ error: 'Failed to process image' });
//   }
// });
// app.get('/upload', (req, res) => {
//   res.send(`
//     <h2>Test Image Upload</h2>
//     <form action="/upload" method="POST" enctype="multipart/form-data">
//       <input type="file" name="image" accept="image/*" />
//       <button type="submit">Upload</button>
//     </form>
//   `);
// });

// // Import the existing recipes router (DO NOT CHANGE THIS)
// const { router: recipesRouter, initializeExternalRecipes } = require('./routes/recipes');

// io.on('connection', (socket) => {
//   socket.on('joinRoom', (userId) => socket.join(userId));
// });

// // Import other routes
// const authRoutes = require('./routes/auth');
// const foodRoutes = require('./routes/foods');
// const mealRoutes = require('./routes/meals');
// const waterRoutes = require('./routes/water');
// const reportRoutes = require('./routes/reports');
// const socialRoutes = require('./routes/social');
// const notificationRoutes = require('./routes/notifications');
// const barcodeRoutes = require('./routes/barcode');
// const exportRoutes = require('./routes/export');
// // const imageRoutes = require('./routes/imageRoutes');
// // Use routes
// app.use('/api/auth', authRoutes);
// app.use('/api/foods', foodRoutes);
// app.use('/api/meals', mealRoutes);
// app.use('/api/water', waterRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api/recipes', recipesRouter); // Use the imported router
// app.use('/api/social', socialRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/barcode', barcodeRoutes);
// app.use('/api/export', exportRoutes);
// // app.use('/api/image', imageRoutes);
// app.get('/', (req, res) => res.json({ message: 'NutriTrack API Running' }));

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📡 API available at http://localhost:${PORT}/api`);
// });

// jan13--10pm
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const multer = require('multer');
// const socketIo = require('socket.io');
// const axios = require('axios');

// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, { cors: { origin: "http://localhost:3000" } });

// // Multer setup - make sure uploads directory exists
// const upload = multer({ dest: 'uploads/' });

// app.use(cors());
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

// // Make uploads directory accessible
// app.use('/uploads', express.static('uploads'));

// // Database connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nutritrack', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Import models
// const Food = require('./models/Food');

// // 1️⃣ GET /upload → simple HTML form for testing in browser
// app.get('/upload', (req, res) => {
//   res.send(`
//     <h2>Test Image Upload</h2>
//     <form action="/api/upload" method="POST" enctype="multipart/form-data">
//       <input type="file" name="image" accept="image/*" required />
//       <button type="submit">Upload</button>
//     </form>
//   `);
// });

// // 2️⃣ POST /api/upload → handles image from React or HTML form
// // 2️⃣ POST /api/upload → handles image from React or HTML form
// app.post('/api/upload', upload.single('image'), async (req, res) => {
//   if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

//   const imagePath = path.join(__dirname, req.file.path);

//   try {
//     // Read image as binary
//     const imageData = fs.readFileSync(imagePath);

//     // 1️⃣ Upload image to LogMeal for nutrition (get imageId)
//     const uploadResp = await axios.post(
//       'https://api.logmeal.es/v2/image/nutrition',
//       imageData,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.LOGMEALS_TOKEN}`,
//           'Content-Type': 'image/jpeg'
//         }
//       }
//     );

//     const imageId = uploadResp.data.id; // LogMeal returns imageId
//     if (!imageId) throw new Error('No imageId returned from LogMeal');

//     // 2️⃣ Call LogMeal recipe nutritional info API
//     const nutriResp = await axios.post(
//       'https://api.logmeal.com/v2/nutrition/recipe/nutritionalInfo',
//       { imageId },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.LOGMEALS_TOKEN}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );

//     const data = nutriResp.data;

//     // 3️⃣ Parse & structure data (converted from Python code)
//     const summary = {
//       imageId: data.imageId || imageId,
//       meal_serving_size: data.serving_size || null,
//       nutri_score: data.image_nutri_score
//         ? `${data.image_nutri_score.nutri_score_category} (${data.image_nutri_score.nutri_score_standardized})`
//         : null,
//       calories_total: data.nutritional_info?.calories || null,
//       dailyIntakeReference: {},
//       keyNutrients: {},
//       items: []
//     };

//     // Daily Intake Reference
//     const dirf = data.nutritional_info?.dailyIntakeReference || {};
//     ['ENERC_KCAL','PROCNT','FAT','CHOCDF','FIBTG','SUGAR','FASAT','NA'].forEach(k => {
//       const v = dirf[k];
//       if (v?.percent !== undefined) {
//         summary.dailyIntakeReference[k] = { label: v.label || k, percent: Math.round(v.percent*10)/10, level: v.level || null };
//       }
//     });

//     // Key nutrients
//     const tn = data.nutritional_info?.totalNutrients || {};
//     ['PROCNT','FAT','CHOCDF','FIBTG','SUGAR'].forEach(c => {
//       const n = tn[c];
//       if (n?.quantity !== undefined) {
//         summary.keyNutrients[c] = { label: n.label, quantity: Math.round(n.quantity*100)/100, unit: n.unit };
//       }
//     });

//     // Per-item nutritional info
//     const name_map = (Array.isArray(data.ids) && Array.isArray(data.foodName)) 
//       ? Object.fromEntries(data.ids.map((id, i) => [id, data.foodName[i]])) 
//       : {};

//     const items = data.nutritional_info_per_item || [];
//     summary.items = items.map(it => {
//       const iid = it.id;
//       const dname = name_map[iid] || null;
//       const ni = it.nutritional_info || {};
//       const tn_i = ni.totalNutrients || {};
//       const dir_i = ni.dailyIntakeReference || {};

//       const item = {
//         position: it.food_item_position,
//         dish: dname,
//         serving_size: it.serving_size,
//         calories: ni.calories,
//         nutri_score: it.nutri_score ? `${it.nutri_score.nutri_score_category} (${it.nutri_score.nutri_score_standardized})` : null,
//         nutrients: {},
//         dailyIntake: {}
//       };

//       ['PROCNT','FAT','CHOCDF','FIBTG','SUGAR'].forEach(c => {
//         const n = tn_i[c];
//         if (n?.quantity !== undefined) item.nutrients[c] = { label: n.label, quantity: Math.round(n.quantity*100)/100, unit: n.unit };
//       });

//       ['ENERC_KCAL','PROCNT','FAT','CHOCDF','FIBTG','SUGAR','FASAT','NA'].forEach(k => {
//         const v = dir_i[k];
//         if (v?.percent !== undefined) item.dailyIntake[k] = { label: v.label || k, percent: Math.round(v.percent*10)/10, level: v.level || null };
//       });

//       return item;
//     });

//     // Delete temporary file
//     fs.unlinkSync(imagePath);

//     // Return structured nutrition info to frontend
//     res.json({ success: true, nutrition: summary });

//   } catch (error) {
//     console.error('Upload error:', error.response?.data || error.message);
//     if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
//     res.status(500).json({ error: 'Failed to process image', details: error.response?.data || error.message });
//   }
// });


// // Function to auto-initialize recipes on server start
// const autoInitializeRecipes = async () => {
//   try {
//     console.log('🚀 Checking if recipes need initialization...');
    
//     const existingRecipeCount = await Food.countDocuments({ 
//       source: 'dummyjson' 
//     });
    
//     if (existingRecipeCount > 0) {
//       console.log(`✅ ${existingRecipeCount} recipes already exist in database. Skipping auto-initialization.`);
//       return;
//     }
    
//     console.log('📋 No recipes found. Starting auto-initialization from dummyjson API...');
    
//     const response = await axios.get('https://dummyjson.com/recipes?limit=50');
//     const recipes = response.data.recipes;
    
//     console.log(`📥 Fetched ${recipes.length} recipes from API`);
    
//     let addedCount = 0;
//     let skippedCount = 0;
    
//     const mapCuisineToCategory = (cuisine, tags, mealType) => {
//       const lowerTags = tags.map(t => t.toLowerCase());
//       const lowerMealType = mealType.map(m => m.toLowerCase());
      
//       if (lowerTags.includes('salad') || lowerTags.includes('vegetarian')) return 'vegetable';
//       if (lowerTags.includes('smoothie') || lowerMealType.includes('beverage')) return 'beverage';
//       if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 'protein';
//       if (lowerTags.includes('pasta') || lowerTags.includes('rice') || lowerTags.includes('grains')) return 'grains';
//       if (lowerTags.includes('dessert') || lowerTags.includes('cookies')) return 'fats';
//       if (cuisine === 'Italian' || cuisine === 'Mexican' || cuisine === 'Asian') return 'other';
      
//       return 'other';
//     };

//     const estimateProtein = (tags) => {
//       const lowerTags = tags.map(t => t.toLowerCase());
//       if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 25;
//       if (lowerTags.includes('vegetarian')) return 8;
//       return 15;
//     };

//     const estimateCarbs = (tags) => {
//       const lowerTags = tags.map(t => t.toLowerCase());
//       if (lowerTags.includes('pasta') || lowerTags.includes('rice')) return 45;
//       if (lowerTags.includes('dessert')) return 35;
//       return 20;
//     };

//     const estimateFat = (tags) => {
//       const lowerTags = tags.map(t => t.toLowerCase());
//       if (lowerTags.includes('dessert') || lowerTags.includes('fried')) return 18;
//       return 12;
//     };
    
//     for (const recipe of recipes) {
//       try {
//         const existingFood = await Food.findOne({ 
//           name: { $regex: new RegExp(`^${recipe.name}$`, 'i') },
//           source: 'dummyjson'
//         });
        
//         if (existingFood) {
//           console.log(`⏩ Skipping existing recipe: ${recipe.name}`);
//           skippedCount++;
//           continue;
//         }
        
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
//           cuisine: recipe.cuisine,
//           isExternal: true,
//           externalId: recipe.id.toString(),
//         };
        
//         const food = new Food(foodData);
//         await food.save();
//         addedCount++;
//         console.log(`✅ Added: ${recipe.name}`);
        
//         await new Promise(resolve => setTimeout(resolve, 100));
        
//       } catch (error) {
//         console.error(`❌ Error saving "${recipe.name}":`, error.message);
//         skippedCount++;
//       }
//     }
    
//     console.log('\n🎉 Recipe auto-initialization completed!');
//     console.log(`📈 Added: ${addedCount} new recipes`);
//     console.log(`⏭️ Skipped: ${skippedCount} (already exist or errors)`);
//     console.log(`📊 Total foods in database: ${await Food.countDocuments({})}`);
    
//   } catch (error) {
//     console.error('❌ Auto-initialization failed:', error.message);
//   }
// };

// // Auto-initialize when MongoDB connects
// mongoose.connection.once('open', async () => {
//   console.log('✅ MongoDB connected successfully');
  
//   autoInitializeRecipes().then(() => {
//     console.log('🏁 Recipe initialization process completed');
//   }).catch(error => {
//     console.error('💥 Failed to initialize recipes:', error);
//   });
// });

// // Socket.io connection
// io.on('connection', (socket) => {
//   socket.on('joinRoom', (userId) => socket.join(userId));
// });

// // Import other routes
// const { router: recipesRouter, initializeExternalRecipes } = require('./routes/recipes');
// const authRoutes = require('./routes/auth');
// const foodRoutes = require('./routes/foods');
// const mealRoutes = require('./routes/meals');
// const waterRoutes = require('./routes/water');
// const reportRoutes = require('./routes/reports');
// const socialRoutes = require('./routes/social');
// const notificationRoutes = require('./routes/notifications');
// const barcodeRoutes = require('./routes/barcode');
// const exportRoutes = require('./routes/export');

// // Use routes
// app.use('/api/auth', authRoutes);
// app.use('/api/foods', foodRoutes);
// app.use('/api/meals', mealRoutes);
// app.use('/api/water', waterRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api/recipes', recipesRouter);
// app.use('/api/social', socialRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/barcode', barcodeRoutes);
// app.use('/api/export', exportRoutes);

// app.get('/', (req, res) => res.json({ message: 'NutriTrack API Running' }));

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📡 API available at http://localhost:${PORT}/api`);
//   console.log(`📤 Upload endpoint: POST http://localhost:${PORT}/api/upload`);
// });

// jan13-115pm--already working
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const multer = require('multer');
// const socketIo = require('socket.io');
// const axios = require('axios');

// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, { cors: { origin: "http://localhost:3000" } });
// // Create imageanalyze folder
// const IMAGE_ANALYZE_DIR = path.join(__dirname, 'imageanalyze');
// if (!fs.existsSync(IMAGE_ANALYZE_DIR)) {
//   fs.mkdirSync(IMAGE_ANALYZE_DIR, { recursive: true });
//   console.log(`📁 Created imageanalyze directory at: ${IMAGE_ANALYZE_DIR}`);
// }

// // Configure multer for imageanalyze folder
// const imageAnalyzeStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, IMAGE_ANALYZE_DIR);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, 'analysis-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const imageAnalyzeUpload = multer({ 
//   storage: imageAnalyzeStorage,
//   limits: {
//     fileSize: 10 * 1024 * 1024,
//   }
// });
// // Add static serving for imageanalyze folder
// app.use('/imageanalyze', express.static('imageanalyze'));
// // Multer setup
// const upload = multer({ 
//   dest: 'uploads/',
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB limit
//   }
// });
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;
// app.use(cors());
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));
// app.use('/uploads', express.static('uploads'));

// // Database connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nutritrack', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const Food = require('./models/Food');

// // Test endpoint
// app.get('/upload', (req, res) => {
//   res.send(`
//     <h2>Test Image Upload</h2>
//     <form action="/api/upload" method="POST" enctype="multipart/form-data">
//       <input type="file" name="image" accept="image/*" required />
//       <button type="submit">Upload</button>
//     </form>
//   `);
// });

// // POST /api/upload - Two-step LogMeal API process
// // Replace your POST /api/upload endpoint with this complete implementation:

// app.post('/api/upload', upload.single('image'), async (req, res) => {
//   console.log('📤 Upload endpoint hit - Starting LogMeal workflow');
  
//   if (!req.file) {
//     console.error('❌ No file uploaded');
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   console.log('📄 File details:', {
//     originalname: req.file.originalname,
//     mimetype: req.file.mimetype,
//     size: req.file.size
//   });

//   const imagePath = path.join(__dirname, req.file.path);
  
//   try {
//     // Check LogMeal token
//     if (!process.env.LOGMEALS_TOKEN) {
//       throw new Error('LOGMEALS_TOKEN is not set in environment variables');
//     }

//     const token = process.env.LOGMEALS_TOKEN;
//     console.log('🔑 Token preview:', token.substring(0, 10) + '...');

//     // Read image
//     const imageData = fs.readFileSync(imagePath);
//     console.log('📊 Image size:', imageData.length, 'bytes');

//     // === STEP 1: Upload image for segmentation (requires APIUser token) ===
//     console.log('🔄 Step 1: Uploading image for segmentation...');
    
//     let imageId;
//     try {
//       // According to the documentation, we need to send as multipart/form-data
//       const FormData = require('form-data');
//       const form = new FormData();
//       form.append('image', imageData, {
//         filename: req.file.originalname,
//         contentType: req.file.mimetype
//       });

//       const response = await axios.post(
//         'https://api.logmeal.com/v2/image/segmentation/complete',
//         form,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             ...form.getHeaders()
//           },
//           timeout: 30000
//         }
//       );
      
//       console.log('✅ Segmentation successful');
//       console.log('📋 Segmentation response:', JSON.stringify(response.data, null, 2));
      
//       imageId = response.data.imageId;
      
//       if (!imageId) {
//         console.error('⚠️ No imageId in response. Available keys:', Object.keys(response.data));
//         // Try to find imageId in nested structure
//         if (response.data.segmentation_results) {
//           imageId = response.data.segmentation_results.imageId;
//         }
//       }
      
//       if (!imageId) {
//         throw new Error('Could not extract imageId from segmentation response');
//       }
      
//       console.log(`✅ Got imageId: ${imageId}`);
      
//     } catch (error) {
//       console.error('❌ Segmentation failed:', error.response?.status || error.message);
//       console.error('Error details:', error.response?.data);
      
//       if (error.response?.status === 401) {
//         throw new Error('Token is not an APIUser token. Regular User tokens cannot access segmentation.');
//       }
//       throw error;
//     }

//     // === STEP 2: Auto-confirm dishes (simplified - in real app, user would confirm) ===
//     console.log('🔄 Step 2: Getting dish candidates...');
    
//     let dishCandidates;
//     try {
//       // First, we need to get the segmentation results to see what was detected
//       // The documentation shows we need to confirm dishes, but let's get candidates first
//       const response = await axios.post(
//         'https://api.logmeal.com/v2/image/recognition/dish/candidates',
//         { imageId },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           timeout: 30000
//         }
//       );
      
//       dishCandidates = response.data;
//       console.log('✅ Got dish candidates');
      
//     } catch (error) {
//       console.log('⚠️ Dish candidates API not available, skipping...', error.message);
//       dishCandidates = null;
//     }

//     // === STEP 3: Get ingredients (optional step) ===
//     console.log('🔄 Step 3: Getting ingredients...');
    
//     let ingredientsData;
//     try {
//       const response = await axios.post(
//         'https://api.logmeal.com/v2/nutrition/recipe/ingredients',
//         { imageId },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           timeout: 30000
//         }
//       );
      
//       ingredientsData = response.data;
//       console.log('✅ Got ingredients');
      
//     } catch (error) {
//       console.log('⚠️ Ingredients API not available, skipping...', error.message);
//       ingredientsData = null;
//     }

//     // === STEP 4: Get nutritional info (main goal) ===
//     console.log('🔄 Step 4: Getting nutritional information...');
    
//     let nutritionData;
//     try {
//       const response = await axios.post(
//         'https://api.logmeal.com/v2/nutrition/recipe/nutritionalInfo',
//         { imageId },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           timeout: 30000
//         }
//       );
      
//       nutritionData = response.data;
//       console.log('✅ Got nutritional info');
//       console.log('📋 Nutrition response keys:', Object.keys(nutritionData));
      
//     } catch (error) {
//       console.error('❌ Nutrition API failed:', error.response?.status || error.message);
//       console.error('Nutrition error details:', error.response?.data);
//       throw new Error(`Nutrition analysis failed: ${error.message}`);
//     }

//     // Clean up temp file
//     fs.unlinkSync(imagePath);
//     console.log('🧹 Temporary file cleaned up');

//     // === Parse and structure the complete response ===
//     const parsedData = parseCompleteLogMealResponse({
//       imageId,
//       segmentation: dishCandidates,
//       ingredients: ingredientsData,
//       nutrition: nutritionData
//     });
    
//     // Return structured response
//     res.json({
//       success: true,
//       message: 'Image processed successfully via LogMeal API',
//       imageId: imageId,
//       nutrition: parsedData,
//       hasIngredients: !!ingredientsData,
//       hasSegmentation: !!dishCandidates,
//         fileInfo: {
//       path: `imageanalyze/${req.file.filename}`, // RELATIVE PATH (not URL)
//       name: req.file.filename,
//       originalName: req.file.originalname,
//       size: req.file.size
//     },
//     rawData: {
//       nutrition: nutritionData,
//       ingredients: ingredientsData,
//       candidates: dishCandidates
//     }
//     });

//   } catch (error) {
//     console.error('💥 Upload processing error:', error.message);
//     console.error('Stack trace:', error.stack);
    
//     // Clean up temp file if exists
//     if (fs.existsSync(imagePath)) {
//       fs.unlinkSync(imagePath);
//       console.log('🧹 Cleaned up temp file after error');
//     }

//     // Check if it's a token issue
//     let helpMessage = 'Check API documentation for correct usage';
//     if (error.message.includes('APIUser token')) {
//       helpMessage = 'You need an APIUser token, not a regular User token. Visit https://logmeal.com/dashboard to get one.';
//     } else if (error.response?.status === 401) {
//       helpMessage = 'Authentication failed. Your token may be invalid or expired.';
//     }

//     res.status(500).json({
//       success: false,
//       error: 'Failed to process image',
//       message: error.message,
//       details: error.response?.data || 'No additional details',
//       help: helpMessage
//     });
//   }
// });

// // Helper function to parse complete LogMeal response
// function parseCompleteLogMealResponse(data) {
//   const result = {
//     imageId: data.imageId,
//     detectedItems: [],
//     nutritionSummary: {},
//     ingredients: [],
//     timestamp: new Date().toISOString()
//   };

//   // Parse nutrition data (main focus)
//   if (data.nutrition) {
//     // Extract nutritional info per item
//     if (data.nutrition.nutritional_info_per_item && Array.isArray(data.nutrition.nutritional_info_per_item)) {
//       result.detectedItems = data.nutrition.nutritional_info_per_item.map(item => {
//         const itemData = {
//           position: item.food_item_position || null,
//           dish: item.dish_name || null,
//           servingSize: item.serving_size ? `${item.serving_size}g` : null,
//           nutrition: {}
//         };

//         // Extract nutrition for this item
//         if (item.nutritional_info) {
//           const ni = item.nutritional_info;
//           itemData.nutrition = {
//             calories: ni.calories || 0,
//             protein: extractNutrient(ni.totalNutrients, 'PROCNT'),
//             carbs: extractNutrient(ni.totalNutrients, 'CHOCDF'),
//             fat: extractNutrient(ni.totalNutrients, 'FAT'),
//             fiber: extractNutrient(ni.totalNutrients, 'FIBTG'),
//             sugar: extractNutrient(ni.totalNutrients, 'SUGAR')
//           };
//         }

//         // Add nutri-score if available
//         if (item.nutri_score) {
//           itemData.nutriScore = {
//             category: item.nutri_score.nutri_score_category,
//             standardized: item.nutri_score.nutri_score_standardized
//           };
//         }

//         return itemData;
//       });
//     }

//     // Extract overall nutrition summary
//     if (data.nutrition.nutritional_info) {
//       const ni = data.nutrition.nutritional_info;
//       result.nutritionSummary = {
//         calories: ni.calories || 0,
//         protein: extractNutrient(ni.totalNutrients, 'PROCNT'),
//         carbs: extractNutrient(ni.totalNutrients, 'CHOCDF'),
//         fat: extractNutrient(ni.totalNutrients, 'FAT'),
//         fiber: extractNutrient(ni.totalNutrients, 'FIBTG'),
//         sugar: extractNutrient(ni.totalNutrients, 'SUGAR')
//       };

//       // Add daily intake reference if available
//       if (ni.dailyIntakeReference) {
//         result.dailyIntake = {};
//         Object.entries(ni.dailyIntakeReference).forEach(([key, value]) => {
//           if (value && typeof value === 'object' && value.percent !== undefined) {
//             result.dailyIntake[key] = {
//               label: value.label || key,
//               percent: Math.round(value.percent * 10) / 10,
//               level: value.level
//             };
//           }
//         });
//       }
//     }

//     // Add overall nutri-score
//     if (data.nutrition.image_nutri_score) {
//       result.overallNutriScore = {
//         category: data.nutrition.image_nutri_score.nutri_score_category,
//         standardized: data.nutrition.image_nutri_score.nutri_score_standardized
//       };
//     }
//   }

//   // Parse ingredients if available
//   if (data.ingredients && data.ingredients.ingredients) {
//     result.ingredients = data.ingredients.ingredients.map(ing => ({
//       name: ing.name || ing.ingredient_name,
//       quantity: ing.quantity,
//       unit: ing.unit,
//       confidence: ing.confidence
//     }));
//   }

//   // Parse dish candidates if available
//   if (data.segmentation && data.segmentation.candidates) {
//     result.dishCandidates = data.segmentation.candidates.map(candidate => ({
//       name: candidate.dish_name,
//       confidence: candidate.confidence || candidate.probability,
//       category: candidate.category
//     }));
//   }

//   return result;
// }

// function extractNutrient(nutrients, code) {
//   if (!nutrients || !nutrients[code]) return { value: 0, unit: 'g' };
  
//   const nutrient = nutrients[code];
//   return {
//     value: nutrient.quantity || 0,
//     unit: nutrient.unit || 'g',
//     label: nutrient.label || code
//   };
// }

// // Add a token upgrade helper endpoint
// app.get('/api/get-apiuser-token', async (req, res) => {
//   res.json({
//     instructions: 'To get an APIUser token:',
//     steps: [
//       '1. Go to https://logmeal.com/dashboard',
//       '2. Log in to your account',
//       '3. Navigate to "API Keys" or "API Settings"',
//       '4. Look for "Generate APIUser Token" or similar',
//       '5. Copy the token and update your .env file:',
//       '   LOGMEALS_TOKEN=your_new_apiuser_token_here',
//       '',
//       'Note: APIUser tokens typically start with different prefixes',
//       'and have more permissions than regular User tokens.'
//     ],
//     currentTokenType: 'Regular User token (limited access)',
//     requiredTokenType: 'APIUser token (full API access)',
//     featuresAvailableWithAPIUser: [
//       '/v2/image/segmentation/complete',
//       '/v2/nutrition/recipe/nutritionalInfo',
//       '/v2/nutrition/recipe/ingredients',
//       '/v2/image/confirm/dish'
//     ]
//   });
// });

// // Keep the mock endpoint for development
// app.post('/api/upload-mock', upload.single('image'), async (req, res) => {
//   if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

//   // Clean up temp file
//   const imagePath = path.join(__dirname, req.file.path);
//   if (fs.existsSync(imagePath)) {
//     fs.unlinkSync(imagePath);
//   }

//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 800));

//   // Enhanced mock data matching LogMeal structure
//   const mockData = {
//     success: true,
//     message: 'Mock analysis complete (using simulated LogMeal API response)',
//     imageId: 'mock_' + Date.now(),
//     nutrition: {
//       imageId: 'mock_' + Date.now(),
//       detectedItems: [
//         {
//           position: 1,
//           dish: 'Grilled Chicken Breast',
//           servingSize: '200g',
//           nutrition: {
//             calories: 330,
//             protein: { value: 62, unit: 'g', label: 'Protein' },
//             carbs: { value: 0, unit: 'g', label: 'Carbs' },
//             fat: { value: 7, unit: 'g', label: 'Fat' },
//             fiber: { value: 0, unit: 'g', label: 'Fiber' },
//             sugar: { value: 0, unit: 'g', label: 'Sugar' }
//           },
//           nutriScore: {
//             category: 'A',
//             standardized: 1.2
//           }
//         },
//         {
//           position: 2,
//           dish: 'Mixed Green Salad',
//           servingSize: '150g',
//           nutrition: {
//             calories: 30,
//             protein: { value: 2, unit: 'g', label: 'Protein' },
//             carbs: { value: 5, unit: 'g', label: 'Carbs' },
//             fat: { value: 0, unit: 'g', label: 'Fat' },
//             fiber: { value: 3, unit: 'g', label: 'Fiber' },
//             sugar: { value: 2, unit: 'g', label: 'Sugar' }
//           },
//           nutriScore: {
//             category: 'A',
//             standardized: 1.8
//           }
//         }
//       ],
//       nutritionSummary: {
//         calories: 360,
//         protein: { value: 64, unit: 'g', label: 'Protein' },
//         carbs: { value: 5, unit: 'g', label: 'Carbs' },
//         fat: { value: 7, unit: 'g', label: 'Fat' },
//         fiber: { value: 3, unit: 'g', label: 'Fiber' },
//         sugar: { value: 2, unit: 'g', label: 'Sugar' }
//       },
//       overallNutriScore: {
//         category: 'A',
//         standardized: 1.5
//       },
//       dailyIntake: {
//         ENERC_KCAL: { label: 'Calories', percent: 18, level: 'low' },
//         PROCNT: { label: 'Protein', percent: 128, level: 'high' },
//         FAT: { label: 'Fat', percent: 10, level: 'low' },
//         CHOCDF: { label: 'Carbs', percent: 2, level: 'low' }
//       },
//       ingredients: [
//         { name: 'Chicken Breast', quantity: 200, unit: 'g', confidence: 0.95 },
//         { name: 'Lettuce', quantity: 100, unit: 'g', confidence: 0.88 },
//         { name: 'Tomato', quantity: 50, unit: 'g', confidence: 0.82 },
//         { name: 'Olive Oil', quantity: 15, unit: 'ml', confidence: 0.75 }
//       ],
//       dishCandidates: [
//         { name: 'Grilled Chicken', confidence: 0.95, category: 'Protein' },
//         { name: 'Chicken Salad', confidence: 0.85, category: 'Salad' },
//         { name: 'Roasted Chicken', confidence: 0.78, category: 'Protein' }
//       ],
//       timestamp: new Date().toISOString()
//     },
//     hasIngredients: true,
//     hasSegmentation: true,
//     isMock: true,
//     note: 'Replace with APIUser token for real LogMeal API access'
//   };

//   res.json(mockData);
// });
// // Add this endpoint to your server.js
// app.get('/api/verify-token', async (req, res) => {
//   try {
//     if (!process.env.LOGMEALS_TOKEN) {
//       return res.json({
//         success: false,
//         error: 'LOGMEALS_TOKEN is not set in .env file'
//       });
//     }

//     const token = process.env.LOGMEALS_TOKEN;
    
//     // Try to validate token with a simple API call
//     try {
//       const testResponse = await axios.get('https://api.logmeal.com/v2/profile', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         timeout: 10000
//       });

//       res.json({
//         success: true,
//         message: 'Token is valid',
//         tokenPreview: token.length > 10 ? `${token.substring(0, 10)}...` : token,
//         tokenLength: token.length,
//         profile: testResponse.data
//       });
//     } catch (apiError) {
//       res.json({
//         success: false,
//         message: 'Token validation failed',
//         error: apiError.response?.data || apiError.message,
//         status: apiError.response?.status,
//         tokenPreview: token.length > 10 ? `${token.substring(0, 10)}...` : token
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });
// // Test endpoint for LogMeal API
// app.get('/api/test-logmeals', async (req, res) => {
//   try {
//     if (!process.env.LOGMEALS_TOKEN) {
//       return res.status(400).json({
//         success: false,
//         error: 'LOGMEALS_TOKEN is not set'
//       });
//     }

//     const tokenPreview = process.env.LOGMEALS_TOKEN.length > 10 
//       ? `${process.env.LOGMEALS_TOKEN.substring(0, 10)}...` 
//       : process.env.LOGMEALS_TOKEN;

//     res.json({
//       success: true,
//       tokenExists: true,
//       tokenPreview,
//       endpoints: {
//         upload: [
//           'https://api.logmeal.com/v2/image/segmentation/complete',
//           'https://api.logmeal.es/v2/image/segmentation/complete',
//           'https://api.logmeal.ai/v2/image/segmentation/complete'
//         ],
//         nutrition: [
//           'https://api.logmeal.com/v2/nutrition/recipe/nutritionalInfo',
//           'https://api.logmeal.es/v2/nutrition/recipe/nutritionalInfo',
//           'https://api.logmeal.ai/v2/nutrition/recipe/nutritionalInfo'
//         ]
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// // Mock endpoint for testing (without LogMeal API)
// app.post('/api/upload-mock', upload.single('image'), async (req, res) => {
//   console.log('🧪 Mock upload endpoint hit');
  
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   // Clean up temp file
//   const imagePath = path.join(__dirname, req.file.path);
//   if (fs.existsSync(imagePath)) {
//     fs.unlinkSync(imagePath);
//   }

//   // Mock response based on LogMeal format
//   const mockData = {
//     imageId: 'mock_' + Date.now(),
//     serving_size: 350,
//     image_nutri_score: {
//       nutri_score_category: 'A',
//       nutri_score_standardized: 1.5
//     },
//     nutritional_info: {
//       calories: 420,
//       dailyIntakeReference: {
//         ENERC_KCAL: { label: 'Calories', percent: 21, level: 'moderate' },
//         PROCNT: { label: 'Protein', percent: 32, level: 'high' },
//         FAT: { label: 'Fat', percent: 18, level: 'moderate' },
//         CHOCDF: { label: 'Carbs', percent: 15, level: 'low' },
//         FIBTG: { label: 'Fiber', percent: 25, level: 'high' },
//         SUGAR: { label: 'Sugar', percent: 10, level: 'low' }
//       },
//       totalNutrients: {
//         PROCNT: { label: 'Protein', quantity: 28, unit: 'g' },
//         FAT: { label: 'Fat', quantity: 12, unit: 'g' },
//         CHOCDF: { label: 'Carbs', quantity: 45, unit: 'g' },
//         FIBTG: { label: 'Fiber', quantity: 8, unit: 'g' },
//         SUGAR: { label: 'Sugar', quantity: 10, unit: 'g' }
//       }
//     },
//     ids: [1, 2],
//     foodName: ['Grilled Chicken', 'Mixed Salad'],
//     nutritional_info_per_item: [
//       {
//         id: 1,
//         food_item_position: 1,
//         serving_size: 200,
//         nutri_score: { nutri_score_category: 'A', nutri_score_standardized: 1.2 },
//         nutritional_info: {
//           calories: 280,
//           totalNutrients: {
//             PROCNT: { label: 'Protein', quantity: 25, unit: 'g' },
//             FAT: { label: 'Fat', quantity: 8, unit: 'g' },
//             CHOCDF: { label: 'Carbs', quantity: 5, unit: 'g' }
//           },
//           dailyIntakeReference: {
//             PROCNT: { label: 'Protein', percent: 50, level: 'high' },
//             FAT: { label: 'Fat', percent: 12, level: 'moderate' }
//           }
//         }
//       },
//       {
//         id: 2,
//         food_item_position: 2,
//         serving_size: 150,
//         nutri_score: { nutri_score_category: 'A', nutri_score_standardized: 1.8 },
//         nutritional_info: {
//           calories: 140,
//           totalNutrients: {
//             PROCNT: { label: 'Protein', quantity: 3, unit: 'g' },
//             FAT: { label: 'Fat', quantity: 4, unit: 'g' },
//             CHOCDF: { label: 'Carbs', quantity: 40, unit: 'g' }
//           },
//           dailyIntakeReference: {
//             PROCNT: { label: 'Protein', percent: 6, level: 'low' },
//             FAT: { label: 'Fat', percent: 6, level: 'low' }
//           }
//         }
//       }
//     ]
//   };

//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 1000));

//   res.json({
//     success: true,
//     message: 'Mock response (no API call)',
//     nutrition: {
//       imageId: mockData.imageId,
//       meal_serving_size: mockData.serving_size,
//       nutri_score: 'A (1.5)',
//       calories_total: 420,
//       dailyIntakeReference: {
//         ENERC_KCAL: { label: 'Calories', percent: 21, level: 'moderate' },
//         PROCNT: { label: 'Protein', percent: 32, level: 'high' },
//         FAT: { label: 'Fat', percent: 18, level: 'moderate' }
//       },
//       keyNutrients: {
//         PROCNT: { label: 'Protein', quantity: 28, unit: 'g' },
//         FAT: { label: 'Fat', quantity: 12, unit: 'g' },
//         CHOCDF: { label: 'Carbs', quantity: 45, unit: 'g' }
//       },
//       items: mockData.nutritional_info_per_item.map(item => ({
//         position: item.food_item_position,
//         dish: mockData.foodName[item.id - 1],
//         serving_size: item.serving_size,
//         calories: item.nutritional_info.calories,
//         nutri_score: `${item.nutri_score.nutri_score_category} (${item.nutri_score.nutri_score_standardized})`,
//         nutrients: {
//           PROCNT: { label: 'Protein', quantity: item.nutritional_info.totalNutrients.PROCNT.quantity, unit: 'g' },
//           FAT: { label: 'Fat', quantity: item.nutritional_info.totalNutrients.FAT.quantity, unit: 'g' }
//         }
//       }))
//     },
//     isMock: true
//   });
// });

// // Keep the rest of your code (autoInitializeRecipes, routes, etc.) the same...
// // Chat API endpoint using OpenRouter (free models available)
// // Chat API endpoint using OpenRouter (FREE models)
// // model only not workin
// // app.post('/api/chat', async (req, res) => {
// //   try {
// //     const { message } = req.body;
    
// //     if (!message || message.trim() === '') {
// //       return res.status(400).json({ error: 'Message is required' });
// //     }
    
// //     console.log('🤖 Chat request:', message.substring(0, 50));
    
// //     // Check if API key is configured
// //     if (!process.env.OPENROUTER_API_KEY) {
// //       console.log('⚠️ Using fallback (no API key)');
// //       return res.json({
// //         reply: getFallbackNutritionResponse(message),
// //         note: "Configure OPENROUTER_API_KEY for better responses"
// //       });
// //     }
    
// //     // Try OpenRouter with FREE model
// //     const apiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
// //       method: 'POST',
// //       headers: {
// //         'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
// //         'Content-Type': 'application/json',
// //         'HTTP-Referer': 'http://localhost:3000', // Required for OpenRouter
// //         'X-Title': 'NutriTrack' // Required for OpenRouter
// //       },
// //       body: JSON.stringify({
// //         model: 'mistralai/mistral-7b-instruct:free', // FREE MODEL
// //         messages: [
// //           {
// //             role: 'system',
// //             content: `You are "NutriBot", a professional nutritionist AI assistant. You provide accurate, evidence-based nutrition advice about:
// // - Food composition and calories
// // - Macronutrients (protein, carbs, fats)
// // - Healthy eating habits
// // - Weight management
// // - Dietary restrictions (vegan, gluten-free, keto, etc.)
// // - Meal planning and recipes
// // - Exercise nutrition
// // - Reading food labels

// // Guidelines:
// // 1. Be concise but helpful (2-4 paragraphs max)
// // 2. Use bullet points when helpful
// // 3. Suggest consulting doctors for medical advice
// // 4. Be encouraging and supportive
// // 5. Use metric measurements (grams, kcal)
// // 6. Focus on practical, actionable advice
// // 7. If unsure, admit it and suggest reliable sources

// // Keep responses friendly and professional.`
// //           },
// //           {
// //             role: 'user',
// //             content: message
// //           }
// //         ],
// //         max_tokens: 500,
// //         temperature: 0.7
// //       })
// //     });

// //     const data = await apiResponse.json();
    
// //     if (!apiResponse.ok) {
// //       console.error('OpenRouter API error:', data);
// //       throw new Error(data.error?.message || 'API request failed');
// //     }

// //     if (data.error) {
// //       throw new Error(data.error.message);
// //     }

// //     const reply = data.choices[0]?.message?.content || 'No response generated';
    
// //     console.log('✅ Chat response generated');
    
// //     res.json({ 
// //       reply: reply,
// //       timestamp: new Date().toISOString()
// //     });
    
// //   } catch (error) {
// //     console.error('Chat error:', error.message);
    
// //     // Always return a response, even if error
// //     res.json({
// //       reply: getFallbackNutritionResponse(req.body?.message || ''),
// //       error: "AI service issue. Here's a general answer:",
// //       timestamp: new Date().toISOString()
// //     });
// //   }
// // });
// // jan168:15pm
// // app.post('/api/chat', async (req, res) => {
// //   try {
// //     const { message } = req.body;
    
// //     if (!message || message.trim() === '') {
// //       return res.status(400).json({ error: 'Message is required' });
// //     }
    
// //     console.log('🤖 Chat request:', message);
    
// //     let reply = '';
// //     let source = 'fallback';
    
// //     // Try multiple AI providers in sequence
// //     try {
// //       // 1. First try Hugging Face (free tier available)
// //       reply = await tryHuggingFace(message);
// //       source = 'huggingface';
      
// //     } catch (hfError) {
// //       console.log('Hugging Face failed, trying fallback...');
// //       // 2. If Hugging Face fails, use local fallback
// //       reply = getLocalAIResponse(message);
// //       source = 'local';
// //     }
    
// //     console.log(`✅ Chat response generated (${source}):`, reply.substring(0, 100));
    
// //     res.json({ 
// //       reply: reply,
// //       timestamp: new Date().toISOString(),
// //       source: source
// //     });
    
// //   } catch (error) {
// //     console.error('Chat error:', error.message);
    
// //     // Always return a response
// //     res.json({
// //       reply: "Hello! I'm NutriBot, your nutrition assistant. I can help with meal planning, nutrition facts, weight management, and healthy eating tips. What would you like to know?",
// //       timestamp: new Date().toISOString(),
// //       source: 'error_fallback'
// //     });
// //   }
// // });
// // jan16838pm
// const Chat = require('./models/Chat');

// // Add CORS headers for frontend
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// // Health check endpoint
// app.get('/api/chat/health', (req, res) => {
//   res.json({ 
//     status: 'ok', 
//     ai: 'Groq API (Llama 3.1)',
//     timestamp: new Date().toISOString() 
//   });
// });

// app.post('/api/chat', async (req, res) => {
//   try {
//     const { message,userid } = req.body;
    
//     if (!message || message.trim() === '') {
//       return res.status(400).json({ error: 'Message is required' });
//     }
    
//     console.log('🤖 Chat request:', message.substring(0, 100));
    
//     // ========== STEP 1: GET AI RESPONSE ==========
//     let aiReply = '';
//     let aiSource = '';
    
//     // Try multiple APIs in order
//     try {
//       // Option 1: Try Together.ai (FREE credits)
//       aiReply = await getTogetherAIResponse(message);
//       aiSource = 'together.ai';
//       console.log('✅ Together.ai response');
//     } catch (error1) {
//       console.log('Together.ai failed:', error1.message);
      
//       try {
//         // Option 2: Try Hugging Face Inference (Free)
//         aiReply = await getHuggingFaceResponse(message);
//         aiSource = 'huggingface';
//         console.log('✅ Hugging Face response');
//       } catch (error2) {
//         console.log('Hugging Face failed:', error2.message);
        
//         try {
//           // Option 3: Try Groq with updated model
//           aiReply = await getGroqResponse(message);
//           aiSource = 'groq';
//           console.log('✅ Groq response');
//         } catch (error3) {
//           console.log('Groq failed:', error3.message);
          
//           // Final fallback
//           aiReply = getEnhancedResponse(message);
//           aiSource = 'enhanced_fallback';
//           console.log('✅ Enhanced fallback');
//         }
//       }
//     }
    
//     // ========== STEP 2: SAVE TO DATABASE (Optional) ==========
//     let chatId = null;
    
//     try {
//       // For now, create chat without user authentication
//       // You can add user auth later
//       const chat = new Chat({
//         user: userid,
//         // new mongoose.Types.ObjectId(), // Temporary user ID
//         messages: [
//           {
//             role: 'user',
//             content: message,
//             timestamp: new Date()
//           },
//           {
//             role: 'assistant',
//             content: aiReply,
//             timestamp: new Date()
//           }
//         ],
//         title: message.substring(0, 50) + (message.length > 50 ? '...' : '')
//       });
      
//       await chat.save();
//       chatId = chat._id;
//       console.log(`💾 Saved to DB. Chat ID: ${chatId}`);
//     } catch (dbError) {
//       console.log('Database save skipped:', dbError.message);
//       // Continue even if DB fails
//     }
    
//     // ========== STEP 3: RETURN RESPONSE ==========
//     res.json({ 
//       success: true,
//       reply: aiReply,
//       chatId: chatId,
//       timestamp: new Date().toISOString(),
//       aiSource: aiSource
//     });
    
//   } catch (error) {
//     console.error('Chat error:', error.message);
    
//     res.json({
//       success: true,
//       reply: "Hello! I'm NutriBot, ready to help with nutrition advice. I can assist with meal planning, healthy recipes, weight management, and dietary questions. What would you like to know?",
//       timestamp: new Date().toISOString(),
//       aiSource: 'error_fallback'
//     });
//   }
// });
// // New endpoint for saving image analysis chat
// // app.post('/api/chat/image-analysis', async (req, res) => {
// //   try {
// //     const { 
// //       userId, 
// //       message, 
// //       imageData, 
// //       imagePreview, 
// //       nutritionData,
// //       foodNames,
// //       detectedItems,
// //       nutritionSummary,
// //         filePath,  // ADD THIS - relative file path
// //       fileName,
// //       originalFileName 
// //     } = req.body;
    
// //     console.log('📸 Saving image analysis chat...');
    
// //     if (!userId || !message) {
// //       return res.status(400).json({
// //         success: false,
// //         error: 'userId and message are required'
// //       });
// //     }
    
// //     // Create or find existing chat for this user
// //     let chat = await Chat.findOne({
// //       user: new mongoose.Types.ObjectId(userId),
// //       hasImageAnalysis: true
// //     }).sort({ createdAt: -1 });
    
// //     // If no existing chat with image analysis, create a new one
// //     if (!chat) {
// //       chat = new Chat({
// //         user: new mongoose.Types.ObjectId(userId),
// //         messages: [],
// //         title: 'Food Image Analysis',
// //         hasImageAnalysis: true
// //       });
// //     }
    
// //     // Add user message (optional - you can skip if you want only bot responses)
// //     // chat.messages.push({
// //     //   role: 'user',
// //     //   content: 'Image uploaded for analysis',
// //     //   timestamp: new Date()
// //     // });
    
// //     // Add image analysis response
// //     chat.messages.push({
// //       role: 'assistant',
// //       content: message,
// //       source: 'image_analysis',
// //       isImageAnalysis: true,
// //       metadata: {
// //         foodNames: foodNames || [],
// //         detectedItems: detectedItems || [],
// //         nutritionSummary: nutritionSummary || {},
// //         filePath: filePath || null,  // STORE RELATIVE PATH
// //         fileName: fileName || null,
// //         originalFileName: originalFileName || null
// //       },
// //       imageData: imageData || null,
// //       imagePreview: imagePreview || null,
// //       nutritionData: nutritionData || null,
// //       timestamp: new Date()
// //     });
    
// //     await chat.save();
    
// //     console.log('✅ Image analysis chat saved:', chat._id);
    
// //     res.json({
// //       success: true,
// //       chatId: chat._id,
// //       message: 'Image analysis chat saved successfully',
// //       timestamp: new Date().toISOString()
// //     });
    
// //   } catch (error) {
// //     console.error('❌ Error saving image analysis chat:', error.message);
// //     res.status(500).json({
// //       success: false,
// //       error: error.message,
// //       timestamp: new Date().toISOString()
// //     });
// //   }
// // });

// // jan18752pm
// app.post('/api/chat/image-analysis', async (req, res) => {
//   try {
//     const { 
//       userId, 
//       message, 
//       imageData, 
//       imagePreview, 
//       nutritionData,
//       foodNames,
//       detectedItems,
//       nutritionSummary,
//       filePath,
//       fileName,
//       originalFileName
//     } = req.body;
    
//     console.log('📸 Saving NEW image analysis chat...');
    
//     if (!userId || !message) {
//       return res.status(400).json({
//         success: false,
//         error: 'userId and message are required'
//       });
//     }
    
//     // ========== CREATE NEW DOCUMENT EACH TIME ==========
//     // Don't find existing chat - always create new one
//     const chat = new Chat({
//       user: new mongoose.Types.ObjectId(userId),
//       messages: [
//         {
//           role: 'assistant',
//           content: message,
//           source: 'image_analysis',
//           isImageAnalysis: true,
//           metadata: {
//             foodNames: foodNames || [],
//             detectedItems: detectedItems || [],
//             nutritionSummary: nutritionSummary || {},
//             filePath: filePath || null,
//             fileName: fileName || null,
//             originalFileName: originalFileName || null
//           },
//           imageData: imageData || null,
//           imagePreview: imagePreview || null,
//           nutritionData: nutritionData || null,
//           timestamp: new Date()
//         }
//       ],
//       title: `Food Image Analysis - ${new Date().toLocaleDateString()}`,
//       hasImageAnalysis: true,
//       createdAt: new Date()
//     });
    
//     await chat.save();
    
//     console.log('✅ NEW Image analysis chat saved:', chat._id);
//     console.log('📊 Created at:', chat.createdAt);
    
//     res.json({
//       success: true,
//       chatId: chat._id,
//       message: 'New image analysis chat saved successfully',
//       filePath: filePath,
//       timestamp: new Date().toISOString()
//     });
    
//   } catch (error) {
//     console.error('❌ Error saving image analysis chat:', error.message);
//     res.status(500).json({
//       success: false,
//       error: error.message,
//       timestamp: new Date().toISOString()
//     });
//   }
// });

// // ========== WORKING AI PROVIDERS ==========

// // 1. Together.ai API (FREE $25 credits)
// async function getTogetherAIResponse(message) {
//   const apiKey = process.env.TOGETHER_API_KEY;
  
//   if (!apiKey) {
//     // Sign up at together.ai for free credits
//     throw new Error('TOGETHER_API_KEY not configured');
//   }
  
//   const response = await fetch('https://api.together.xyz/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${apiKey}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       model: 'meta-llama/Llama-3.2-3B-Instruct-Turbo', // FREE model
//       messages: [
//         {
//           role: 'system',
//           content: `You are NutriBot, an expert nutritionist. Provide accurate, practical nutrition advice in 2-3 paragraphs. Focus on:
// - Food nutrition facts
// - Healthy eating habits
// - Meal planning
// - Weight management
// - Dietary restrictions
// Be concise, helpful, and encouraging.`
//         },
//         {
//           role: 'user',
//           content: message
//         }
//       ],
//       max_tokens: 400,
//       temperature: 0.7,
//       stream: false
//     }),
//     timeout: 15000
//   });

//   if (!response.ok) {
//     throw new Error(`Together.ai API: ${response.status}`);
//   }

//   const data = await response.json();
  
//   if (data.choices?.[0]?.message?.content) {
//     return data.choices[0].message.content;
//   }
  
//   throw new Error('No content from Together.ai');
// }

// // 2. Hugging Face Inference (Free tier)
// async function getHuggingFaceResponse(message) {
//   const apiKey = process.env.HF_API_KEY || ''; // Can work without key for some models
  
//   // Try a model that works on free inference
//   const response = await fetch(
//     "https://api-inference.huggingface.co/models/google/flan-t5-base",
//     {
//       method: "POST",
//       headers: {
//         "Authorization": apiKey ? `Bearer ${apiKey}` : "",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         inputs: `Answer this nutrition question: ${message}`,
//         parameters: {
//           max_new_tokens: 200,
//           temperature: 0.7,
//           do_sample: true,
//         }
//       }),
//       timeout: 10000
//     }
//   );

//   if (response.ok) {
//     const data = await response.json();
    
//     if (Array.isArray(data) && data[0]?.generated_text) {
//       return data[0].generated_text;
//     } else if (data?.generated_text) {
//       return data.generated_text;
//     }
//   }
  
//   throw new Error('Hugging Face failed');
// }

// // 3. Groq with updated model
// async function getGroqResponse(message) {
//   const apiKey = process.env.GROQ_API_KEY;
  
//   if (!apiKey) {
//     throw new Error('GROQ_API_KEY not configured');
//   }
  
//   const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${apiKey}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       model: 'llama-3.1-8b-instant', // UPDATED: Use current model
//       messages: [
//         {
//           role: 'system',
//           content: `You are NutriBot, a nutrition expert AI. Provide helpful nutrition advice.`
//         },
//         {
//           role: 'user',
//           content: message
//         }
//       ],
//       max_tokens: 300,
//       temperature: 0.7,
//       stream: false
//     }),
//     timeout: 15000
//   });

//   if (!response.ok) {
//     const error = await response.text();
//     console.error('Groq error:', error);
//     throw new Error(`Groq API: ${response.status}`);
//   }

//   const data = await response.json();
  
//   if (data.choices?.[0]?.message?.content) {
//     return data.choices[0].message.content;
//   }
  
//   throw new Error('No content from Groq');
// }

// // 4. Enhanced response generator
// function getEnhancedResponse(message) {
//   const lowerMsg = message.toLowerCase();
  
//   // Use AI-like templated responses
//   const responses = {
//     greetings: [
//       "Hello! I'm NutriBot, your AI nutrition assistant. I specialize in:\n• Meal planning and recipes\n• Nutrition facts and calorie counts\n• Weight management strategies\n• Dietary restrictions and allergies\n• Healthy eating habits\n\nWhat specific nutrition question can I help you with today?",
//       "Hi there! 👋 As your nutrition AI, I'm here to provide evidence-based advice on:\n- Macronutrient balancing (protein, carbs, fats)\n- Portion control and meal timing\n- Reading food labels\n- Supplement guidance\n- Exercise nutrition\n\nFeel free to ask me anything about food and health!",
//       "Welcome! I'm NutriBot, ready to assist with your nutrition journey. Whether you're looking to lose weight, build muscle, or simply eat healthier, I can provide personalized guidance based on nutritional science."
//     ],
    
//     protein: [
//       `**Protein Sources Analysis:**\n\nAnimal-based (complete proteins):\n• Chicken breast: 31g protein/100g, 165 calories\n• Salmon: 25g protein/100g, 208 calories\n• Eggs: 6g protein each, 78 calories\n• Greek yogurt: 10g protein/100g, 59 calories\n\nPlant-based (combine for complete proteins):\n• Lentils: 9g protein/100g cooked, 116 calories\n• Tofu: 8g protein/100g, 76 calories\n• Chickpeas: 7g protein/100g cooked, 139 calories\n• Quinoa: 4g protein/100g cooked, 120 calories\n\n**Recommendation:** Aim for 0.8-1.2g protein per kg of body weight daily. For muscle building, target 1.6-2.2g/kg.`,
//       `Based on nutritional research, protein is essential for muscle repair, immune function, and satiety. High-quality sources include:\n\nFor vegetarians:\n1. **Legumes + Grains**: Lentils with rice, beans with tortillas\n2. **Dairy/Eggs**: Greek yogurt, cottage cheese, eggs\n3. **Soy Products**: Tofu, tempeh, edamame\n4. **Quinoa**: The only complete plant protein\n5. **Nuts/Seeds**: Hemp seeds, chia seeds, almonds\n\n**Tip:** Spread protein intake throughout the day (20-30g per meal) for optimal absorption.`
//     ],
    
//     breakfast: [
//       `**Healthy Breakfast Options:**\n\n🥣 **High Protein (30g+):**\n• Scrambled eggs (3) with spinach & whole grain toast: 25g protein\n• Greek yogurt bowl with berries, nuts, & chia seeds: 30g protein\n• Protein smoothie: whey protein, banana, spinach, almond milk: 35g protein\n\n🌾 **High Fiber (8g+):**\n• Oatmeal with berries, flax seeds, & almonds: 10g fiber\n• Chia pudding with fruit & nuts: 12g fiber\n• Whole grain toast with avocado & eggs: 8g fiber\n\n⚡ **Quick Options (<5 min):**\n• Overnight oats with protein powder\n• Cottage cheese with fruit\n• Hard-boiled eggs with whole grain crackers\n• Protein bar with an apple`,
//       `**Breakfast Nutrition Strategy:**\n\nAim for a breakfast containing:\n• **Protein:** 20-30g (for satiety & muscle maintenance)\n• **Fiber:** 5-10g (for gut health & blood sugar control)\n• **Healthy Fats:** 10-15g (for hormone health)\n• **Complex Carbs:** 30-50g (for sustained energy)\n\n**Example Meal:**\nScrambled tofu (20g protein) with peppers, onions, and whole grain toast (5g fiber), served with avocado (10g healthy fats). Provides balanced energy for 4-5 hours.`
//     ],
    
//     weight: [
//       `**Weight Management Protocol:**\n\n📊 **Calorie Calculation:**\n1. Maintenance calories = Body weight (kg) × 30\n2. For weight loss: Subtract 300-500 calories\n3. For muscle gain: Add 200-300 calories\n\n🥗 **Nutrition Strategy:**\n• Protein: 30% of calories\n• Carbs: 40% of calories\n• Fats: 30% of calories\n• Water: 3-4 liters daily\n\n🏃 **Exercise Protocol:**\n• Strength training: 3-4× weekly\n• Cardio: 150 mins moderate or 75 mins vigorous weekly\n• NEAT: Increase daily movement (walking, standing)\n\n⏰ **Consistency Factors:**\n• Sleep: 7-9 hours nightly\n• Stress management: Meditation, breathing exercises\n• Meal timing: Consistent eating schedule`,
//       `**Sustainable Weight Loss Approach:**\n\nBased on metabolic research, successful weight management involves:\n\n1. **Nutrition (80%):**\n   - Calorie tracking for 2-4 weeks to establish baseline\n   - Focus on protein & fiber for satiety\n   - Meal prep to reduce decision fatigue\n   - Hydration before meals\n\n2. **Exercise (15%):**\n   - Resistance training to preserve muscle mass\n   - NEAT (non-exercise activity thermogenesis)\n   - Progressive overload principle\n\n3. **Lifestyle (5%):**\n   - Sleep quality & duration\n   - Stress reduction techniques\n   - Social support system\n\n**Expected Rate:** 0.5-1kg (1-2lb) per week is sustainable.`
//     ],
    
//     default: [
//       `I understand you're asking about nutrition. Based on current evidence:\n\n**General Guidelines:**\n1. Eat mostly whole, minimally processed foods\n2. Include a variety of colorful fruits & vegetables\n3. Choose lean proteins & healthy fats\n4. Stay hydrated with water\n5. Practice mindful eating\n\n**For Personalized Advice:**\n- Current dietary habits\n- Specific health goals\n- Activity level\n- Any restrictions/allergies\n\nCould you provide more details about your nutrition objectives?`,
//       `As a nutrition AI analyzing "${message.substring(0, 50)}", I recommend considering:\n\n**Assessment Factors:**\n1. Energy balance (calories in vs out)\n2. Macronutrient distribution\n3. Meal timing & frequency\n4. Food quality & variety\n5. Hydration status\n6. Sleep & recovery\n\n**Next Steps:**\n- Track current intake for 3-7 days\n- Identify one small improvement\n- Implement consistently for 2 weeks\n- Evaluate & adjust\n\nWould you like guidance on any specific aspect?`
//     ]
//   };
  
//   // Determine category
//   let category = 'default';
//   if (/^(hi|hello|hey|good\s(morning|afternoon|evening))/.test(lowerMsg)) category = 'greetings';
//   if (lowerMsg.includes('protein')) category = 'protein';
//   if (lowerMsg.includes('breakfast') || lowerMsg.includes('morning meal')) category = 'breakfast';
//   if (lowerMsg.includes('weight') || lowerMsg.includes('lose') || lowerMsg.includes('gain') || lowerMsg.includes('fat') || lowerMsg.includes('calorie')) category = 'weight';
//   if (lowerMsg.includes('meal') || lowerMsg.includes('food') || lowerMsg.includes('eat') || lowerMsg.includes('recipe') || lowerMsg.includes('diet')) category = 'meal';
  
//   // Select random response from category
//   const categoryResponses = responses[category] || responses.default;
//   const randomIndex = Math.floor(Math.random() * categoryResponses.length);
  
//   return categoryResponses[randomIndex];
// }
// // Hugging Face API Call
// async function tryHuggingFace(message) {
//   // Use a model that works without API key on free tier
//   const response = await fetch(
//     "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
//     {
//       method: "POST",
//       headers: {
//         "Authorization": process.env.HF_API_KEY ? `Bearer ${process.env.HF_API_KEY}` : "",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         inputs: {
//           text: `You are a nutrition expert. User asks: ${message}`,
//           context: ""
//         },
//         parameters: {
//           max_new_tokens: 150,
//           temperature: 0.7,
//           do_sample: true,
//         }
//       }),
//     }
//   );

//   if (response.ok) {
//     const data = await response.json();
    
//     if (data?.generated_text) {
//       return data.generated_text;
//     } else if (data?.conversation?.generated_responses?.[0]) {
//       return data.conversation.generated_responses[0];
//     }
//   }
  
//   throw new Error('Hugging Face API failed');
// }

// // Local AI Response (no API needed)
// function getLocalAIResponse(message) {
//   const lowerMessage = message.toLowerCase().trim();
  
//   // Greetings
//   if (['hi', 'hello', 'hey', 'hi there', 'hello there'].includes(lowerMessage)) {
//     return "Hello! 👋 I'm NutriBot, your nutrition assistant. I can help you with:\n\n" +
//            "• **Meal planning** and healthy recipes\n" +
//            "• **Nutrition facts** about foods\n" +
//            "• **Weight management** tips\n" +
//            "• **Macronutrient** guidance (protein, carbs, fats)\n" +
//            "• **Dietary restrictions** (vegetarian, gluten-free, etc.)\n\n" +
//            "What would you like to know about today?";
//   }
  
//   // Protein questions
//   if (lowerMessage.includes('protein')) {
//     if (lowerMessage.includes('vegetarian') || lowerMessage.includes('vegan')) {
//       return "**Top Plant-Based Protein Sources:**\n\n" +
//              "🥦 **Lentils**: 18g protein per cooked cup\n" +
//              "🥦 **Chickpeas**: 15g protein per cooked cup\n" +
//              "🥦 **Tofu**: 20g protein per 1/2 block\n" +
//              "🥦 **Tempeh**: 31g protein per cup\n" +
//              "🥦 **Edamame**: 17g protein per cooked cup\n" +
//              "🥦 **Quinoa**: 8g protein per cooked cup\n" +
//              "🥦 **Greek Yogurt**: 17g protein per 170g\n\n" +
//              "Aim for 0.8-1.2g protein per kg of body weight daily!";
//     }
//     return "**Protein Guide:**\n\n" +
//            "💪 **Recommended Daily:** 0.8-1.2g per kg body weight\n" +
//            "💪 **High-Protein Foods:** Chicken, fish, eggs, dairy, legumes, tofu\n" +
//            "💪 **Benefits:** Muscle repair, keeps you full, supports metabolism\n\n" +
//            "Would you like specific meal ideas or portion sizes?";
//   }
  
//   // Weight loss
//   if (lowerMessage.includes('weight loss') || lowerMessage.includes('lose weight')) {
//     return "**Sustainable Weight Loss Tips:**\n\n" +
//            "📊 **Calorie Deficit**: Aim for 300-500 calories below maintenance\n" +
//            "🥗 **Protein Focus**: 25-30% of calories from protein\n" +
//            "💧 **Hydration**: Drink 2-3L water daily\n" +
//            "🏃 **Exercise**: 150 mins moderate cardio + strength training weekly\n" +
//            "😴 **Sleep**: 7-9 hours quality sleep\n\n" +
//            "Track your food intake for 1-2 weeks to understand your habits!";
//   }
  
//   // Calories
//   if (lowerMessage.includes('calorie') || lowerMessage.includes('calories')) {
//     return "**Calorie Information:**\n\n" +
//            "🔥 **Average Needs**: Women: 2000 kcal/day, Men: 2500 kcal/day\n" +
//            "📱 **Track with**: MyFitnessPal, LoseIt, or Cronometer\n" +
//            "🍎 **Nutrient-dense foods**: Vegetables, fruits, lean proteins\n" +
//            "🚫 **Limit**: Sugary drinks, processed snacks, fried foods\n\n" +
//            "Need help calculating your specific calorie needs?";
//   }
  
//   // Meal ideas
//   if (lowerMessage.includes('breakfast') || lowerMessage.includes('meal') || lowerMessage.includes('recipe')) {
//     return "**Healthy Meal Ideas:**\n\n" +
//            "🌅 **Breakfast**:\n- Oatmeal with berries & nuts\n- Scrambled eggs with spinach\n- Greek yogurt with fruit\n\n" +
//            "☀️ **Lunch**:\n- Grilled chicken salad\n- Quinoa bowl with veggies\n- Lentil soup\n\n" +
//            "🌙 **Dinner**:\n- Baked salmon with broccoli\n- Stir-fried tofu & vegetables\n- Turkey chili\n\n" +
//            "Would you like a specific recipe or meal plan?";
//   }
  
//   // General nutrition advice
//   if (lowerMessage.includes('healthy') || lowerMessage.includes('diet') || lowerMessage.includes('eat')) {
//     return "**Healthy Eating Principles:**\n\n" +
//            "1. **Colorful Plate**: Fill half with vegetables/fruits\n" +
//            "2. **Protein Priority**: Include protein in every meal\n" +
//            "3. **Healthy Fats**: Avocado, nuts, olive oil\n" +
//            "4. **Whole Carbs**: Brown rice, quinoa, sweet potatoes\n" +
//            "5. **Stay Hydrated**: Water is essential!\n" +
//            "6. **Mindful Eating**: Eat slowly, listen to hunger cues\n\n" +
//            "Any specific foods or diets you're curious about?";
//   }
  
//   // Default response for unknown queries
//   return "I'd love to help with your nutrition question! Could you be more specific about:\n\n" +
//          "• Meal planning\n" +
//          "• Food nutrition facts\n" +
//          "• Weight management\n" +
//          "• Dietary restrictions\n" +
//          "• Healthy recipes\n\n" +
//          "For example: 'What are good protein sources?' or 'How many calories in an avocado?'";
// }

// // Fallback response function
// function getFallbackNutritionResponse(message) {
//   const lowerMessage = message.toLowerCase();
  
//   if (lowerMessage.includes('protein') && lowerMessage.includes('vegetarian')) {
//     return "**Best Protein Sources for Vegetarians:**\n\n• Lentils, chickpeas, beans (15-18g protein per cup)\n• Tofu & Tempeh (20g per 100g)\n• Greek Yogurt (10g per 100g)\n• Quinoa (8g protein per cup)\n• Nuts & Seeds\n• Paneer (18g per 100g)\n\nAim for 0.8-1.2g protein per kg of body weight daily.";
//   }
  
//   if (lowerMessage.includes('calorie') || lowerMessage.includes('weight')) {
//     return "**Weight Management Tips:**\n• Create a 300-500 calorie deficit for weight loss\n• Focus on protein-rich foods\n• Drink plenty of water\n• Regular exercise (cardio + strength)\n• Get enough sleep (7-8 hours)";
//   }
  
//   if (lowerMessage.includes('breakfast') || lowerMessage.includes('meal')) {
//     return "**Healthy Breakfast Ideas:**\n• Oatmeal with berries and nuts\n• Greek yogurt with fruit and honey\n• Scrambled tofu with vegetables\n• Whole grain toast with avocado\n• Smoothie with spinach, banana, and protein powder";
//   }
  
//   if (lowerMessage.includes('water') || lowerMessage.includes('hydrat')) {
//     return "**Hydration Tips:**\n• Drink 8-10 glasses (2-2.5 liters) of water daily\n• More if you exercise or in hot weather\n• Include water-rich foods like cucumber, watermelon\n• Limit sugary drinks and caffeine";
//   }
  
//   return "I'm a nutrition assistant here to help with:\n• Healthy eating habits\n• Meal planning\n• Weight management\n• Food nutrition facts\n• Dietary advice\n\nPlease ask me a specific nutrition question!";
// }
// // Health check endpoint
// app.get('/api/chat/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     ai: process.env.OPENROUTER_API_KEY ? 'OpenRouter (Free)' : 'Fallback mode',
//     hasApiKey: !!process.env.OPENROUTER_API_KEY,
//     timestamp: new Date().toISOString(),
//     endpoint: 'POST /api/chat'
//   });
// });

// // Helper function for fallback responses
// function getFallbackNutritionResponse(message) {
//   const lowerMsg = message.toLowerCase();
  
//   // Common nutrition questions with pre-built answers
//   const responses = {
//     "meal prep for weight loss": `**Meal Prep for Weight Loss:**
    
// 1. **Plan Balanced Meals:**
//    • Lean protein (chicken, fish, tofu): 120-150g per meal
//    • Vegetables: Fill half your plate
//    • Complex carbs (brown rice, quinoa): 1/2 cup cooked
//    • Healthy fats (avocado, olive oil): 1 tbsp

// 2. **Weekly Strategy:**
//    • Sunday: Cook proteins & grains
//    • Wednesday: Prep remaining
//    • Portion into containers (400-500 calories each)

// 3. **Smart Tips:**
//    • Use smaller plates
//    • Drink water before meals
//    • Include protein in every meal
//    • Prep healthy snacks (fruits, nuts, yogurt)

// 4. **Sample Day:**
//    • Breakfast: Greek yogurt + berries
//    • Lunch: Grilled chicken salad
//    • Dinner: Salmon + roasted veggies
//    • Snack: Apple + almond butter`,
    
//     "how many calories": `**Calorie Information:**
    
// • Apple (medium): 95 calories
// • Banana (medium): 105 calories
// • Chicken breast (100g): 165 calories
// • Brown rice (1 cup cooked): 215 calories
// • Avocado (half): 160 calories
// • Eggs (large): 72 calories each

// **Daily Needs (average):**
// • Women: 1,800-2,200 calories
// • Men: 2,200-2,800 calories
// • Adjust based on activity level and goals`,
    
//     "protein sources": `**Protein Sources:**
    
// **Animal-based:**
// • Chicken breast: 31g protein/100g
// • Salmon: 25g protein/100g
// • Eggs: 6g protein each
// • Greek yogurt: 10g protein/100g

// **Plant-based:**
// • Lentils: 9g protein/100g cooked
// • Tofu: 8g protein/100g
// • Chickpeas: 7g protein/100g
// • Quinoa: 4g protein/100g cooked

// **Recommendation:** Aim for 20-30g protein per meal.`,
    
//     "healthy breakfast": `**Healthy Breakfast Ideas:**
    
// 1. **High-Protein:**
//    • Greek yogurt + berries + nuts
//    • Scrambled eggs + spinach
//    • Protein smoothie

// 2. **Quick & Easy:**
//    • Oatmeal with banana
//    • Whole grain toast + avocado
//    • Cottage cheese + fruit

// 3. **Meal Prep:**
//    • Egg muffins
//    • Overnight oats
//    • Chia pudding

// **Tip:** Include protein + fiber to stay full longer.`,
    
//     "lose weight": `**Healthy Weight Loss Tips:**
    
// 1. **Nutrition:**
//    • Create 300-500 calorie deficit daily
//    • Eat more protein and fiber
//    • Limit processed foods
//    • Drink plenty of water

// 2. **Exercise:**
//    • Strength training 2-3x/week
//    • Cardio 150 minutes/week
//    • Daily walking (10,000 steps)

// 3. **Mindset:**
//    • Aim for 1-2 lbs loss per week
//    • Track progress, not perfection
//    • Get enough sleep (7-9 hours)

// **Safe rate:** 0.5-1kg (1-2 lbs) per week`,
    
//     "carbs": `**Carbohydrates Explained:**
    
// **Complex Carbs (Good):**
// • Whole grains (oats, brown rice)
// • Legumes (beans, lentils)
// • Vegetables (sweet potato, squash)
// • Fruits (berries, apples)

// **Simple Carbs (Limit):**
// • Sugar
// • White bread
// • Pastries
// • Sugary drinks

// **Recommendation:** 45-65% of daily calories from carbs, mostly complex.`,
    
//     "diet plan": `**Simple Diet Plan Framework:**
    
// **Daily Structure:**
// • 3 main meals + 1-2 snacks
// • Protein with every meal
// • Vegetables at lunch & dinner
// • Stay hydrated (2-3L water)

// **Portion Guide:**
// • Protein: Palm-sized
// • Carbs: Cupped hand
// • Veggies: Two fists
// • Fats: Thumb-sized

// **Timing:** Eat every 3-4 hours to maintain energy.`,
    
//     "default": `Hello! I'm NutriBot, your nutrition assistant. 🥗

// I can help you with:
// • Calorie and nutrient information
// • Meal planning and recipes
// • Weight management advice
// • Dietary restrictions
// • Healthy eating habits

// Try asking me about:
// "Meal prep for weight loss"
// "How many calories in..."
// "Healthy breakfast ideas"
// "Protein sources"
// "Weight loss tips"

// What would you like to know about nutrition today?`
//   };
  
//   // Check for keywords
//   for (const [key, response] of Object.entries(responses)) {
//     if (lowerMsg.includes(key)) {
//       return response;
//     }
//   }
  
//   return responses.default;
// }
// // [Rest of your code remains the same...]
// // Function to auto-initialize recipes on server start
// const autoInitializeRecipes = async () => {
//   try {
//     console.log('🚀 Checking if recipes need initialization...');
    
//     const existingRecipeCount = await Food.countDocuments({ 
//       source: 'dummyjson' 
//     });
    
//     if (existingRecipeCount > 0) {
//       console.log(`✅ ${existingRecipeCount} recipes already exist in database. Skipping auto-initialization.`);
//       return;
//     }
    
//     console.log('📋 No recipes found. Starting auto-initialization from dummyjson API...');
    
//     const response = await axios.get('https://dummyjson.com/recipes?limit=50');
//     const recipes = response.data.recipes;
    
//     console.log(`📥 Fetched ${recipes.length} recipes from API`);
    
//     let addedCount = 0;
//     let skippedCount = 0;
    
//     const mapCuisineToCategory = (cuisine, tags, mealType) => {
//       const lowerTags = tags.map(t => t.toLowerCase());
//       const lowerMealType = mealType.map(m => m.toLowerCase());
      
//       if (lowerTags.includes('salad') || lowerTags.includes('vegetarian')) return 'vegetable';
//       if (lowerTags.includes('smoothie') || lowerMealType.includes('beverage')) return 'beverage';
//       if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 'protein';
//       if (lowerTags.includes('pasta') || lowerTags.includes('rice') || lowerTags.includes('grains')) return 'grains';
//       if (lowerTags.includes('dessert') || lowerTags.includes('cookies')) return 'fats';
//       if (cuisine === 'Italian' || cuisine === 'Mexican' || cuisine === 'Asian') return 'other';
      
//       return 'other';
//     };

//     const estimateProtein = (tags) => {
//       const lowerTags = tags.map(t => t.toLowerCase());
//       if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 25;
//       if (lowerTags.includes('vegetarian')) return 8;
//       return 15;
//     };

//     const estimateCarbs = (tags) => {
//       const lowerTags = tags.map(t => t.toLowerCase());
//       if (lowerTags.includes('pasta') || lowerTags.includes('rice')) return 45;
//       if (lowerTags.includes('dessert')) return 35;
//       return 20;
//     };

//     const estimateFat = (tags) => {
//       const lowerTags = tags.map(t => t.toLowerCase());
//       if (lowerTags.includes('dessert') || lowerTags.includes('fried')) return 18;
//       return 12;
//     };
    
//     for (const recipe of recipes) {
//       try {
//         const existingFood = await Food.findOne({ 
//           name: { $regex: new RegExp(`^${recipe.name}$`, 'i') },
//           source: 'dummyjson'
//         });
        
//         if (existingFood) {
//           console.log(`⏩ Skipping existing recipe: ${recipe.name}`);
//           skippedCount++;
//           continue;
//         }
        
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
//           cuisine: recipe.cuisine,
//           isExternal: true,
//           externalId: recipe.id.toString(),
//         };
        
//         const food = new Food(foodData);
//         await food.save();
//         addedCount++;
//         console.log(`✅ Added: ${recipe.name}`);
        
//         await new Promise(resolve => setTimeout(resolve, 100));
        
//       } catch (error) {
//         console.error(`❌ Error saving "${recipe.name}":`, error.message);
//         skippedCount++;
//       }
//     }
    
//     console.log('\n🎉 Recipe auto-initialization completed!');
//     console.log(`📈 Added: ${addedCount} new recipes`);
//     console.log(`⏭️ Skipped: ${skippedCount} (already exist or errors)`);
//     console.log(`📊 Total foods in database: ${await Food.countDocuments({})}`);
    
//   } catch (error) {
//     console.error('❌ Auto-initialization failed:', error.message);
//   }
// };

// // Auto-initialize when MongoDB connects
// mongoose.connection.once('open', async () => {
//   console.log('✅ MongoDB connected successfully');
  
//   autoInitializeRecipes().then(() => {
//     console.log('🏁 Recipe initialization process completed');
//   }).catch(error => {
//     console.error('💥 Failed to initialize recipes:', error);
//   });
// });

// // Socket.io connection
// io.on('connection', (socket) => {
//   socket.on('joinRoom', (userId) => socket.join(userId));
// });

// // Import other routes
// const { router: recipesRouter, initializeExternalRecipes } = require('./routes/recipes');
// const authRoutes = require('./routes/auth');
// const foodRoutes = require('./routes/foods');
// const mealRoutes = require('./routes/meals');
// const waterRoutes = require('./routes/water');
// const reportRoutes = require('./routes/reports');
// const socialRoutes = require('./routes/social');
// const notificationRoutes = require('./routes/notifications');
// const barcodeRoutes = require('./routes/barcode');
// const exportRoutes = require('./routes/export');
// const chatRoutes = require('./routes/chat.routes');



// // Use routes
// app.use('/api/auth', authRoutes);
// app.use('/api/foods', foodRoutes);
// app.use('/api/meals', mealRoutes);
// app.use('/api/water', waterRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api/recipes', recipesRouter);
// app.use('/api/social', socialRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/barcode', barcodeRoutes);
// app.use('/api/export', exportRoutes);
// app.use('/api/chat', chatRoutes);


// app.get('/', (req, res) => res.json({ message: 'NutriTrack API Running' }));

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📡 API available at http://localhost:${PORT}/api`);
//   console.log(`📤 Upload endpoint: POST http://localhost:${PORT}/api/upload`);
//   console.log(`🧪 Mock upload: POST http://localhost:${PORT}/api/upload-mock`);
//   console.log(`🔍 Test endpoint: GET http://localhost:${PORT}/api/test-logmeals`);
// });

// jan18813pm
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const socketIo = require('socket.io');
const axios = require('axios');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "http://localhost:3000" } });

// Create imageanalyze folder
const IMAGE_ANALYZE_DIR = path.join(__dirname, 'imageanalyze');
if (!fs.existsSync(IMAGE_ANALYZE_DIR)) {
  fs.mkdirSync(IMAGE_ANALYZE_DIR, { recursive: true });
  console.log(`📁 Created imageanalyze directory at: ${IMAGE_ANALYZE_DIR}`);
}

// Configure multer for imageanalyze folder
const imageAnalyzeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, IMAGE_ANALYZE_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalExt = path.extname(file.originalname);
    cb(null, 'analysis-' + uniqueSuffix + originalExt);
  }
});

const imageAnalyzeUpload = multer({ 
  storage: imageAnalyzeStorage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Add static serving for imageanalyze folder
app.use('/imageanalyze', express.static('imageanalyze'));

// Multer setup for temporary uploads
const upload = multer({ 
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static('uploads'));

// Database connection
const primaryMongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nutritrack';
mongoose.connect(primaryMongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
}).then(() => {
  console.log('✅ MongoDB connected successfully to primary database');
}).catch(async (err) => {
  console.warn(`⚠️ Primary MongoDB connection failed (${err.message}).`);
  if (primaryMongoUri !== 'mongodb://127.0.0.1:27017/nutritrack') {
    console.log('🔄 Attempting fallback connection to local MongoDB (mongodb://127.0.0.1:27017/nutritrack)...');
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/nutritrack', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ Fallback connection to local MongoDB successful!');
    } catch (fallbackErr) {
      console.error('❌ Fallback to local MongoDB also failed:', fallbackErr.message);
    }
  }
});

const Food = require('./models/Food');
const Chat = require('./models/Chat');

// Add CORS headers for frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// ========== NEW: UPLOAD IMAGE FOR ANALYSIS STORAGE ==========
app.post('/api/upload/analyze', imageAnalyzeUpload.single('image'), async (req, res) => {
  console.log('📸 Uploading image for analysis storage...');
  
  if (!req.file) {
    console.error('❌ No file uploaded');
    return res.status(400).json({ error: 'No file uploaded' });
  }

  console.log('📄 File saved to imageanalyze:', {
    filename: req.file.filename,
    originalname: req.file.originalname,
    path: req.file.path,
    size: req.file.size
  });

  // Construct the relative URL for accessing the image
  const imageUrl = `/imageanalyze/${req.file.filename}`;
  const filePath = `imageanalyze/${req.file.filename}`;

  // Verify file was actually saved
  if (!fs.existsSync(path.join(__dirname, filePath))) {
    console.error('❌ File not found after upload');
    return res.status(500).json({ error: 'File not saved successfully' });
  }

  res.json({
    success: true,
    message: 'Image saved for analysis',
    fileInfo: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: filePath,
      url: imageUrl,
      fullPath: req.file.path
    }
  });
});

// ========== GEMINI VISION IMAGE ANALYSIS ENDPOINT ==========
app.post('/api/upload', upload.single('image'), async (req, res) => {
  console.log('📤 Upload endpoint hit - Starting Gemini Vision AI analysis');

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imagePath = path.join(__dirname, req.file.path);

  try {
    if (!genAI) {
      throw new Error('GEMINI_API_KEY not configured. Please add it to your .env file.');
    }

    // Read image as base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Data = imageBuffer.toString('base64');
    console.log('📊 Image size:', imageBuffer.length, 'bytes');

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a professional nutritionist AI. Carefully analyze this food image and return ONLY a valid JSON object (no markdown, no code fences) with this exact structure:
{
  "detectedFoods": ["food name 1", "food name 2"],
  "foodName": ["food name 1", "food name 2"],
  "totalNutrition": {
    "calories": <number>,
    "protein": <number in grams>,
    "carbs": <number in grams>,
    "fat": <number in grams>,
    "fiber": <number in grams>,
    "sugar": <number in grams>
  },
  "nutritionSummary": {
    "calories": <number>,
    "protein": { "value": <number>, "unit": "g", "label": "Protein" },
    "carbs": { "value": <number>, "unit": "g", "label": "Carbs" },
    "fat": { "value": <number>, "unit": "g", "label": "Fat" },
    "fiber": { "value": <number>, "unit": "g", "label": "Fiber" },
    "sugar": { "value": <number>, "unit": "g", "label": "Sugar" }
  },
  "detectedItems": [
    {
      "position": 1,
      "dish": "food name",
      "servingSize": "estimated portion e.g. 200g",
      "nutrition": {
        "calories": <number>,
        "protein": { "value": <number>, "unit": "g", "label": "Protein" },
        "carbs": { "value": <number>, "unit": "g", "label": "Carbs" },
        "fat": { "value": <number>, "unit": "g", "label": "Fat" },
        "fiber": { "value": <number>, "unit": "g", "label": "Fiber" },
        "sugar": { "value": <number>, "unit": "g", "label": "Sugar" }
      },
      "healthScore": <number 1-10>
    }
  ],
  "healthInsights": "2-3 sentence health summary of this meal",
  "mealCategory": "breakfast|lunch|dinner|snack",
  "overallNutriScore": { "category": "A|B|C|D|E", "standardized": <number> }
}
Be as accurate as possible with nutrition estimates based on typical serving sizes.`;

    console.log('🔍 Calling Gemini Vision API...');
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: req.file.mimetype || 'image/jpeg',
          data: base64Data
        }
      }
    ]);

    const responseText = result.response.text();
    console.log('🤖 Gemini response (first 300 chars):', responseText.substring(0, 300));

    // Extract JSON - handle markdown code fences
    let jsonStr = responseText;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) jsonStr = jsonMatch[0];

    let nutritionData;
    try {
      nutritionData = JSON.parse(jsonStr);
    } catch (parseErr) {
      console.error('❌ JSON parse failed, raw response:', responseText);
      throw new Error('Gemini returned invalid JSON. Please try with a clearer food image.');
    }

    // Clean up temp file
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    console.log('🧹 Temp file cleaned');

    console.log(`✅ Gemini analyzed: ${(nutritionData.detectedFoods || []).join(', ')}`);

    res.json({
      success: true,
      message: 'Image analyzed successfully via Google Gemini Vision AI',
      imageId: `gemini_${Date.now()}`,
      nutrition: nutritionData,
      hasIngredients: true,
      hasSegmentation: true,
      isMock: false,
      source: 'Google Gemini Vision AI',
      fileInfo: {
        originalName: req.file.originalname,
        size: req.file.size
      },
      // Keep rawData.nutrition.foodName for frontend compatibility
      rawData: {
        nutrition: {
          foodName: nutritionData.foodName || nutritionData.detectedFoods || [],
          nutritional_info_per_item: (nutritionData.detectedItems || []).map(item => ({
            dish_name: item.dish,
            food_item_position: item.position,
            serving_size: parseInt(item.servingSize) || 100,
            nutritional_info: {
              calories: item.nutrition?.calories || 0,
              totalNutrients: {
                PROCNT: { label: 'Protein', quantity: item.nutrition?.protein?.value || 0, unit: 'g' },
                CHOCDF: { label: 'Carbs', quantity: item.nutrition?.carbs?.value || 0, unit: 'g' },
                FAT: { label: 'Fat', quantity: item.nutrition?.fat?.value || 0, unit: 'g' },
                FIBTG: { label: 'Fiber', quantity: item.nutrition?.fiber?.value || 0, unit: 'g' },
                SUGAR: { label: 'Sugar', quantity: item.nutrition?.sugar?.value || 0, unit: 'g' }
              }
            }
          }))
        }
      }
    });

  } catch (error) {
    console.error('💥 Image analysis error:', error.message);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log('🧹 Cleaned up temp file after error');
    }

    res.status(500).json({
      success: false,
      error: 'Failed to analyze image',
      message: error.message,
      help: 'Make sure GEMINI_API_KEY is set in backend/.env and the image is a clear food photo.'
    });
  }
});


// ========== FIXED: IMAGE ANALYSIS CHAT SAVING ==========
app.post('/api/chat/image-analysis', async (req, res) => {
  try {
    const { 
      userId, 
      message, 
      imageData, 
      imagePreview, 
      nutritionData,
      foodNames,
      detectedItems,
      nutritionSummary,
      filePath,  // This should come from /api/upload/analyze response
      fileName,
      originalFileName,
      imageUrl
    } = req.body;
    
    console.log('📸 Saving image analysis chat...');
    console.log('📁 Received filePath:', filePath);
    
    if (!userId || !message) {
      return res.status(400).json({
        success: false,
        error: 'userId and message are required'
      });
    }
    
    // Validate file path exists
    let fileExists = false;
    let fileDetails = null;
    
    if (filePath) {
      const fullPath = path.join(__dirname, filePath);
      if (fs.existsSync(fullPath)) {
        fileExists = true;
        const stats = fs.statSync(fullPath);
        fileDetails = {
          exists: true,
          size: stats.size,
          modified: stats.mtime
        };
        console.log('✅ Image file exists:', fullPath);
      } else {
        console.warn(`⚠️ Image file not found at: ${fullPath}`);
        console.log('📁 Current working directory:', __dirname);
        console.log('📁 Attempted full path:', fullPath);
        
        // Try to list files in imageanalyze directory
        try {
          const files = fs.readdirSync(IMAGE_ANALYZE_DIR);
          console.log('📁 Files in imageanalyze folder:', files);
        } catch (err) {
          console.error('❌ Cannot read imageanalyze folder:', err.message);
        }
      }
    }
    
    const chat = new Chat({
      user: new mongoose.Types.ObjectId(userId),
      messages: [
        {
          role: 'assistant',
          content: message,
          source: 'image_analysis',
          isImageAnalysis: true,
          metadata: {
            foodNames: foodNames || [],
            detectedItems: detectedItems || [],
            nutritionSummary: nutritionSummary || {},
            filePath: filePath || null,
            fileName: fileName || null,
            originalFileName: originalFileName || null,
            imageUrl: imageUrl || null,
            fileExists: fileExists,
            fileDetails: fileDetails,
            storedAt: new Date().toISOString()
          },
          imageData: imageData || null,
          imagePreview: imagePreview || null,
          nutritionData: nutritionData || null,
          timestamp: new Date()
        }
      ],
      title: `Food Image Analysis - ${new Date().toLocaleDateString()}`,
      hasImageAnalysis: true,
      createdAt: new Date()
    });
    
    await chat.save();
    
    console.log('✅ Image analysis chat saved:', chat._id);
    console.log('📁 File path stored in DB:', filePath);
    console.log('📁 File exists on disk:', fileExists);
    
    res.json({
      success: true,
      chatId: chat._id,
      message: 'Image analysis chat saved successfully',
      filePath: filePath,
      imageUrl: imageUrl,
      fileExists: fileExists,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error saving image analysis chat:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ========== DEBUG ENDPOINT FOR IMAGEANALYZE FOLDER ==========
app.get('/api/debug/imageanalyze', (req, res) => {
  try {
    const files = fs.readdirSync(IMAGE_ANALYZE_DIR);
    const fileDetails = files.map(filename => {
      const filePath = path.join(IMAGE_ANALYZE_DIR, filename);
      const stats = fs.statSync(filePath);
      return {
        filename,
        relativePath: `imageanalyze/${filename}`,
        fullPath: filePath,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        isFile: stats.isFile()
      };
    });
    
    res.json({
      success: true,
      folderPath: IMAGE_ANALYZE_DIR,
      exists: fs.existsSync(IMAGE_ANALYZE_DIR),
      fileCount: files.length,
      files: fileDetails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      folderPath: IMAGE_ANALYZE_DIR,
      exists: fs.existsSync(IMAGE_ANALYZE_DIR)
    });
  }
});

// ========== TEST ENDPOINTS ==========
app.get('/upload', (req, res) => {
  res.send(`
    <h2>Test Image Upload</h2>
    <form action="/api/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="image" accept="image/*" required />
      <button type="submit">Upload</button>
    </form>
    <br>
    <h2>Test Image Upload for Analysis Storage</h2>
    <form action="/api/upload/analyze" method="POST" enctype="multipart/form-data">
      <input type="file" name="image" accept="image/*" required />
      <button type="submit">Upload to imageanalyze folder</button>
    </form>
  `);
});

// ========== HELPER FUNCTIONS ==========
function parseCompleteLogMealResponse(data) {
  const result = {
    imageId: data.imageId,
    detectedItems: [],
    nutritionSummary: {},
    ingredients: [],
    timestamp: new Date().toISOString()
  };

  // Parse nutrition data
  if (data.nutrition) {
    if (data.nutrition.nutritional_info_per_item && Array.isArray(data.nutrition.nutritional_info_per_item)) {
      result.detectedItems = data.nutrition.nutritional_info_per_item.map(item => {
        const itemData = {
          position: item.food_item_position || null,
          dish: item.dish_name || null,
          servingSize: item.serving_size ? `${item.serving_size}g` : null,
          nutrition: {}
        };

        if (item.nutritional_info) {
          const ni = item.nutritional_info;
          itemData.nutrition = {
            calories: ni.calories || 0,
            protein: extractNutrient(ni.totalNutrients, 'PROCNT'),
            carbs: extractNutrient(ni.totalNutrients, 'CHOCDF'),
            fat: extractNutrient(ni.totalNutrients, 'FAT'),
            fiber: extractNutrient(ni.totalNutrients, 'FIBTG'),
            sugar: extractNutrient(ni.totalNutrients, 'SUGAR')
          };
        }

        if (item.nutri_score) {
          itemData.nutriScore = {
            category: item.nutri_score.nutri_score_category,
            standardized: item.nutri_score.nutri_score_standardized
          };
        }

        return itemData;
      });
    }

    if (data.nutrition.nutritional_info) {
      const ni = data.nutrition.nutritional_info;
      result.nutritionSummary = {
        calories: ni.calories || 0,
        protein: extractNutrient(ni.totalNutrients, 'PROCNT'),
        carbs: extractNutrient(ni.totalNutrients, 'CHOCDF'),
        fat: extractNutrient(ni.totalNutrients, 'FAT'),
        fiber: extractNutrient(ni.totalNutrients, 'FIBTG'),
        sugar: extractNutrient(ni.totalNutrients, 'SUGAR')
      };

      if (ni.dailyIntakeReference) {
        result.dailyIntake = {};
        Object.entries(ni.dailyIntakeReference).forEach(([key, value]) => {
          if (value && typeof value === 'object' && value.percent !== undefined) {
            result.dailyIntake[key] = {
              label: value.label || key,
              percent: Math.round(value.percent * 10) / 10,
              level: value.level
            };
          }
        });
      }
    }

    if (data.nutrition.image_nutri_score) {
      result.overallNutriScore = {
        category: data.nutrition.image_nutri_score.nutri_score_category,
        standardized: data.nutrition.image_nutri_score.nutri_score_standardized
      };
    }
  }

  if (data.ingredients && data.ingredients.ingredients) {
    result.ingredients = data.ingredients.ingredients.map(ing => ({
      name: ing.name || ing.ingredient_name,
      quantity: ing.quantity,
      unit: ing.unit,
      confidence: ing.confidence
    }));
  }

  if (data.segmentation && data.segmentation.candidates) {
    result.dishCandidates = data.segmentation.candidates.map(candidate => ({
      name: candidate.dish_name,
      confidence: candidate.confidence || candidate.probability,
      category: candidate.category
    }));
  }

  return result;
}

function extractNutrient(nutrients, code) {
  if (!nutrients || !nutrients[code]) return { value: 0, unit: 'g' };
  
  const nutrient = nutrients[code];
  return {
    value: nutrient.quantity || 0,
    unit: nutrient.unit || 'g',
    label: nutrient.label || code
  };
}

// ========== EXISTING MOCK ENDPOINT ==========
app.post('/api/upload-mock', upload.single('image'), async (req, res) => {
  console.log('🧪 Mock upload endpoint hit');
  
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imagePath = path.join(__dirname, req.file.path);
  if (fs.existsSync(imagePath)) {
    fs.unlinkSync(imagePath);
  }

  await new Promise(resolve => setTimeout(resolve, 800));

  const mockData = {
    success: true,
    message: 'Mock analysis complete',
    imageId: 'mock_' + Date.now(),
    nutrition: {
      imageId: 'mock_' + Date.now(),
      detectedItems: [
        {
          position: 1,
          dish: 'Grilled Chicken Breast',
          servingSize: '200g',
          nutrition: {
            calories: 330,
            protein: { value: 62, unit: 'g', label: 'Protein' },
            carbs: { value: 0, unit: 'g', label: 'Carbs' },
            fat: { value: 7, unit: 'g', label: 'Fat' },
            fiber: { value: 0, unit: 'g', label: 'Fiber' },
            sugar: { value: 0, unit: 'g', label: 'Sugar' }
          },
          nutriScore: {
            category: 'A',
            standardized: 1.2
          }
        },
        {
          position: 2,
          dish: 'Mixed Green Salad',
          servingSize: '150g',
          nutrition: {
            calories: 30,
            protein: { value: 2, unit: 'g', label: 'Protein' },
            carbs: { value: 5, unit: 'g', label: 'Carbs' },
            fat: { value: 0, unit: 'g', label: 'Fat' },
            fiber: { value: 3, unit: 'g', label: 'Fiber' },
            sugar: { value: 2, unit: 'g', label: 'Sugar' }
          },
          nutriScore: {
            category: 'A',
            standardized: 1.8
          }
        }
      ],
      nutritionSummary: {
        calories: 360,
        protein: { value: 64, unit: 'g', label: 'Protein' },
        carbs: { value: 5, unit: 'g', label: 'Carbs' },
        fat: { value: 7, unit: 'g', label: 'Fat' },
        fiber: { value: 3, unit: 'g', label: 'Fiber' },
        sugar: { value: 2, unit: 'g', label: 'Sugar' }
      },
      overallNutriScore: {
        category: 'A',
        standardized: 1.5
      },
      dailyIntake: {
        ENERC_KCAL: { label: 'Calories', percent: 18, level: 'low' },
        PROCNT: { label: 'Protein', percent: 128, level: 'high' },
        FAT: { label: 'Fat', percent: 10, level: 'low' },
        CHOCDF: { label: 'Carbs', percent: 2, level: 'low' }
      },
      ingredients: [
        { name: 'Chicken Breast', quantity: 200, unit: 'g', confidence: 0.95 },
        { name: 'Lettuce', quantity: 100, unit: 'g', confidence: 0.88 },
        { name: 'Tomato', quantity: 50, unit: 'g', confidence: 0.82 },
        { name: 'Olive Oil', quantity: 15, unit: 'ml', confidence: 0.75 }
      ],
      dishCandidates: [
        { name: 'Grilled Chicken', confidence: 0.95, category: 'Protein' },
        { name: 'Chicken Salad', confidence: 0.85, category: 'Salad' },
        { name: 'Roasted Chicken', confidence: 0.78, category: 'Protein' }
      ],
      timestamp: new Date().toISOString()
    },
    hasIngredients: true,
    hasSegmentation: true,
    isMock: true
  };

  res.json(mockData);
});

// ========== CHAT ENDPOINT ==========
app.post('/api/chat', async (req, res) => {
  try {
    const { message, userid } = req.body;
    
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    console.log('🤖 Chat request:', message.substring(0, 100));
    
    let aiReply = '';
    let aiSource = '';
    
    try {
      aiReply = await getTogetherAIResponse(message);
      aiSource = 'together.ai';
    } catch (error1) {
      console.log('Together.ai failed:', error1.message);
      try {
        aiReply = await getHuggingFaceResponse(message);
        aiSource = 'huggingface';
      } catch (error2) {
        console.log('Hugging Face failed:', error2.message);
        try {
          aiReply = await getGroqResponse(message);
          aiSource = 'groq';
        } catch (error3) {
          console.log('Groq failed:', error3.message);
          aiReply = getEnhancedResponse(message);
          aiSource = 'enhanced_fallback';
        }
      }
    }
    
    let chatId = null;
    try {
      const chat = new Chat({
        user: userid,
        messages: [
          {
            role: 'user',
            content: message,
            timestamp: new Date()
          },
          {
            role: 'assistant',
            content: aiReply,
            timestamp: new Date()
          }
        ],
        title: message.substring(0, 50) + (message.length > 50 ? '...' : '')
      });
      
      await chat.save();
      chatId = chat._id;
    } catch (dbError) {
      console.log('Database save skipped:', dbError.message);
    }
    
    res.json({ 
      success: true,
      reply: aiReply,
      chatId: chatId,
      timestamp: new Date().toISOString(),
      aiSource: aiSource
    });
    
  } catch (error) {
    console.error('Chat error:', error.message);
    res.json({
      success: true,
      reply: "Hello! I'm NutriBot, ready to help with nutrition advice. I can assist with meal planning, healthy recipes, weight management, and dietary questions. What would you like to know?",
      timestamp: new Date().toISOString(),
      aiSource: 'error_fallback'
    });
  }
});

// ========== AI PROVIDER FUNCTIONS ==========
async function getTogetherAIResponse(message) {
  const apiKey = process.env.TOGETHER_API_KEY;
  
  if (!apiKey) {
    throw new Error('TOGETHER_API_KEY not configured');
  }
  
  const response = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'meta-llama/Llama-3.2-3B-Instruct-Turbo',
      messages: [
        {
          role: 'system',
          content: `You are NutriBot, an expert nutritionist. Provide accurate, practical nutrition advice in 2-3 paragraphs. Focus on food nutrition facts, healthy eating habits, meal planning, weight management, and dietary restrictions. Be concise, helpful, and encouraging.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 400,
      temperature: 0.7,
      stream: false
    }),
    timeout: 15000
  });

  if (!response.ok) {
    throw new Error(`Together.ai API: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.choices?.[0]?.message?.content) {
    return data.choices[0].message.content;
  }
  
  throw new Error('No content from Together.ai');
}

async function getHuggingFaceResponse(message) {
  const apiKey = process.env.HF_API_KEY || '';
  
  const response = await fetch(
    "https://api-inference.huggingface.co/models/google/flan-t5-base",
    {
      method: "POST",
      headers: {
        "Authorization": apiKey ? `Bearer ${apiKey}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Answer this nutrition question: ${message}`,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
          do_sample: true,
        }
      }),
      timeout: 10000
    }
  );

  if (response.ok) {
    const data = await response.json();
    
    if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text;
    } else if (data?.generated_text) {
      return data.generated_text;
    }
  }
  
  throw new Error('Hugging Face failed');
}

async function getGroqResponse(message) {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error('GROQ_API_KEY not configured');
  }
  
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `You are NutriBot, a nutrition expert AI. Provide helpful nutrition advice.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
      stream: false
    }),
    timeout: 15000
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Groq error:', error);
    throw new Error(`Groq API: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.choices?.[0]?.message?.content) {
    return data.choices[0].message.content;
  }
  
  throw new Error('No content from Groq');
}

function getEnhancedResponse(message) {
  const lowerMsg = message.toLowerCase();
  
  const responses = {
    greetings: [
      "Hello! I'm NutriBot, your AI nutrition assistant. I specialize in:\n• Meal planning and recipes\n• Nutrition facts and calorie counts\n• Weight management strategies\n• Dietary restrictions and allergies\n• Healthy eating habits\n\nWhat specific nutrition question can I help you with today?",
      "Hi there! 👋 As your nutrition AI, I'm here to provide evidence-based advice on:\n- Macronutrient balancing (protein, carbs, fats)\n- Portion control and meal timing\n- Reading food labels\n- Supplement guidance\n- Exercise nutrition\n\nFeel free to ask me anything about food and health!",
    ],
    
    protein: [
      `**Protein Sources Analysis:**\n\nAnimal-based (complete proteins):\n• Chicken breast: 31g protein/100g, 165 calories\n• Salmon: 25g protein/100g, 208 calories\n• Eggs: 6g protein each, 78 calories\n• Greek yogurt: 10g protein/100g, 59 calories\n\nPlant-based (combine for complete proteins):\n• Lentils: 9g protein/100g cooked, 116 calories\n• Tofu: 8g protein/100g, 76 calories\n• Chickpeas: 7g protein/100g cooked, 139 calories\n• Quinoa: 4g protein/100g cooked, 120 calories\n\n**Recommendation:** Aim for 0.8-1.2g protein per kg of body weight daily. For muscle building, target 1.6-2.2g/kg.`,
    ],
    
    breakfast: [
      `**Healthy Breakfast Options:**\n\n🥣 **High Protein (30g+):**\n• Scrambled eggs (3) with spinach & whole grain toast: 25g protein\n• Greek yogurt bowl with berries, nuts, & chia seeds: 30g protein\n• Protein smoothie: whey protein, banana, spinach, almond milk: 35g protein\n\n🌾 **High Fiber (8g+):**\n• Oatmeal with berries, flax seeds, & almonds: 10g fiber\n• Chia pudding with fruit & nuts: 12g fiber\n• Whole grain toast with avocado & eggs: 8g fiber`,
    ],
    
    default: [
      `I understand you're asking about nutrition. Based on current evidence:\n\n**General Guidelines:**\n1. Eat mostly whole, minimally processed foods\n2. Include a variety of colorful fruits & vegetables\n3. Choose lean proteins & healthy fats\n4. Stay hydrated with water\n5. Practice mindful eating\n\nCould you provide more details about your nutrition objectives?`,
    ]
  };
  
  let category = 'default';
  if (/^(hi|hello|hey|good\s(morning|afternoon|evening))/.test(lowerMsg)) category = 'greetings';
  if (lowerMsg.includes('protein')) category = 'protein';
  if (lowerMsg.includes('breakfast') || lowerMsg.includes('morning meal')) category = 'breakfast';
  if (lowerMsg.includes('weight') || lowerMsg.includes('lose') || lowerMsg.includes('gain')) category = 'weight';
  
  const categoryResponses = responses[category] || responses.default;
  const randomIndex = Math.floor(Math.random() * categoryResponses.length);
  
  return categoryResponses[randomIndex];
}

// ========== OTHER ENDPOINTS ==========
app.get('/api/verify-token', async (req, res) => {
  try {
    if (!process.env.LOGMEALS_TOKEN) {
      return res.json({ success: false, error: 'LOGMEALS_TOKEN is not set' });
    }

    const token = process.env.LOGMEALS_TOKEN;
    
    try {
      const testResponse = await axios.get('https://api.logmeal.com/v2/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
        timeout: 10000
      });

      res.json({
        success: true,
        message: 'Token is valid',
        tokenPreview: token.length > 10 ? `${token.substring(0, 10)}...` : token,
        tokenLength: token.length,
        profile: testResponse.data
      });
    } catch (apiError) {
      res.json({
        success: false,
        message: 'Token validation failed',
        error: apiError.response?.data || apiError.message,
        status: apiError.response?.status,
        tokenPreview: token.length > 10 ? `${token.substring(0, 10)}...` : token
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/test-logmeals', async (req, res) => {
  try {
    if (!process.env.LOGMEALS_TOKEN) {
      return res.status(400).json({ success: false, error: 'LOGMEALS_TOKEN is not set' });
    }

    const tokenPreview = process.env.LOGMEALS_TOKEN.length > 10 
      ? `${process.env.LOGMEALS_TOKEN.substring(0, 10)}...` 
      : process.env.LOGMEALS_TOKEN;

    res.json({
      success: true,
      tokenExists: true,
      tokenPreview,
      endpoints: {
        upload: 'https://api.logmeal.com/v2/image/segmentation/complete',
        nutrition: 'https://api.logmeal.com/v2/nutrition/recipe/nutritionalInfo'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/chat/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    ai: 'Multiple providers (Together.ai, Hugging Face, Groq)',
    timestamp: new Date().toISOString() 
  });
});

// ========== RECIPE INITIALIZATION ==========
const autoInitializeRecipes = async () => {
  try {
    console.log('🚀 Checking if recipes need initialization...');
    
    const existingRecipeCount = await Food.countDocuments({ 
      source: 'dummyjson' 
    });
    
    if (existingRecipeCount > 0) {
      console.log(`✅ ${existingRecipeCount} recipes already exist. Skipping.`);
      return;
    }
    
    console.log('📋 No recipes found. Starting auto-initialization...');
    
    const response = await axios.get('https://dummyjson.com/recipes?limit=50');
    const recipes = response.data.recipes;
    
    console.log(`📥 Fetched ${recipes.length} recipes from API`);
    
    let addedCount = 0;
    let skippedCount = 0;
    
    for (const recipe of recipes) {
      try {
        const existingFood = await Food.findOne({ 
          name: { $regex: new RegExp(`^${recipe.name}$`, 'i') },
          source: 'dummyjson'
        });
        
        if (existingFood) {
          skippedCount++;
          continue;
        }
        
        const estimateProtein = (tags) => {
          const lowerTags = tags.map(t => t.toLowerCase());
          if (lowerTags.includes('chicken') || lowerTags.includes('beef') || lowerTags.includes('protein')) return 25;
          if (lowerTags.includes('vegetarian')) return 8;
          return 15;
        };

        const foodData = {
          name: recipe.name,
          category: 'other',
          servingSize: { amount: 1, unit: 'serving' },
          nutrition: {
            calories: recipe.caloriesPerServing,
            protein: estimateProtein(recipe.tags),
            carbs: 30,
            fat: 10,
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
          isExternal: true,
          externalId: recipe.id.toString(),
        };
        
        const food = new Food(foodData);
        await food.save();
        addedCount++;
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Error saving "${recipe.name}":`, error.message);
        skippedCount++;
      }
    }
    
    console.log('\n🎉 Recipe auto-initialization completed!');
    console.log(`📈 Added: ${addedCount} new recipes`);
    console.log(`⏭️ Skipped: ${skippedCount}`);
    console.log(`📊 Total foods in database: ${await Food.countDocuments({})}`);
    
  } catch (error) {
    console.error('❌ Auto-initialization failed:', error.message);
  }
};
// ========== GET ALL CHATS FOR USER ==========
app.get('/api/chat/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required'
      });
    }
    
    console.log(`📋 Fetching all chats for user: ${userId}`);
    
    // Find all chats for this user, sorted by creation date (newest first)
    const chats = await Chat.find({ 
      user: new mongoose.Types.ObjectId(userId) 
    })
    .sort({ createdAt: -1 }) // Sort by newest first
    .lean(); // Convert to plain JavaScript objects
    
    console.log(`✅ Found ${chats.length} chats for user: ${userId}`);
    
    // Transform the data to make it easier to display
    const transformedChats = chats.map(chat => {
      const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
      const firstMessage = chat.messages.length > 0 ? chat.messages[0] : null;
      
      return {
        _id: chat._id,
        title: chat.title || 'Untitled Chat',
        hasImageAnalysis: chat.hasImageAnalysis || false,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        // Extract useful information for display
        lastMessage: lastMessage ? {
          content: lastMessage.content,
          role: lastMessage.role,
          timestamp: lastMessage.timestamp,
          source: lastMessage.source,
          isImageAnalysis: lastMessage.isImageAnalysis
        } : null,
        firstMessage: firstMessage ? {
          content: firstMessage.content,
          role: firstMessage.role
        } : null,
        messageCount: chat.messages.length,
        // Include metadata for image analysis chats
        metadata: lastMessage?.metadata || null,
        // Include image preview URL if available
        imagePreview: lastMessage?.imagePreview || null,
        imageUrl: lastMessage?.metadata?.imageUrl || null
      };
    });
    
    res.json({
      success: true,
      count: chats.length,
      chats: transformedChats,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error fetching user chats:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ========== GET SPECIFIC CHAT BY ID ==========
app.get('/api/chat/:chatId', async (req, res) => {
  try {
    const { chatId } = req.params;
    
    if (!chatId) {
      return res.status(400).json({
        success: false,
        error: 'chatId is required'
      });
    }
    
    console.log(`📋 Fetching chat: ${chatId}`);
    
    const chat = await Chat.findById(chatId).lean();
    
    if (!chat) {
      return res.status(404).json({
        success: false,
        error: 'Chat not found'
      });
    }
    
    res.json({
      success: true,
      chat: chat,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error fetching chat:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ========== DELETE CHAT BY ID ==========
app.delete('/api/chat/:chatId', async (req, res) => {
  try {
    const { chatId } = req.params;
    
    if (!chatId) {
      return res.status(400).json({
        success: false,
        error: 'chatId is required'
      });
    }
    
    console.log(`🗑️ Deleting chat: ${chatId}`);
    
    // Find the chat to check if it exists and get image file path
    const chat = await Chat.findById(chatId);
    
    if (!chat) {
      return res.status(404).json({
        success: false,
        error: 'Chat not found'
      });
    }
    
    // Check if this is an image analysis chat with associated image file
    if (chat.hasImageAnalysis && chat.messages && chat.messages.length > 0) {
      // Find the image analysis message
      const imageMessage = chat.messages.find(msg => 
        msg.isImageAnalysis && msg.metadata && msg.metadata.filePath
      );
      
      // If there's an associated image file, delete it
      if (imageMessage && imageMessage.metadata.filePath) {
        const filePath = path.join(__dirname, imageMessage.metadata.filePath);
        
        try {
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`✅ Deleted image file: ${imageMessage.metadata.filePath}`);
          } else {
            console.log(`⚠️ Image file not found: ${filePath}`);
          }
        } catch (fileError) {
          console.error('⚠️ Error deleting image file:', fileError.message);
          // Continue with chat deletion even if file deletion fails
        }
      }
    }
    
    // Delete the chat from database
    const result = await Chat.findByIdAndDelete(chatId);
    
    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Chat not found or already deleted'
      });
    }
    
    console.log(`✅ Chat deleted successfully: ${chatId}`);
    
    res.json({
      success: true,
      message: 'Chat deleted successfully',
      deletedChatId: chatId,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error deleting chat:', error.message);
    
    // Handle specific errors
    let statusCode = 500;
    let errorMessage = error.message;
    
    if (error.name === 'CastError') {
      statusCode = 400;
      errorMessage = 'Invalid chat ID format';
    }
    
    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
});

// ========== DELETE ALL CHATS FOR USER (Optional) ==========
app.delete('/api/chat/user/:userId/all', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'userId is required'
      });
    }
    
    console.log(`🗑️ Deleting all chats for user: ${userId}`);
    
    // Find all chats for this user
    const chats = await Chat.find({ 
      user: new mongoose.Types.ObjectId(userId) 
    });
    
    if (chats.length === 0) {
      return res.json({
        success: true,
        message: 'No chats found for this user',
        deletedCount: 0,
        timestamp: new Date().toISOString()
      });
    }
    
    let deletedFilesCount = 0;
    
    // Delete associated image files
    for (const chat of chats) {
      if (chat.hasImageAnalysis && chat.messages && chat.messages.length > 0) {
        const imageMessage = chat.messages.find(msg => 
          msg.isImageAnalysis && msg.metadata && msg.metadata.filePath
        );
        
        if (imageMessage && imageMessage.metadata.filePath) {
          const filePath = path.join(__dirname, imageMessage.metadata.filePath);
          
          try {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
              deletedFilesCount++;
              console.log(`✅ Deleted image file: ${imageMessage.metadata.filePath}`);
            }
          } catch (fileError) {
            console.error('⚠️ Error deleting image file:', fileError.message);
          }
        }
      }
    }
    
    // Delete all chats from database
    const result = await Chat.deleteMany({ 
      user: new mongoose.Types.ObjectId(userId) 
    });
    
    console.log(`✅ Deleted ${result.deletedCount} chats for user: ${userId}`);
    console.log(`🗑️ Also deleted ${deletedFilesCount} associated image files`);
    
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} chats successfully`,
      deletedCount: result.deletedCount,
      deletedFilesCount: deletedFilesCount,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error deleting user chats:', error.message);
    
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ========== BULK DELETE CHATS BY IDS (Optional) ==========
app.delete('/api/chat/bulk', async (req, res) => {
  try {
    const { chatIds } = req.body;
    
    if (!chatIds || !Array.isArray(chatIds) || chatIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'chatIds array is required'
      });
    }
    
    console.log(`🗑️ Bulk deleting ${chatIds.length} chats`);
    
    // Validate all IDs first
    const validIds = [];
    const invalidIds = [];
    
    for (const id of chatIds) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        validIds.push(new mongoose.Types.ObjectId(id));
      } else {
        invalidIds.push(id);
      }
    }
    
    if (validIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid chat IDs provided',
        invalidIds: invalidIds
      });
    }
    
    // Find chats to get file paths for image analysis chats
    const chats = await Chat.find({ _id: { $in: validIds } });
    
    let deletedFilesCount = 0;
    
    // Delete associated image files
    for (const chat of chats) {
      if (chat.hasImageAnalysis && chat.messages && chat.messages.length > 0) {
        const imageMessage = chat.messages.find(msg => 
          msg.isImageAnalysis && msg.metadata && msg.metadata.filePath
        );
        
        if (imageMessage && imageMessage.metadata.filePath) {
          const filePath = path.join(__dirname, imageMessage.metadata.filePath);
          
          try {
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
              deletedFilesCount++;
            }
          } catch (fileError) {
            console.error('⚠️ Error deleting image file:', fileError.message);
          }
        }
      }
    }
    
    // Delete chats from database
    const result = await Chat.deleteMany({ _id: { $in: validIds } });
    
    console.log(`✅ Bulk deleted ${result.deletedCount} chats`);
    
    const response = {
      success: true,
      message: `Deleted ${result.deletedCount} chats successfully`,
      deletedCount: result.deletedCount,
      deletedFilesCount: deletedFilesCount,
      timestamp: new Date().toISOString()
    };
    
    if (invalidIds.length > 0) {
      response.invalidIds = invalidIds;
      response.warning = `${invalidIds.length} invalid IDs were ignored`;
    }
    
    res.json(response);
    
  } catch (error) {
    console.error('❌ Error in bulk delete:', error.message);
    
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});
// ========== DATABASE CONNECTION ==========
mongoose.connection.once('open', async () => {
  console.log('✅ MongoDB connected successfully');
  
  autoInitializeRecipes().then(() => {
    console.log('🏁 Recipe initialization process completed');
  }).catch(error => {
    console.error('💥 Failed to initialize recipes:', error);
  });
});

// ========== SOCKET.IO ==========
io.on('connection', (socket) => {
  socket.on('joinRoom', (userId) => socket.join(userId));
});

// ========== IMPORT ROUTES ==========
const { router: recipesRouter, initializeExternalRecipes } = require('./routes/recipes');
const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/foods');
const mealRoutes = require('./routes/meals');
const waterRoutes = require('./routes/water');
const reportRoutes = require('./routes/reports');
const socialRoutes = require('./routes/social');
const notificationRoutes = require('./routes/notifications');
const barcodeRoutes = require('./routes/barcode');
const exportRoutes = require('./routes/export');
const chatRoutes = require('./routes/chat.routes');
const textAnalysisRoutes = require('./routes/textAnalysis');
const imageRoutes = require('./routes/imageRoutes');
// ========== USE ROUTES ==========
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/water', waterRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/recipes', recipesRouter);
app.use('/api/social', socialRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/barcode', barcodeRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/text-analysis', textAnalysisRoutes);
app.use('/api/image', imageRoutes);

// ========== ROOT ENDPOINT ==========
app.get('/', (req, res) => res.json({ 
  message: 'NutriTrack API Running',
  endpoints: {
    uploadImage: 'POST /api/upload/analyze',
    analyzeImage: 'POST /api/upload',
    saveAnalysisChat: 'POST /api/chat/image-analysis',
    chat: 'POST /api/chat',
    debug: 'GET /api/debug/imageanalyze'
  }
}));

// ========== START SERVER ==========
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`📸 Image storage: POST http://localhost:${PORT}/api/upload/analyze`);
  console.log(`🔍 Image analysis: POST http://localhost:${PORT}/api/upload`);
  console.log(`💬 Save analysis: POST http://localhost:${PORT}/api/chat/image-analysis`);
  console.log(`🔧 Debug: GET http://localhost:${PORT}/api/debug/imageanalyze`);
  console.log(`📁 Static image access: http://localhost:${PORT}/imageanalyze/[filename]`);
});