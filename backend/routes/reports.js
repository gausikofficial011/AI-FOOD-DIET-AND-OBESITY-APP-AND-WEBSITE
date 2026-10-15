const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Report = require('../models/Report');
const Meal = require('../models/Meal');
const WaterIntake = require('../models/WaterIntake');
const moment = require('moment');

router.post('/weekly', protect, async (req, res) => {
  try {
    const { startDate } = req.body;
    const start = moment(startDate).startOf('week');
    const end = moment(startDate).endOf('week');
    
    const meals = await Meal.find({ user: req.user._id, date: { $gte: start.toDate(), $lte: end.toDate() } })
      .populate('entries.food');
    
    const waterIntakes = await WaterIntake.find({ user: req.user._id, date: { $gte: start.toDate(), $lte: end.toDate() } });
    
    let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0, totalWater = 0;
    
    meals.forEach(meal => {
      totalCalories += meal.totalNutrition.calories;
      totalProtein += meal.totalNutrition.protein;
      totalCarbs += meal.totalNutrition.carbs;
      totalFat += meal.totalNutrition.fat;
    });
    
    waterIntakes.forEach(intake => {
      totalWater += intake.unit === 'ml' ? intake.amount : intake.amount * 29.5735;
    });
    
    const report = new Report({
      user: req.user._id, period: 'weekly',
      startDate: start.toDate(), endDate: end.toDate(),
      summary: {
        totalCalories, averageCalories: totalCalories / 7,
        totalProtein, totalCarbs, totalFat,
        waterIntake: totalWater, mealsLogged: meals.length,
        daysTracked: new Set(meals.map(m => moment(m.date).format('YYYY-MM-DD'))).size
      }
    });
    
    await report.save();
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', protect, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user._id }).sort({ startDate: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;