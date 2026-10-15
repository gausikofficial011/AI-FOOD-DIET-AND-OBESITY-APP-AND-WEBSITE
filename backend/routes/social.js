// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/auth');
// const User = require('../models/User');

// router.post('/friends/request', protect, async (req, res) => {
//   try {
//     const { userId } = req.body;
//     if (userId === req.user._id.toString()) return res.status(400).json({ message: 'Cannot add yourself' });

//     const targetUser = await User.findById(userId);
//     if (!targetUser) return res.status(404).json({ message: 'User not found' });

//     targetUser.social.friendRequests.push({ from: req.user._id, status: 'pending' });
//     await targetUser.save();

//     res.json({ message: 'Friend request sent' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get('/friends', protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id)
//       .populate('social.friends', 'username profile.name')
//       .populate('social.friendRequests.from', 'username');

//     res.json({
//       friends: user.social.friends,
//       pendingRequests: user.social.friendRequests.filter(r => r.status === 'pending')
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.post('/share', protect, async (req, res) => {
//   try {
//     const { type, data } = req.body;
//     const shareUrl = `${process.env.FRONTEND_URL}/share/${req.user._id}`;

//     res.json({ url: shareUrl, message: 'Progress shared successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// Send friend request
// router.post('/friends/request', protect, async (req, res) => {
//   try {
//     const { userId } = req.body;
//     if (userId === req.user._id.toString()) return res.status(400).json({ message: 'Cannot add yourself' });

//     const targetUser = await User.findById(userId);
//     if (!targetUser) return res.status(404).json({ message: 'User not found' });

//     // Check if request already exists
//     const existingRequest = targetUser.social.friendRequests.find(
//       req => req.from.toString() === req.user._id.toString() && req.status === 'pending'
//     );

//     if (existingRequest) {
//       return res.status(400).json({ message: 'Friend request already sent' });
//     }

//     targetUser.social.friendRequests.push({ from: req.user._id, status: 'pending' });
//     await targetUser.save();

//     res.json({ message: 'Friend request sent' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
router.post('/friends/request', protect, async (req, res) => {
  try {
    const { userId } = req.body;

    console.log('DEBUG - Friend request from:', req.user._id, 'to:', userId);

    // Validate input
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot add yourself' });
    }

    // Find target user
    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('DEBUG - Target user found:', targetUser.username);
    console.log('DEBUG - Target user social field:', targetUser.social);

    // Initialize social field if it doesn't exist
    if (!targetUser.social) {
      targetUser.social = {
        friends: [],
        friendRequests: [],
        isPublic: false
      };
    }

    // Initialize friendRequests array if it doesn't exist
    if (!targetUser.social.friendRequests) {
      targetUser.social.friendRequests = [];
    }

    // Check for existing pending request
    const existingRequest = targetUser.social.friendRequests.find(
      request => {
        const requestFrom = request.from && request.from.toString();
        const currentUserId = req.user._id.toString();
        return requestFrom === currentUserId && request.status === 'pending';
      }
    );

    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    // Add new friend request
    targetUser.social.friendRequests.push({
      from: req.user._id,
      status: 'pending',
      timestamp: new Date()
    });

    // Save the target user
    await targetUser.save();
    console.log('DEBUG - Friend request saved successfully');

    res.json({
      message: 'Friend request sent successfully',
      requestId: targetUser.social.friendRequests[targetUser.social.friendRequests.length - 1]._id
    });

  } catch (error) {
    console.error('ERROR in friend request:', error);

    // More detailed error response
    res.status(500).json({
      message: 'Failed to send friend request',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get friends and pending requests
router.get('/friends', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('social.friends', 'username profile.name email')
      .populate('social.friendRequests.from', 'username email');

    res.json({
      friends: user.social.friends,
      pendingRequests: user.social.friendRequests.filter(r => r.status === 'pending')
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Add this to your social routes backend
router.get('/friends/sent', protect, async (req, res) => {
  try {
    // Find users where current user has sent pending requests
    const usersWithPendingRequests = await User.find({
      'social.friendRequests': {
        $elemMatch: {
          from: req.user._id,
          status: 'pending'
        }
      }
    });

    const sentRequests = usersWithPendingRequests.map(user => {
      const request = user.social.friendRequests.find(req =>
        req.from.toString() === req.user._id.toString() && req.status === 'pending'
      );
      return {
        to: user._id,
        toUsername: user.username,
        timestamp: request.timestamp
      };
    });

    res.json({ sentRequests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Search users by username
router.get('/search', protect, async (req, res) => {
  try {
    const { username, email } = req.query;

    if (!username && !email) {
      return res.status(400).json({ message: 'Please provide username or email to search' });
    }

    let query = {
      _id: { $ne: req.user._id } // Exclude current user
    };

    if (username) {
      query.username = { $regex: username, $options: 'i' };
    }

    if (email) {
      query.email = { $regex: email, $options: 'i' };
    }

    const users = await User.find(query)
      .select('username email profile.name profile.bio profile.avatar')
      .limit(20);

    // Filter out users who are already friends or have pending requests
    const currentUser = await User.findById(req.user._id);
    const friendIds = currentUser.social.friends.map(f => f.toString());
    const pendingRequestIds = currentUser.social.friendRequests
      .filter(r => r.status === 'pending')
      .map(r => r.from.toString());

    const filteredUsers = users.filter(user =>
      !friendIds.includes(user._id.toString()) &&
      !pendingRequestIds.includes(user._id.toString())
    );

    res.json({ users: filteredUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept friend request
router.put('/friends/accept/:requestId', protect, async (req, res) => {
  try {
    const { requestId } = req.params;

    const currentUser = await User.findById(req.user._id);

    // Find the request
    const requestIndex = currentUser.social.friendRequests.findIndex(
      req => req._id.toString() === requestId && req.status === 'pending'
    );

    if (requestIndex === -1) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    const request = currentUser.social.friendRequests[requestIndex];

    // Update request status
    currentUser.social.friendRequests[requestIndex].status = 'accepted';

    // Add to friends list (both ways)
    currentUser.social.friends.push(request.from);

    const senderUser = await User.findById(request.from);
    senderUser.social.friends.push(req.user._id);

    // Remove from pending requests of sender
    senderUser.social.friendRequests = senderUser.social.friendRequests.filter(
      req => !(req.from.toString() === req.user._id.toString() && req.status === 'pending')
    );

    await Promise.all([currentUser.save(), senderUser.save()]);

    res.json({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Decline friend request
router.put('/friends/decline/:requestId', protect, async (req, res) => {
  try {
    const { requestId } = req.params;

    const currentUser = await User.findById(req.user._id);

    // Find and remove the request
    const requestIndex = currentUser.social.friendRequests.findIndex(
      req => req._id.toString() === requestId && req.status === 'pending'
    );

    if (requestIndex === -1) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    const request = currentUser.social.friendRequests[requestIndex];

    // Update request status to declined
    currentUser.social.friendRequests[requestIndex].status = 'declined';

    // Also remove from sender's pending requests if exists
    const senderUser = await User.findById(request.from);
    senderUser.social.friendRequests = senderUser.social.friendRequests.filter(
      req => !(req.from.toString() === req.user._id.toString() && req.status === 'pending')
    );

    await Promise.all([currentUser.save(), senderUser.save()]);

    res.json({ message: 'Friend request declined' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove friend
router.delete('/friends/:friendId', protect, async (req, res) => {
  try {
    const { friendId } = req.params;

    const currentUser = await User.findById(req.user._id);
    const friendUser = await User.findById(friendId);

    if (!friendUser) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    // Remove from both users' friend lists
    currentUser.social.friends = currentUser.social.friends.filter(
      id => id.toString() !== friendId
    );

    friendUser.social.friends = friendUser.social.friends.filter(
      id => id.toString() !== req.user._id.toString()
    );

    await Promise.all([currentUser.save(), friendUser.save()]);

    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Share progress
router.post('/share', protect, async (req, res) => {
  try {
    const { type, data } = req.body;
    const shareUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/share/${req.user._id}`;

    // You can create a share record in database if needed
    // const share = new Share({ user: req.user._id, type, data });
    // await share.save();

    res.json({
      url: shareUrl,
      message: 'Progress shared successfully',
      type,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;