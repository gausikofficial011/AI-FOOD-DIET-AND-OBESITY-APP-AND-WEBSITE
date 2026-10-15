const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const WaterIntake = require('../models/WaterIntake');

// @route   GET /api/water
// @desc    Get water intake for a date
router.get('/', protect, async (req, res) => {
  try {
    const { date } = req.query;
    const startDate = new Date(date || new Date());
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);

    const waterIntakes = await WaterIntake.find({
      user: req.user._id,
      date: { $gte: startDate, $lte: endDate }
    });

    const total = waterIntakes.reduce((sum, intake) => {
      if (intake.unit === 'ml') return sum + intake.amount;
      if (intake.unit === 'oz') return sum + (intake.amount * 29.5735);
      if (intake.unit === 'cups') return sum + (intake.amount * 240);
      return sum;
    }, 0);

    res.json({ intakes: waterIntakes, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/water
// @desc    Add water intake
router.post('/', protect, async (req, res) => {
  try {
    const waterIntake = new WaterIntake({
      user: req.user._id,
      ...req.body
    });

    await waterIntake.save();
    res.status(201).json(waterIntake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/water/:id
// @desc    Delete water intake
router.delete('/:id', protect, async (req, res) => {
  try {
    const waterIntake = await WaterIntake.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!waterIntake) {
      return res.status(404).json({ message: 'Water intake not found' });
    }

    res.json({ message: 'Water intake deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;