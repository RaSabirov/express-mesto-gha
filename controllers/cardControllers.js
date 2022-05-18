const Card = require('../models/cardModules');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка в работе сервера' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))

    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
      }
      return res
        .status(500)
        .send({ message: 'Произошла ошибка в работе сервера' });
    });
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(404).send({
          message: 'Карточка с указанным _id не найдена.',
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Переданы некорректный ID',
        });
      }
      res.status(500).send({ message: 'Произошла ошибка в работе сервера' });
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(404).send({
          message: 'Переданы некорректные данные для постановки лайка.',
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Передан несуществующий _id карточки.' });
      }
      res.status(500).send({ message: 'Произошла ошибка в работе сервера' });
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res
          .status(404)
          .send({ message: 'Переданы некорректные данные для снятия лайка.' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Передан несуществующий _id карточки.' });
      }
      res.status(500).send({ message: 'Произошла ошибка в работе сервера' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
