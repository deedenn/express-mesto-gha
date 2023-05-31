const ERROR_400 = 400;
const ERROR_404 = 404;
const ERROR_500 = 500;
const OK_200 = 200;

const regExp = /http(s)?:\/\/(www\.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+\.[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+/;

module.exports = { ERROR_400, ERROR_404, ERROR_500, OK_200, regExp };
