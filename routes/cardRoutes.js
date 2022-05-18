const express = require('express');
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cardControllers');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);
cardRoutes.post('/', createCard);
cardRoutes.delete('/:cardId', deleteCardById);
cardRoutes.put('/:cardId/likes', likeCard);
cardRoutes.delete('/:cardId/likes', dislikeCard);

module.exports = { cardRoutes };
