const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_MOVIE,
  FORBIDDEN_ERROR,
  MOVIE_DELETED,
  NOT_VALID_MOVIE_ID,
} = require('../utils/constants');

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
      return next(new BadRequestError(BAD_REQUEST_ERROR));
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
      return next(new NotFoundError(NOT_FOUND_MOVIE));
    }
    if (!movie.owner.equals(userId)) {
      return next(new ForbiddenError(FORBIDDEN_ERROR));
    }
    await movie.remove();
    return res.send({ message: MOVIE_DELETED });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError(NOT_VALID_MOVIE_ID));
    }
    return next(err);
  }
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovieById,
};
