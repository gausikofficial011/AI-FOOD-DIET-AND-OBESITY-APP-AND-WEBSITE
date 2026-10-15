// const mongoose = require('mongoose');

// const FoodSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   category: { type: String, enum: ['fruit', 'vegetable', 'grains', 'protein', 'dairy', 'fats', 'beverage', 'other'] },
//   servingSize: { amount: { type: Number, required: true }, unit: { type: String, default: 'grams' } },
//   nutrition: {
//     calories: { type: Number, required: true },
//     protein: { type: Number, default: 0 },
//     carbs: { type: Number, default: 0 },
//     fat: { type: Number, default: 0 },
//     fiber: { type: Number, default: 0 },
//     sugar: { type: Number, default: 0 },
//     sodium: { type: Number, default: 0 }
//   },
//   barcode: String,
//   isCustom: { type: Boolean, default: false },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Food', FoodSchema);
// // backend/models/Food.js
// const mongoose = require('mongoose');

// const FoodSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   category: { 
//     type: String, 
//     enum: ['fruit', 'vegetable', 'grains', 'protein', 'dairy', 'fats', 'beverage', 'other'],
//     default: 'other'
//   },
//   servingSize: {
//     amount: { type: Number, required: true, default: 100 },
//     unit: { type: String, required: true, default: 'grams' }
//   },
//   nutrition: {
//     calories: { type: Number, required: true, default: 0 },
//     protein: { type: Number, required: true, default: 0 },
//     carbs: { type: Number, required: true, default: 0 },
//     fat: { type: Number, required: true, default: 0 },
//     fiber: { type: Number, default: 0 },
//     sugar: { type: Number, default: 0 }
//   },
//   isCustom: { type: Boolean, default: false },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
//   // Recipe-specific fields
//   isRecipe: { type: Boolean, default: false },
//   source: { type: String, enum: ['dummyjson', 'custom', 'calorieninjas'] },
//   sourceId: String,
//   image: String,
//   difficulty: String,
//   prepTimeMinutes: Number,
//   cookTimeMinutes: Number,
//   servings: Number,
//   mealType: [String],
//   tags: [String],
//   cuisine: String,
//   instructions: [String],
//   ingredients: [String],
  
//   // Metadata
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// FoodSchema.index({ name: 'text', tags: 'text', cuisine: 'text' });
// FoodSchema.index({ name: 1 });
// FoodSchema.index({ category: 1 });
// FoodSchema.index({ isCustom: 1 });
// FoodSchema.index({ source: 1 });
// FoodSchema.index({ tags: 1 });

// module.exports = mongoose.model('Food', FoodSchema);
// new3
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a food name'],
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['fruit', 'vegetable', 'grains', 'protein', 'dairy', 'fats', 'beverage', 'other']
  },
  servingSize: {
    amount: {
      type: Number,
      required: true,
      default: 100
    },
    unit: {
      type: String,
      required: true,
      enum: ['grams', 'ml', 'pieces', 'cups', 'serving'],
      default: 'grams'
    }
  },
  nutrition: {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    fiber: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 }
  },
  isCustom: {
    type: Boolean,
    default: false
  },
  isRecipe: {
    type: Boolean,
    default: false
  },
  source: {
    type: String,
    enum: ['custom', 'dummyjson'],
    default: 'custom'
  },
  sourceId: String,
  image: String,
  difficulty: String,
  prepTimeMinutes: Number,
  cookTimeMinutes: Number,
  servings: Number,
  mealType: [String],
  tags: [String],
  cuisine: String,
  instructions: [String],
  ingredients: [{
    name: String,
    quantity: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function () {
    return !this.isExternal; 
  }
  },
  isExternal: {
  type: Boolean,
  default: false
},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better performance
foodSchema.index({ name: 'text' });
foodSchema.index({ category: 1 });
foodSchema.index({ 'mealType': 1 });
foodSchema.index({ tags: 1 });
foodSchema.index({ createdBy: 1, isCustom: 1 });

module.exports = mongoose.model('Food', foodSchema);