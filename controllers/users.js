const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');

const getUserInfo = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoundError('Такого пользователя не существует'));
    }
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

const profileUpdate = async (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new NotFoundError('Такого пользователя не существует'));
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Данные пользователя переданы некорректно'));
    }
    return next(err);
  }
};

const createUser = async (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new User({
      email,
      password: hashedPassword,
      name,
    }).save();
    return res.status(200).send(user);
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError('Пользователь с таким email уже существует'));
    }
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Ошибка в запросе'));
    }
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new UnauthorizedError('Неправильные почта или пароль'));
    }
    const isUserValid = await bcrypt.compare(password, user.password);
    if (!isUserValid) {
      return next(new UnauthorizedError('Неправильные почта или пароль'));
    }
    const token = jwt.sign(
      { _id: user._id },
      'some-secret-key',
      { expiresIn: '7d' },
    );
    res.cookie(
      'jwt',
      token,
      {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        SameSite: 'None',
        Secure: true,
      },
    );
    return res.send(user);
  } catch (err) {
    return next(err);
  }
};

const signout = async (res, next) => {
  try {
    res.clearCookie('jwt');
    return res.send({ message: 'Выход' });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getUserInfo,
  profileUpdate,
  createUser,
  login,
  signout,
};
