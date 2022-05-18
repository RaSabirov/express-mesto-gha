const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/userControllers');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.post('/', createUser);
userRoutes.patch('/me', updateProfile);
userRoutes.patch('/me/avatar', updateAvatar);

module.exports = { userRoutes };
// exports.userRoutes = userRoutes;
