const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();

const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
.then(() => {
  console.log('База данных подключена')
});

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64610a3c8aafb5a357e830aa'
  };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' })
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});