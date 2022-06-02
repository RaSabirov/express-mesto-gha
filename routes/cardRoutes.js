const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardControllers');
const { validateCreateCard, validateId } = require('../middlewares/validations');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', validateCreateCard, createCard);
cardRoutes.delete('/:cardId', validateId, deleteCard);
cardRoutes.put('/:cardId/likes', validateId, likeCard);
cardRoutes.delete('/:cardId/likes', validateId, dislikeCard);

module.exports = { cardRoutes };
