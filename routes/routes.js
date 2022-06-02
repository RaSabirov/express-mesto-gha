const express = require('express');
const { cardRoutes } = require('./cardRoutes');
const { userRoutes } = require('./userRoutes');
const { authRoutes } = require('./authRoutes');
const auth = require('../middlewares/auth');

const routes = express.Router();

// сначала вызовется auth, а затем,
// если авторизация успешна, userRoutes и cardRoutes
routes.use('/users', auth, userRoutes);
routes.use('/cards', auth, cardRoutes);
routes.use('/', authRoutes);
module.exports = { routes };
