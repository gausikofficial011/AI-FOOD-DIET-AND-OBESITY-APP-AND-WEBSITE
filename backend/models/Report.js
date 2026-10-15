const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  period: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  summary: {
    totalCalories: Number,
    averageCalories: Number,
    totalProtein: Number,
    totalCarbs: Number,
    totalFat: Number,
    waterIntake: Number,
    mealsLogged: Number,
    daysTracked: Number
  },
  insights: [{
    title: String,
    description: String,
    type: { type: String, enum: ['positive', 'negative', 'neutral'] }
  }],
  chartData: mongoose.Schema.Types.Mixed,
  generatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', ReportSchema);