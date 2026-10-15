// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role:{type:String,required:true},
//     permission: {
//     type: String,
//     enum: ['approved', 'pending', 'rejected'],
//     default: function () {
//       return this.role === 'admin' ? 'pending' : undefined;
//     }
//   },
//   profile: {
//     name: String, age: Number, gender: String,
//     height: Number, weight: Number,
//     activityLevel: String, goal: String,
//     profilePicture: String, bio: String
//   },
//   dailyTargets: {
//     calories: { type: Number, default: 2000 },
//     protein: { type: Number, default: 50 },
//     carbs: { type: Number, default: 250 },
//     fat: { type: Number, default: 70 },
//     water: { type: Number, default: 2000 }
//   },
//   notificationSettings: {
//     mealReminders: { type: Boolean, default: true },
//     waterReminders: { type: Boolean, default: true },
//     weeklyReports: { type: Boolean, default: true },
//     emailNotifications: { type: Boolean, default: true },
//     pushNotifications: { type: Boolean, default: true }
//   },
//   social: {
//     friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
//     friendRequests: [{
//       from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//       status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
//       timestamp: { type: Date, default: Date.now }
//     }],
//     isPublic: { type: Boolean, default: false }
//   },
//   deviceToken: String,
//   createdAt: { type: Date, default: Date.now }
// });

// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// UserSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// module.exports = mongoose.model('User', UserSchema);
// new
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'superAdmin'],
    default: 'user',
    required: true
  },
  permission: {
    type: String,
    enum: ['approved', 'pending', 'rejected'],
    default: function() {
      return this.role === 'admin' ? 'pending' : undefined;
    }
  },
  profile: {
    // Basic Info
    firstName: String,
    lastName: String,
    fullName: String,
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer-not-to-say']
    },
    
    // Physical Stats
    height: {
      value: { type: Number },
      unit: { 
        type: String, 
        enum: ['cm', 'm', 'ft', 'in'], 
        default: 'cm' 
      },
      lastUpdated: Date
    },
    weight: {
      value: { type: Number },
      unit: { 
        type: String, 
        enum: ['kg', 'lb'], 
        default: 'kg' 
      },
      lastUpdated: Date
    },
    
    // Additional Profile Info
    activityLevel: {
      type: String,
      enum: ['sedentary', 'light', 'moderate', 'active', 'very-active']
    },
    goal: {
      type: String,
      enum: ['weight-loss', 'muscle-gain', 'maintenance', 'improve-health']
    },
    profilePicture: String,
    bio: {
      type: String,
      maxlength: 500
    },
    phoneNumber: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    }
  },
  
  // Daily Targets
  dailyTargets: {
    calories: { type: Number, default: 2000, min: 0 },
    protein: { type: Number, default: 50, min: 0 },
    carbs: { type: Number, default: 250, min: 0 },
    fat: { type: Number, default: 70, min: 0 },
    water: { type: Number, default: 2000, min: 0 },
    lastUpdated: Date
  },
  
  // Notification Settings
  notificationSettings: {
    mealReminders: { type: Boolean, default: true },
    waterReminders: { type: Boolean, default: true },
    weeklyReports: { type: Boolean, default: true },
    emailNotifications: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: true },
    goalAchievements: { type: Boolean, default: true },
    friendRequests: { type: Boolean, default: true },
    systemUpdates: { type: Boolean, default: true }
  },
  
  // Preferences
  preferences: {
    theme: { type: String, enum: ['light', 'dark', 'auto'], default: 'auto' },
    language: { type: String, default: 'en' },
    measurementSystem: { 
      type: String, 
      enum: ['metric', 'imperial'], 
      default: 'metric' 
    },
    timezone: { type: String, default: 'UTC' },
    privacyLevel: {
      type: String,
      enum: ['public', 'friends-only', 'private'],
      default: 'friends-only'
    }
  },
  
  // Admin Details (for admin/superadmin users)
  adminDetails: {
    department: String,
    permissions: [String],
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedAt: Date,
    isActive: { type: Boolean, default: false },
    lastActive: Date,
    notes: String
  },
  
  // Social Features
  social: {
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{
      from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { 
        type: String, 
        enum: ['pending', 'accepted', 'declined'], 
        default: 'pending' 
      },
      timestamp: { type: Date, default: Date.now },
      message: String
    }],
    isPublic: { type: Boolean, default: false },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  
  // Activity Tracking
  activity: {
    lastLogin: Date,
    loginCount: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastActive: Date,
    totalMealsLogged: { type: Number, default: 0 },
    totalWorkoutsLogged: { type: Number, default: 0 }
  },
  
  // Security & Account Status
  security: {
    failedLoginAttempts: { type: Number, default: 0 },
    accountLockedUntil: Date,
    lastPasswordChange: Date,
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: String,
    emailVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationTokenExpires: Date
  },
  
  // Account Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'deleted'],
    default: 'active'
  },
  
  // Device Tokens for Push Notifications
  deviceTokens: [{
    token: String,
    platform: { type: String, enum: ['ios', 'android', 'web'] },
    lastUsed: Date
  }],
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: Date,
  
  // Subscription Info (if applicable)
  subscription: {
    plan: { type: String, enum: ['free', 'premium', 'pro'], default: 'free' },
    startDate: Date,
    endDate: Date,
    autoRenew: { type: Boolean, default: false },
    paymentMethod: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add virtual for age calculation
UserSchema.virtual('age').get(function() {
  if (!this.profile.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.profile.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Add virtual for BMI calculation
UserSchema.virtual('bmi').get(function() {
  if (!this.profile.weight?.value || !this.profile.height?.value) return null;
  
  // Convert height to meters and weight to kg for BMI calculation
  let heightInMeters;
  let weightInKg;
  
  // Convert height to meters
  switch (this.profile.height.unit) {
    case 'cm':
      heightInMeters = this.profile.height.value / 100;
      break;
    case 'm':
      heightInMeters = this.profile.height.value;
      break;
    case 'ft':
      heightInMeters = this.profile.height.value * 0.3048;
      break;
    case 'in':
      heightInMeters = this.profile.height.value * 0.0254;
      break;
    default:
      heightInMeters = this.profile.height.value / 100; // Default to cm
  }
  
  // Convert weight to kg
  switch (this.profile.weight.unit) {
    case 'kg':
      weightInKg = this.profile.weight.value;
      break;
    case 'lb':
      weightInKg = this.profile.weight.value * 0.453592;
      break;
    default:
      weightInKg = this.profile.weight.value; // Default to kg
  }
  
  if (heightInMeters === 0) return null;
  return weightInKg / (heightInMeters * heightInMeters);
});

// Add virtual for BMI category
UserSchema.virtual('bmiCategory').get(function() {
  const bmi = this.bmi;
  if (!bmi) return null;
  
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
});

// Password hashing middleware
UserSchema.pre('save', async function(next) {
  // Update updatedAt timestamp
  this.updatedAt = new Date();
  
  // Hash password if modified
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  
  // Generate fullName if firstName/lastName provided
  if (this.isModified('profile.firstName') || this.isModified('profile.lastName')) {
    if (this.profile.firstName || this.profile.lastName) {
      this.profile.fullName = `${this.profile.firstName || ''} ${this.profile.lastName || ''}`.trim();
    }
  }
  
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to check if user has permission
UserSchema.methods.hasPermission = function(permission) {
  if (this.role === 'superAdmin') return true;
  if (this.role === 'admin' && this.adminDetails?.isActive) {
    return this.adminDetails.permissions?.includes(permission) || 
           this.adminDetails.permissions?.includes('full_access');
  }
  return false;
};

// Method to check if user can manage another user
UserSchema.methods.canManageUser = function(targetUser) {
  // Superadmin can manage everyone
  if (this.role === 'superAdmin') return true;
  
  // Admin can manage users and other admins (but not superadmins)
  if (this.role === 'admin' && this.hasPermission('manage_users')) {
    return targetUser.role !== 'superAdmin';
  }
  
  // Users can only manage themselves
  return this._id.equals(targetUser._id);
};

// Method to get safe user object (without sensitive data)
UserSchema.methods.getSafeObject = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.security;
  delete userObject.__v;
  delete userObject.adminDetails?.twoFactorSecret;
  delete userObject.adminDetails?.notes;
  return userObject;
};

// Static method to find active users
UserSchema.statics.findActiveUsers = function() {
  return this.find({ status: 'active' });
};

// Static method to get user statistics
UserSchema.statics.getStats = async function() {
  return this.aggregate([
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },
        activeUsers: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } },
        adminUsers: { $sum: { $cond: [{ $eq: ['$role', 'admin'] }, 1, 0] } },
        superadminUsers: { $sum: { $cond: [{ $eq: ['$role', 'superAdmin'] }, 1, 0] } },
        verifiedUsers: { $sum: { $cond: [{ $eq: ['$security.emailVerified', true] }, 1, 0] } }
      }
    }
  ]);
};

module.exports = mongoose.model('User', UserSchema);