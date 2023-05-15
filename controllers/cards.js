const Card = require('../models/cards');

const getCards = (req, res) => {
  Card.find({}).then((cards) => {
    res.send(cards);
  });
};

const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка 400' });
      }
      return res.status(500).send({ message: 'Ошибка 500' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: 'Карточка с указанным ID не найдена',
        });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Введен некорректный ID',
        });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка в работе сервера' });
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: 'Передан несуществующий ID карточки',
        });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Введен некорректный ID',
        });
        return;
      }
      res
        .status(500)
        .send({ message: 'Произошла ошибка в работе сервера' });
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: 'Передан несуществующий ID карточки',
        });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Введен некорректный ID',
        });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка в работе сервера' });
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
