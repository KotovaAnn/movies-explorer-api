const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { userRouter } = require('./users');
const { movieRouter } = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { login, createUser, signout } = require('../controllers/users');

// создаёт пользователя с переданными в теле
// email, password и name
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

// проверяет переданные в теле почту и пароль
// и возвращает JWT
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);
router.use(userRouter);
router.use(movieRouter);
router.get('/signout', signout);

router.use((req, res, next) => {
  next(new NotFoundError('Код ответа: 404. Такой страницы не существует'));
});

module.exports = router;
