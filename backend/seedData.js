const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Food = require('./models/Food');
const User = require('./models/User');
require('dotenv').config();

const sampleFoods = [
  { name: "Apple", category: "fruit", servingSize: { amount: 100, unit: "grams" }, nutrition: { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 } },
  { name: "Banana", category: "fruit", servingSize: { amount: 100, unit: "grams" }, nutrition: { calories: 89, protein: 1.1, carbs: 23, fat: 0.3 } },
  { name: "Chicken Breast", category: "protein", servingSize: { amount: 100, unit: "grams" }, nutrition: { calories: 165, protein: 31, carbs: 0, fat: 3.6 } },
  { name: "Brown Rice", category: "grains", servingSize: { amount: 100, unit: "grams" }, nutrition: { calories: 111, protein: 2.6, carbs: 23, fat: 0.9 } },
  { name: "Broccoli", category: "vegetable", servingSize: { amount: 100, unit: "grams" }, nutrition: { calories: 34, protein: 2.8, carbs: 7, fat: 0.4 } },
  { name: "Egg", category: "protein", servingSize: { amount: 50, unit: "grams" }, nutrition: { calories: 78, protein: 6, carbs: 0.6, fat: 5 } },
  { name: "Whole Milk", category: "dairy", servingSize: { amount: 250, unit: "ml" }, nutrition: { calories: 149, protein: 8, carbs: 12, fat: 8 } },
  { name: "Almonds", category: "fats", servingSize: { amount: 30, unit: "grams" }, nutrition: { calories: 164, protein: 6, carbs: 6, fat: 14 } }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nutritrack';
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 4000 });
    } catch (connErr) {
      console.log('⚠️ Primary URI unreachable, connecting to local MongoDB...');
      await mongoose.connect('mongodb://127.0.0.1:27017/nutritrack');
    }
    await Food.deleteMany({});
    await User.deleteMany({});
    
    const demoUser = await User.create({
      username: 'demo',
      email: 'demo@nutritrack.com',
      password: 'demo123',
      profile: {
        fullName: 'Demo User',
        firstName: 'Demo',
        lastName: 'User',
        gender: 'male',
        height: { value: 175, unit: 'cm' },
        weight: { value: 70, unit: 'kg' }
      }
    });
    
    const foodsWithUser = sampleFoods.map(food => ({
      ...food,
      createdBy: demoUser._id,
      isExternal: true
    }));
    await Food.insertMany(foodsWithUser);
    
    console.log('Database seeded successfully with demo user and sample foods!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedDatabase();