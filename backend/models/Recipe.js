// const mongoose = require('mongoose');

// const RecipeSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   ingredients: [{
//   food: String, // Accept string for now
//   foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' }, // Optional
//   amount: Number,
//   unit: String
// }],
//   instructions: [String],
//   preparationTime: Number,
//   cookingTime: Number,
//   servings: Number,
//   nutrition: { calories: Number, protein: Number, carbs: Number, fat: Number },
//   difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
//   category: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack', 'dessert'] },
//   tags: [String],
//   image: String,
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//   isPublic: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Recipe', RecipeSchema);

// new
// models/Recipe.js
const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  externalId: {
    type: String,
    unique: true,
    sparse: true // Only required for external recipes
  },
  isExternal: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  category: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'other'],
    default: 'other'
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  preparationTime: {
    type: Number,
    default: 0,
    min: 0
  },
  cookingTime: {
    type: Number,
    default: 0,
    min: 0
  },
  servings: {
    type: Number,
    default: 1,
    min: 1
  },
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      default: 'grams'
    }
  }],
  instructions: [String],
  nutrition: {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 }
  },
  image: String,
  tags: [String],
  mealType: [String],
  cuisine: String,
  rating: Number,
  reviewCount: Number,
  isPublic: {
    type: Boolean,
    default: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  saves: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
     
  }
}, {
  timestamps: true
});

// Indexes for better query performance
RecipeSchema.index({ category: 1, difficulty: 1 });
RecipeSchema.index({ tags: 1 });
RecipeSchema.index({ createdBy: 1 });
RecipeSchema.index({ isPublic: 1 });
RecipeSchema.index({ saves: 1 });
RecipeSchema.index({ likes: 1 });
RecipeSchema.index({ externalId: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Recipe', RecipeSchema);