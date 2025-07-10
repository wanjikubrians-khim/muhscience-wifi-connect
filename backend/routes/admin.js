const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Session = require('../models/Session');
const authMiddleware = require('../middleware/auth');

// Protect all admin routes
router.use(authMiddleware.admin);

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ban/unban user
router.patch('/users/:id/ban', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isBanned = !user.isBanned;
    await user.save();
    res.json({ message: `User ${user.isBanned ? 'banned' : 'unbanned'}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View active sessions
router.get('/sessions/active', async (req, res) => {
  try {
    const sessions = await Session.find({ status: 'active' })
      .populate('user', 'name phone');
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;