const User = require('../models/users');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка в работе сервера' });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь по указанному id не найден.' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

const updateUser = (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(owner, { name, about })
    .then((user) => {
      res.send({ data: user });

      if (!user) {
        res.status(404D).send({
          message: 'Пользователь c указанным id не найден.',
        });
        return;
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
        return;
      }
      res
        .status(500)
        .send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

const updateUser = (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(owner, { name, about })
    .then((user) => {
      res.send({ data: user });

      if (!user) {
        res.status(400).send({
          message: 'Пользователь c указанным id не найден.',
        });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
        return;
      }
      res.status(500).send({ message: 'Ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const owner = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(owner, { avatar })
    .then((user) => {
      res.send({ data: user });

      if (!user) {
        res.status(404).send({
          message: 'Пользователь c указанным id не найден.',
        });
        return;
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара.',
        });
        return;
      }
      res
        .status(500)
        .send({ message: 'Произошла ошибка в работе сервера.' });
    });
};

module.exports = {
  getUsers, getUser, createUser, updateUser, updateAvatar,
};
