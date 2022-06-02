const express = require('express');
const { createUser, loginUser } = require('../controllers/userControllers');

const authRoutes = express.Router();

authRoutes.post('/signup', createUser);
authRoutes.post('/signin', loginUser);

module.exports = {
  authRoutes,
};
