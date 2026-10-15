// // models/Chat.js - UPDATED
// const mongoose = require('mongoose');

// const MessageSchema = new mongoose.Schema({
//   role: {
//     type: String,
//     enum: ['user', 'assistant'],
//     required: true
//   },
//   content: {
//     type: String,
//     required: true
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now
//   }
// });

// const ChatSchema = new mongoose.Schema({
//   user: {  // CHANGED from userId to user
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     index: true
//   },
//   messages: [MessageSchema],
//   title: {
//     type: String,
//     default: 'Nutrition Chat'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Chat', ChatSchema);
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant', 'system', 'image_analysis', 'text_analysis'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  imageData: {
    type: String // For storing base64 encoded image
  },
  imagePreview: {
    type: String // For storing image preview URL
  },
  isImageAnalysis: {
    type: Boolean,
    default: false
  },
  nutritionData: {
    type: mongoose.Schema.Types.Mixed
  },
  source: {
    type: String,
    enum: ['ai', 'image_analysis', 'text_analysis', 'system'],
    default: 'ai'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ChatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  messages: [MessageSchema],
  title: {
    type: String,
    default: 'Nutrition Chat'
  },
  hasImageAnalysis: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Chat', ChatSchema);