const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Notification = require('../models/Notification');

// @route   GET /api/notifications
// @desc    Get user notifications
router.get('/', protect, async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id
    })
    .sort({ createdAt: -1 })
    .limit(50);

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/notifications/:id/read
// @desc    Mark notification as read
router.put('/:id/read', protect, async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/notifications/reminders
// @desc    Set reminder
router.post('/reminders', protect, async (req, res) => {
  try {
    const { type, time, enabled } = req.body;

    const notification = new Notification({
      user: req.user._id,
      type: `${type}_reminder`,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Reminder`,
      message: `Time for your ${type}!`,
      scheduledFor: new Date(),
      isRead: false
    });

    await notification.save();

    res.json({ message: 'Reminder set successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
