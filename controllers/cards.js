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
      } else {
        return res.status(500).send({ message: 'Ошибка 500' });
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      throw new Error('Карточка не найдена');
    })
    .then((card) => res.send(card))
    .catch((evt) => {
      res.status(500).send({ message: 'Ошибка' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('Карточка не найдена');
    })
    .then((card) => res.status(200).send(card))
    .catch((evt) => {
      res.status(500).send({ message: 'Ошибка' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('Карточка не найдена');
    })
    .then((card) => res.status(200).send(card))
    .catch((evt) => {
      res.status(500).send({ message: 'Ошибка' });
    });
};

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
