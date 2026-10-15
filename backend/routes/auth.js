// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const { protect } = require('../middleware/auth');

// const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

// router.post('/register', async (req, res) => {
//   try {
//     const { username, email, password,role, profile } = req.body;
//     const userExists = await User.findOne({ $or: [{ email }, { username }] });
//     if (userExists) return res.status(400).json({ message: 'User exists' });

//     const user = await User.create({ username,role, email, password, profile });

//     res.status(201).json({
//       _id: user._id, username, email, role,profile: user.profile,
//       dailyTargets: user.dailyTargets, token: generateToken(user._id)
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid' });

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid' });

//     res.json({
//       _id: user._id, username: user.username, email: user.email,role:user.role,
//       profile: user.profile, dailyTargets: user.dailyTargets,
//       token: generateToken(user._id)
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get('/profile', protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('-password');
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// router.put('/profile', protect, async (req, res) => {
//   try {
//     const { profile, dailyTargets, notificationSettings, password, newPassword } = req.body;
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update profile fields
//     if (profile) {
//       user.profile = { ...user.profile, ...profile };
//     }

//     // Update daily targets
//     if (dailyTargets) {
//       user.dailyTargets = { ...user.dailyTargets, ...dailyTargets };
//     }

//     // Update notification settings
//     if (notificationSettings) {
//       user.notificationSettings = { ...user.notificationSettings, ...notificationSettings };
//     }

//     // Update password if provided
//     if (password && newPassword) {
//       const isMatch = await user.comparePassword(password);
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Current password is incorrect' });
//       }
//       user.password = newPassword;
//     }

//     await user.save();

//     // Return updated user without password
//     const updatedUser = await User.findById(req.user._id).select('-password');

//     res.json({
//       message: 'Profile updated successfully',
//       user: updatedUser
//     });
//   } catch (error) {
//     console.error('Profile update error:', error);
//     res.status(500).json({ message: error.message });
//   }
// });


// // allusers
// // router.get('/allusers', protect, async (req, res) => {
// // try {
// //     const user = await User.find().select('-password');
// //     res.json(user);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });
// // allusers
// router.get('/allusers', protect, async (req, res) => {
//   try {
//     const users = await User.find().select('-password');
    
//     // Map users to include permission field for admin users
//     const usersWithPermissions = users.map(user => {
//       const userObj = user.toObject();
      
//       // Only include permission field for admin roles
//       if (user.role === 'admin') {
//         return userObj;
//       }
      
//       // For non-admin users, remove permission field if it exists
//       if (userObj.permission) {
//         delete userObj.permission;
//       }
      
//       return userObj;
//     });
    
//     res.json(usersWithPermissions);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // superAdmin
// // Get all pending admin permission requests (for superAdmin only)
// router.get('/permission-requests', protect, async (req, res) => {
//   try {
//     // Check if user is superAdmin
//     const currentUser = await User.findById(req.user._id);
    
//     if (currentUser.role !== 'superAdmin') {
//       return res.status(403).json({ message: 'Unauthorized access' });
//     }
    
//     // Find all admin users with pending permission
//     const pendingAdmins = await User.find({
//       role: 'admin',
//       permission: 'pending'
//     }).select('-password');
    
//     res.json(pendingAdmins);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Update admin permission (for superAdmin only)
// router.put('/permission/:userId', protect, async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { permission } = req.body;
    
//     // Check if user is superAdmin
//     const currentUser = await User.findById(req.user._id);
    
//     if (currentUser.role !== 'superAdmin') {
//       return res.status(403).json({ message: 'Unauthorized access' });
//     }
    
//     // Validate permission value
//     if (!['approved', 'pending', 'rejected'].includes(permission)) {
//       return res.status(400).json({ message: 'Invalid permission value' });
//     }
    
//     // Find and update the admin user
//     const adminUser = await User.findById(userId);
    
//     if (!adminUser || adminUser.role !== 'admin') {
//       return res.status(404).json({ message: 'Admin user not found' });
//     }
    
//     adminUser.permission = permission;
//     await adminUser.save();
    
//     res.json({
//       message: `Permission ${permission} successfully`,
//       user: {
//         _id: adminUser._id,
//         username: adminUser.username,
//         email: adminUser.email,
//         role: adminUser.role,
//         permission: adminUser.permission,
//         profile: adminUser.profile
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// module.exports = router;

// new
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const crypto = require('crypto');
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role, profile } = req.body;
    
    // Validate role
    const validRoles = ['user', 'admin', 'superAdmin'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user with enhanced profile
    const userData = {
      username,
      email,
      password,
      role: role || 'user',
      profile: {
        ...profile,
        // Set default fullName if first/last name provided
        fullName: profile?.firstName && profile?.lastName 
          ? `${profile.firstName} ${profile.lastName}`
          : undefined
      }
    };

    // If registering as admin, set default admin details
    if (userData.role === 'admin') {
      userData.adminDetails = {
        department: profile?.department || 'General',
        permissions: ['manage_users', 'manage_content', 'view_analytics'],
        assignedAt: new Date(),
        isActive: false
      };
    }

    // If registering as superAdmin, set full permissions
    if (userData.role === 'superAdmin') {
      userData.adminDetails = {
        permissions: ['full_access'],
        assignedAt: new Date(),
        isActive: true
      };
    }

    const user = await User.create(userData);

    // Prepare response
    const responseUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profile: user.profile,
      dailyTargets: user.dailyTargets,
      notificationSettings: user.notificationSettings,
      status: user.status,
      createdAt: user.createdAt
    };

    // Add admin details if applicable
    if (user.role === 'admin' || user.role === 'superAdmin') {
      responseUser.adminDetails = user.adminDetails;
    }

    // Add token
    responseUser.token = generateToken(user._id);

    res.status(201).json(responseUser);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user with email or username
    const user = await User.findOne({ 
      $or: [{ email }, { username: email }]
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if account is active
    if (user.status !== 'active') {
      return res.status(403).json({ 
        message: `Account is ${user.status}`,
        status: user.status
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // Track failed login attempts
      user.security.failedLoginAttempts = (user.security.failedLoginAttempts || 0) + 1;
      
      // Lock account after 5 failed attempts for 30 minutes
      if (user.security.failedLoginAttempts >= 5) {
        user.security.accountLockedUntil = new Date(Date.now() + 30 * 60 * 1000);
      }
      
      await user.save();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Reset failed login attempts on successful login
    user.security.failedLoginAttempts = 0;
    user.security.accountLockedUntil = null;
    user.activity.lastLogin = new Date();
    user.activity.loginCount = (user.activity.loginCount || 0) + 1;
    await user.save();

    // Prepare response
    const responseUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profile: user.profile,
      dailyTargets: user.dailyTargets,
      notificationSettings: user.notificationSettings,
      preferences: user.preferences,
      activity: user.activity,
      status: user.status,
      createdAt: user.createdAt
    };

    // Add admin details if applicable
    if (user.role === 'admin' || user.role === 'superAdmin') {
      responseUser.adminDetails = user.adminDetails;
    }

    // Add token
    responseUser.token = generateToken(user._id);

    res.json(responseUser);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
});
// Add this route after the existing routes in auth.js

// Update user status (activate/deactivate) - for admin/superAdmin
router.put('/user/:id/status', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const currentUser = await User.findById(req.user._id);
    const targetUser = await User.findById(id);
    
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if current user has permission to change status
    if (currentUser.role !== 'admin' && currentUser.role !== 'superAdmin') {
      return res.status(403).json({ message: 'Unauthorized to change user status' });
    }
    
    // Admin cannot change status of superAdmin
    if (currentUser.role === 'admin' && targetUser.role === 'superAdmin') {
      return res.status(403).json({ message: 'Cannot change status of superAdmin' });
    }
    
    // Prevent changing own status
    if (targetUser._id.toString() === currentUser._id.toString()) {
      return res.status(400).json({ message: 'Cannot change your own account status' });
    }
    
    // Validate status value
    if (!['active', 'inactive', 'suspended'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    
    // Update status
    targetUser.status = status;
    targetUser.updatedAt = new Date();
    
    await targetUser.save();
    
    const updatedUser = await User.findById(id)
      .select('-password -security -__v');
    
    res.json({
      message: `User account ${status === 'active' ? 'activated' : 'deactivated'} successfully`,
      user: updatedUser
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: error.message });
  }
});
// Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -security');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { 
      profile, 
      dailyTargets, 
      notificationSettings, 
      preferences,
      password, 
      newPassword 
    } = req.body;
    
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update profile fields (nested merge)
    if (profile) {
      // Handle nested profile updates
      if (profile.firstName || profile.lastName) {
        profile.fullName = `${profile.firstName || user.profile.firstName || ''} ${profile.lastName || user.profile.lastName || ''}`.trim();
      }
      
      // Update weight timestamp if weight changed
      if (profile.weight && profile.weight.value !== user.profile.weight?.value) {
        profile.weight.lastUpdated = new Date();
      }
      
      user.profile = { ...user.profile.toObject(), ...profile };
    }

    // Update daily targets
    if (dailyTargets) {
      dailyTargets.lastUpdated = new Date();
      user.dailyTargets = { ...user.dailyTargets.toObject(), ...dailyTargets };
    }

    // Update notification settings
    if (notificationSettings) {
      user.notificationSettings = { 
        ...user.notificationSettings.toObject(), 
        ...notificationSettings 
      };
    }

    // Update preferences
    if (preferences) {
      user.preferences = { ...user.preferences.toObject(), ...preferences };
    }

    // Update password if provided
    if (password && newPassword) {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      
      if (newPassword.length < 6) {
        return res.status(400).json({ message: 'New password must be at least 6 characters' });
      }
      
      user.password = newPassword;
      user.security.lastPasswordChange = new Date();
    }

    user.updatedAt = new Date();
    await user.save();

    // Return updated user without sensitive data
    const updatedUser = await User.findById(req.user._id)
      .select('-password -security -__v');

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ 
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
});

// Get all users (with permission checks)
// router.get('/allusers', protect, async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.user._id);
    
//     // Check if user has permission to view all users
//     // if (!currentUser.hasPermission('manage_users') && currentUser.role !== 'superAdmin') {
//     //   return res.status(403).json({ message: 'Unauthorized access' });
//     // }
//     if (currentUser.role !== 'admin' && 
//         currentUser.role !== 'superAdmin' && 
//         !currentUser.hasPermission('manage_users')) {
//       return res.status(403).json({ message: 'Unauthorized access' });
//     }
//     // Build query based on user role
//     let query = {};
    
//     // Regular admins can only see users and other admins they can manage
//     if (currentUser.role === 'admin' && !currentUser.hasPermission('full_access')) {
//       query = { role: { $in: ['user', 'admin'] } };
//     }

//     const users = await User.find(query)
//       .select('-password -security -__v')
//       .sort({ createdAt: -1 });

//     // Filter users based on manage permissions
//     const filteredUsers = users.filter(user => {
//       // Superadmin can see everyone
//       if (currentUser.role === 'superAdmin') return true;
      
//       // Admin can only see users they can manage
//       return currentUser.canManageUser(user);
//     });

//     // Transform response to include calculated age and clean up data
//     const transformedUsers = filteredUsers.map(user => {
//       const userObj = user.toObject();
      
//       // Add calculated age
//       if (user.profile.dateOfBirth) {
//         const today = new Date();
//         const birthDate = new Date(user.profile.dateOfBirth);
//         let age = today.getFullYear() - birthDate.getFullYear();
//         const monthDiff = today.getMonth() - birthDate.getMonth();
//         if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//           age--;
//         }
//         userObj.calculatedAge = age;
//       }

//       // Remove sensitive admin details for non-admin viewers
//       if (currentUser.role !== 'superAdmin' && currentUser.role !== 'admin') {
//         delete userObj.adminDetails;
//       }

//       return userObj;
//     });

//     res.json(transformedUsers);
//   } catch (error) {
//     console.error('Get all users error:', error);
//     res.status(500).json({ message: error.message });
//   }
// });
router.get('/allusers', protect, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    
    // Check if user has permission to view all users
    // Allow both admin and superAdmin roles
    if (currentUser.role !== 'admin' && 
        currentUser.role !== 'superAdmin' && 
        !currentUser.hasPermission('manage_users')) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Build query based on user role
    let query = {};
    
    // Regular admins can see all users including other admins
    if (currentUser.role === 'admin' && !currentUser.hasPermission('full_access')) {
      // Remove the restriction or modify it to include all roles
      // query = { role: { $in: ['user', 'admin'] } }; // OLD
      query = {}; // Allow admin to see everyone
    }

    const users = await User.find(query)
      .select('-password -security -__v')
      .sort({ createdAt: -1 });

    // Filter users based on manage permissions
    const filteredUsers = users.filter(user => {
      // Superadmin can see everyone
      if (currentUser.role === 'superAdmin') return true;
      
      // Admin can see everyone too (or apply your specific logic)
      if (currentUser.role === 'admin') return true;
      
      // Other roles: check if they can manage the user
      return currentUser.canManageUser(user);
    });

    // Transform response to include calculated age and clean up data
    const transformedUsers = filteredUsers.map(user => {
      const userObj = user.toObject();
      
      // Add calculated age
      if (user.profile?.dateOfBirth) {
        const today = new Date();
        const birthDate = new Date(user.profile.dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        userObj.calculatedAge = age;
      }

      // Remove sensitive admin details for non-admin viewers
      if (currentUser.role !== 'superAdmin' && currentUser.role !== 'admin') {
        delete userObj.adminDetails;
      }

      return userObj;
    });

    res.json(transformedUsers);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: error.message });
  }
});
// Get pending admin permission requests (for superAdmin only)
router.get('/permission-requests', protect, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    
    // Check if user is superAdmin
    if (currentUser.role !== 'superAdmin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    
    // Find all admin users where permission is pending or admin is inactive
    const pendingAdmins = await User.find({
      $or: [
        { role: 'admin', 'adminDetails.isActive': false },
        { role: 'admin', 'adminDetails.permissions': { $exists: false } }
      ]
    })
    .select('-password -security -__v')
    .sort({ createdAt: -1 });
    
    res.json(pendingAdmins);
  } catch (error) {
    console.error('Permission requests error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update admin permission (for superAdmin only)
router.put('/permission/:userId', protect, async (req, res) => {
  try {
    const { userId } = req.params;
    const { 
      permission, 
      adminDetails,
      status,
      role 
    } = req.body;
    
    const currentUser = await User.findById(req.user._id);
    
    // Check if user is superAdmin
    if (currentUser.role !== 'superAdmin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    
    // Find the user to update
    const targetUser = await User.findById(userId);
    
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update role if provided (only superAdmin can change roles)
    if (role && ['user', 'admin', 'superAdmin'].includes(role)) {
      // Cannot demote another superAdmin
      if (targetUser.role === 'superAdmin' && role !== 'superAdmin') {
        return res.status(400).json({ message: 'Cannot demote superAdmin' });
      }
      
      targetUser.role = role;
      
      // Set admin details when promoting to admin
      if (role === 'admin' && !targetUser.adminDetails) {
        targetUser.adminDetails = {
          department: adminDetails?.department || 'General',
          permissions: adminDetails?.permissions || ['manage_users', 'manage_content', 'view_analytics'],
          assignedBy: currentUser._id,
          assignedAt: new Date(),
          isActive: true
        };
      }
      
      // Remove admin details when demoting from admin
      if (role !== 'admin' && targetUser.role === 'admin') {
        targetUser.adminDetails = undefined;
      }
    }

    // Update admin details if provided
    if (adminDetails && targetUser.role === 'admin') {
      targetUser.adminDetails = {
        ...targetUser.adminDetails?.toObject(),
        ...adminDetails,
        // Preserve assignedBy if not changing
        assignedBy: adminDetails.assignedBy || targetUser.adminDetails?.assignedBy,
        assignedAt: adminDetails.assignedAt || targetUser.adminDetails?.assignedAt
      };
    }

    // Update status if provided
    if (status && ['active', 'inactive', 'suspended', 'deleted'].includes(status)) {
      targetUser.status = status;
      if (status === 'deleted') {
        targetUser.deletedAt = new Date();
      }
    }

    // For backward compatibility with old permission field
    if (permission && ['approved', 'pending', 'rejected'].includes(permission)) {
      if (targetUser.role === 'admin') {
        targetUser.adminDetails = targetUser.adminDetails || {};
        if (permission === 'approved') {
          targetUser.adminDetails.isActive = true;
        } else if (permission === 'rejected') {
          targetUser.adminDetails.isActive = false;
        }
      }
    }

    targetUser.updatedAt = new Date();
    await targetUser.save();

    // Return updated user
    const updatedUser = await User.findById(userId)
      .select('-password -security -__v');

    res.json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update permission error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID (for admin/superAdmin)
router.get('/user/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = await User.findById(req.user._id);
    
    // Check permissions
    if (!currentUser.hasPermission('manage_users') && currentUser.role !== 'superAdmin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    
    const user = await User.findById(id)
      .select('-password -security -__v');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if current user can manage this user
    if (!currentUser.canManageUser(user)) {
      return res.status(403).json({ message: 'Cannot access this user' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update user by ID (for admin/superAdmin)
router.put('/user/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { profile, dailyTargets, notificationSettings, status } = req.body;
    
    const currentUser = await User.findById(req.user._id);
    const targetUser = await User.findById(id);
    
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if current user can manage this user
    if (!currentUser.canManageUser(targetUser)) {
      return res.status(403).json({ message: 'Cannot modify this user' });
    }
    
    // Update fields
    if (profile) {
      targetUser.profile = { ...targetUser.profile.toObject(), ...profile };
    }
    
    if (dailyTargets) {
      dailyTargets.lastUpdated = new Date();
      targetUser.dailyTargets = { ...targetUser.dailyTargets.toObject(), ...dailyTargets };
    }
    
    if (notificationSettings) {
      targetUser.notificationSettings = { 
        ...targetUser.notificationSettings.toObject(), 
        ...notificationSettings 
      };
    }
    
    if (status && ['active', 'inactive', 'suspended'].includes(status)) {
      targetUser.status = status;
    }
    
    targetUser.updatedAt = new Date();
    await targetUser.save();
    
    const updatedUser = await User.findById(id)
      .select('-password -security -__v');
    
    res.json({
      message: 'User updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: error.message });
  }
});


// router.delete('/user/:id', protect, async (req, res) => {
//   try {
//     console.log("795delete")
//     const { id } = req.params;
//     const { currentUserId } = req.body;

//     const currentUser = await User.findById(currentUserId);
//     const targetUser = await User.findById(id);

//     console.log("800delete")

//     if (!targetUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Only superAdmin can delete
//     if (currentUser.role !== 'superAdmin') {
//       return res.status(403).json({ message: 'Only superAdmin can delete users' });
//     }

//     console.log("809delete")

//     // Prevent deleting self
//     if (targetUser._id.toString() === currentUser._id.toString()) {
//       return res.status(400).json({ message: 'Cannot delete your own account' });
//     }

//     // Prevent deleting another superAdmin
//     if (targetUser.role === 'superAdmin') {
//       return res.status(400).json({ message: 'Cannot delete another superAdmin' });
//     }

//     // HARD DELETE
//     await targetUser.deleteOne();

//     res.json({
//       message: 'User deleted successfully',
//       userId: id
//     });

//   } catch (error) {
//     console.error('Delete user error:', error);
//     res.status(500).json({ message: error.message });
//   }
// });


// In auth.js - Update the delete route
router.delete('/user/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = await User.findById(req.user._id); // Get from token
    const targetUser = await User.findById(id);

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only superAdmin can delete users
    if (currentUser.role !== 'superAdmin') {
      return res.status(403).json({ message: 'Only superAdmin can delete users' });
    }

    // Prevent deleting self
    if (targetUser._id.toString() === currentUser._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    // Prevent deleting another superAdmin
    if (targetUser.role === 'superAdmin') {
      return res.status(400).json({ message: 'Cannot delete another superAdmin' });
    }

    // HARD DELETE
    await targetUser.deleteOne();

    res.json({
      message: 'User deleted successfully',
      userId: id
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: error.message });
  }
});
// Get user statistics (for admin dashboard)
router.get('/stats', protect, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    
    if (!currentUser.hasPermission('view_analytics') && currentUser.role !== 'superAdmin') {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    
    const stats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          activeUsers: { 
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          },
          adminUsers: { 
            $sum: { $cond: [{ $eq: ['$role', 'admin'] }, 1, 0] }
          },
          superadminUsers: { 
            $sum: { $cond: [{ $eq: ['$role', 'superAdmin'] }, 1, 0] }
          },
          newUsersToday: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gte: ['$createdAt', new Date(new Date().setHours(0, 0, 0, 0))] },
                    { $eq: ['$status', 'active'] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      }
    ]);
    
    res.json(stats[0] || {
      totalUsers: 0,
      activeUsers: 0,
      adminUsers: 0,
      superadminUsers: 0,
      newUsersToday: 0
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ message: error.message });
  }
});
const resetTokens = new Map();


// Step 1: Request password reset
router.post('/forgot-password/request', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Please provide email address' });
    }

    // Find user by email or username
    const user = await User.findOne({ 
      $or: [{ email }, { username: email }]
    });

    // For security, don't reveal if user exists or not
    if (!user) {
      return res.status(200).json({ 
        message: 'If your email is registered, you will receive reset instructions.'
      });
    }

    // Check if account is active
    if (user.status !== 'active') {
      return res.status(403).json({ 
        message: `Cannot reset password. Account is ${user.status}.`
      });
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    
    // Store token with user info
    resetTokens.set(token, {
      userId: user._id,
      email: user.email,
      username: user.username,
      expiresAt,
      createdAt: new Date()
    });

    // In production, send email with reset link
    console.log(`Password reset token for ${user.email}: ${token}`);
    
    res.status(200).json({
      message: 'Reset token generated',
      token: token,
      expiresIn: '15 minutes'
    });

  } catch (error) {
    console.error('Forgot password request error:', error);
    res.status(500).json({ 
      message: 'Password reset request failed. Please try again later.'
    });
  }
});

// Step 2: Reset password with new password
router.post('/forgot-password/reset', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Validate token
    const tokenData = resetTokens.get(token);
    
    if (!tokenData) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
    
    if (new Date() > tokenData.expiresAt) {
      resetTokens.delete(token); // Clean up expired token
      return res.status(400).json({ message: 'Reset token has expired' });
    }

    // Find user
    const user = await User.findById(tokenData.userId);
    
    if (!user) {
      resetTokens.delete(token); // Clean up invalid token
      return res.status(404).json({ message: 'User not found' });
    }

    // Set new password
    user.password = newPassword;
    
    // Update security info
    user.security.lastPasswordChange = new Date();
    user.security.lastPasswordReset = new Date();
    user.security.failedLoginAttempts = 0;
    user.security.accountLockedUntil = null;
    
    // Update activity
    user.activity.lastPasswordReset = new Date();
    
    await user.save();

    // Clean up used token
    resetTokens.delete(token);
    
    console.log(`Password reset successful for ${user.email}`);

    res.status(200).json({
      message: 'Password reset successful! You can now login with your new password.'
    });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Password reset failed. Please try again.' });
  }
});

// Cancel reset and set default password
router.post('/forgot-password/cancel', async (req, res) => {
  try {
    const { token, email } = req.body;
    
    // Validate token
    const tokenData = resetTokens.get(token);
    
    if (!tokenData) {
      return res.status(200).json({ message: 'Reset process cancelled' });
    }

    // Find user
    const user = await User.findById(tokenData.userId);
    
    if (!user) {
      resetTokens.delete(token);
      return res.status(200).json({ message: 'Reset cancelled' });
    }

    // Set default password
    const defaultPassword = 'admin@123';
    user.password = defaultPassword;
    
    // Update security info
    user.security.lastPasswordChange = new Date();
    user.security.lastPasswordReset = new Date();
    user.security.failedLoginAttempts = 0;
    user.security.accountLockedUntil = null;
    
    // Update activity
    user.activity.lastPasswordReset = new Date();
    
    await user.save();

    // Clean up token
    resetTokens.delete(token);
    
    console.log(`Password reset cancelled for ${user.email}, set to default password`);
    
    // In production, send email notification
    console.log(`Default password email for ${user.email}: admin@123`);

    res.status(200).json({
      message: 'Password reset cancelled. Default password has been set.'
    });

  } catch (error) {
    console.error('Reset cancellation error:', error);
    res.status(500).json({ message: 'Reset cancellation failed' });
  }
});

// Clean up expired tokens periodically (optional)
setInterval(() => {
  const now = new Date();
  for (const [token, data] of resetTokens.entries()) {
    if (now > data.expiresAt) {
      resetTokens.delete(token);
      console.log(`Cleaned up expired token: ${token}`);
    }
  }
}, 60 * 60 * 1000); // Run every hour
module.exports = router;