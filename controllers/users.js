const User = require('../models/users');

const getUsers = (req, res) => {
  User.find({})
  .then((users) => {
    res.send({users})
  })
  .catch((evt) => {
    res.status(500).send({ message: 'Ошибка' })
    console.log('Ошибка поиска пользователей');
  })
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
  .orFail(() => {
    throw new Error('Пользователь не найден')
  })
  .then((user) => {
    res.send({ data: user})
  })
  .catch((e) => {
    if(e.message === 'Пользователь не найден') {
      res.status(400).send({message: 'Пользователь не найден' })
    } else {
      res.status(500).send({ message: 'Ошибка' })
    }
  })
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((newUser) => {
      res.send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя.',
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
        .send({ message: 'Ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true}
  )
  .then((user) => {
    res.status(200).send(user);
  })
  .catch((evt) => {
    if( evt.name === 'ValidationError') {
      const message = Object.values(evt.errors)
      .map((error) => error.message)
      .join("; ");
      res.status(400).send({ message })
    } else {
      res.status(500).send({ message: 'Ошибка' })
    }
  })
};

module.exports = { getUsers, getUser, createUser, updateUser, updateAvatar };