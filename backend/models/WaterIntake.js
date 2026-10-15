const mongoose = require('mongoose');

const WaterIntakeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    enum: ['ml', 'oz', 'cups'],
    default: 'ml'
  }
});

WaterIntakeSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model('WaterIntake', WaterIntakeSchema);