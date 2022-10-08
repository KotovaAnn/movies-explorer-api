const userRouter = require('express').Router();
const { validateUserId, validateProfileUpdate } = require('../middlewares/requestValidation');
const { getUserInfo, profileUpdate } = require('../controllers/users');

userRouter.get('/users/me', validateUserId, getUserInfo);
userRouter.patch('/users/me', validateProfileUpdate, profileUpdate);

module.exports = {
  userRouter,
};
