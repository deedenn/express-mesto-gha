const express = require('express');

const { celebrate } = require('celebrate');
const { createCardValidation, deleteCardValidation, likeCardValidation, dislikeCardValidation } = require('../utils/validation');

const cardsRouter = express.Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);
cardsRouter.post('/', celebrate(createCardValidation), createCard);
cardsRouter.delete('/:cardId', celebrate(deleteCardValidation), deleteCard);
cardsRouter.put('/:cardId/likes', celebrate(likeCardValidation), likeCard);
cardsRouter.delete('/:cardId/likes', celebrate(dislikeCardValidation), dislikeCard);

module.exports = cardsRouter;
