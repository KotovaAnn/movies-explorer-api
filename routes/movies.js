const movieRouter = require('express').Router();

// Импортировать контролеры
const {
  getSavedMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
movieRouter.get('/movies', getSavedMovies);

// создаёт фильм с телoм (country, director, duration, year,
// description, image, trailer, nameRU, nameEN и thumbnail, movieId)
movieRouter.post('/movies', createMovie);

// удаляет сохранённый фильм по id
movieRouter.delete('/movies/_id', deleteMovieById);

module.exports = {
  movieRouter,
};
