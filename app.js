const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const { errors } = require('celebrate');

const app = express();

const signRouter = require('./routes/sign');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { auth } = require('./middlewares/auth');
const { NotFoundError } = require('./errors/notfound');
const { centralError } = require('./middlewares/centralError');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('База данных подключена');
  });

app.use(express.json());
app.use(signRouter);
app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use((req, res, next) => {
  req.user = {
    _id: '64610a3c8aafb5a357e830aa',
  };
  next();
});

app.use(errors());
app.use(centralError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
