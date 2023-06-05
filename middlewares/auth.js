const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unautorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация 1'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация 2'));
  }

  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
