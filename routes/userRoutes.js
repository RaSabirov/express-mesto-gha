const express = require('express');
const {
  getUsers,
  getUserById,
  // createUser,
} = require('../controllers/userControllers');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserById);
// userRoutes.post('/', createUser);

exports.userRoutes = userRoutes;
