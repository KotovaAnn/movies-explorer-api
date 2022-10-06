const userRouter = require('express').Router();

// Импортировать контролеры
const {
  getUserInfo,
  profileUpdate,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
userRouter.get('/users/me', getUserInfo);

// обновляет информацию о пользователе (email и имя)
userRouter.patch('/users/me', profileUpdate);

module.exports = {
  userRouter,
};
