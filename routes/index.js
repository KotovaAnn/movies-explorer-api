const router = require('express').Router();
const { userRouter } = require('./users');
const { movieRouter } = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { login, createUser, signout } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/requestValidation');
const { NOT_FOUND_ERROR } = require('../utils/constants');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);
router.use(userRouter);
router.use(movieRouter);
router.get('/signout', signout);

router.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR));
});

module.exports = router;
