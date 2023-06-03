const express = require('express');
const { celebrate } = require('celebrate');
const { getInfoUser } = require('../controllers/users');
const {
  getUserByIdValidation, updateProfileValidation, updateAvatarValidation,
} = require('../utils/validation');

const usersRouter = express.Router();
const {
  getUsers, getUser, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getInfoUser);
usersRouter.get('/:userId', celebrate(getUserByIdValidation), getUser);
usersRouter.post('/', createUser);
usersRouter.patch('/me', celebrate(updateProfileValidation), updateUser);
usersRouter.patch('/me/avatar', celebrate(updateAvatarValidation), updateAvatar);

module.exports = usersRouter;
