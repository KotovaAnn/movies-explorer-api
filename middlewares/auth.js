const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD } = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError(NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD));
  }
  req.user = payload;
  next();
};

module.exports = auth;
