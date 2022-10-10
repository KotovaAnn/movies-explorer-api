const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const getSavedMovies = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movies = await Movie.find({ owner });
    return res.send(movies);
  } catch (err) {
    return next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner,
    });
    return res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Ошибка в запросе'));
    }
    return next(err);
  }
};

const deleteMovieById = async (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return next(new NotFoundError('Такого фильма не существует'));
    }
    if (!movie.owner.equals(userId)) {
      return next(new ForbiddenError('Ошибка прав доступа'));
    }
    await movie.remove();
    return res.send({ message: 'Фильм успешно удален' });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Невалидный ID фильма'));
    }
    return next(err);
  }
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovieById,
};
