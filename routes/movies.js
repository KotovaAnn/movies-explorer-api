const movieRouter = require('express').Router();
const { validateCreateMovie, validatedeleteMovieById } = require('../middlewares/requestValidation');
const { getSavedMovies, createMovie, deleteMovieById } = require('../controllers/movies');

movieRouter.get('/movies', getSavedMovies);
movieRouter.post('/movies', validateCreateMovie, createMovie);
movieRouter.delete('/movies/_id', validatedeleteMovieById, deleteMovieById);

module.exports = {
  movieRouter,
};
