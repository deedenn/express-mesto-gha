const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();

const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const signRouter = require('./routes/sign');
const { auth } = require('./middlewares/auth');
const { centralError } = require('./middlewares/centralError');
const { NotFoundError } = require('./errors/notfound');

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

app.use(centralError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
