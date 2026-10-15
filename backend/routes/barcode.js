const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Food = require('../models/Food');
const axios = require('axios');

router.post('/scan', protect, async (req, res) => {
  try {
    const { barcode } = req.body;
    
    let food = await Food.findOne({ barcode });
    if (!food) {
      food = await fetchFromBarcodeAPI(barcode);
      if (food) {
        food.barcode = barcode;
        food.isCustom = false;
        await food.save();
      }
    }
    
    if (!food) return res.status(404).json({ message: 'Food not found' });
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function fetchFromBarcodeAPI(barcode) {
  try {
    const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    if (response.data.status === 1) {
      const product = response.data.product;
      return new Food({
        name: product.product_name || 'Unknown',
        category: 'other',
        servingSize: { amount: 100, unit: 'grams' },
        nutrition: {
          calories: product.nutriments.energy_100g ? Math.round(product.nutriments.energy_100g / 4.184) : 0,
          protein: product.nutriments.proteins_100g || 0,
          carbs: product.nutriments.carbohydrates_100g || 0,
          fat: product.nutriments.fat_100g || 0
        }
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return null;
}

module.exports = router;
