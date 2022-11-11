const MONGO_DB_URL = 'mongodb://localhost:27017/moviesdb';
const PORT_NUMBER = 3000;
const ALLOWED_CORS = [
  'http://kot-movies-explore.nomoredomains.icu/',
  'http://localhost:3000',
  'https://kot-movies-explore.nomoredomains.icu/',
];

const SERVER_CRASH = 'Сервер сейчас упадёт';
const NOT_FOUND_ERROR = 'Код ответа: 404. Такой страницы не существует';
const NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD = 'Неправильные почта или пароль';
const INTERNAL_SERVER_ERROR = 'На сервере произошла ошибка';
const BAD_REQUEST_ERROR = 'Ошибка в запросе';
const REQUEST_LOG_FILENAME = 'request.log';
const ERROR_LOG_FILENAME = 'error.log';
const NOT_URL_ADRESS = 'не URL адрес';
const NOT_FOUND_MOVIE = 'Такого фильма не существует';
const FORBIDDEN_ERROR = 'Ошибка прав доступа';
const MOVIE_DELETED = 'Фильм успешно удален';
const NOT_VALID_MOVIE_ID = 'Невалидный ID фильма';
const NOT_FOUND_USER = 'Такого пользователя не существует';
const CONFLICT_ERROR = 'Запрос не может быть выполнен из-за конфликтного обращения к ресурсу';
const CONFLICT_ERROR_EMAIL_ALREADY_EXIST = 'Пользователь с таким email уже существует';
const SIGNOUT_MESSAGE = 'Выход';

const MOVIE_SCHEMA_MESSAGE = {
  COUNTRY: 'Поле "country" должно быть заполнено',
  DIRECTOR: 'Поле "director" должно быть заполнено',
  DURATION: 'Поле "duration" должно быть заполнено',
  YEAR: 'Поле "year" должно быть заполнено',
  DESCRIPTION: 'Поле "description" должно быть заполнено',
  IMAGE: 'Поле "image" должно быть заполнено',
  INVALID_IMAGE_URL: 'Ошибка: невалидный URL картинки',
  TRAILERLINK: 'Поле "trailerLink" должно быть заполнено',
  INVALID_TRAILERLINK_URL: 'Ошибка: невалидная ссылка на трэйлер',
  THUMBNAIL: 'Поле "thumbnail" должно быть заполнено',
  INVALID_URL_THUMBNAIL: 'Ошибка: невалидная ссылка на минипостер',
  OWNER: 'Поле "owner" должно быть заполнено',
  MOVIEID: 'Поле "movieId" должно быть заполнено',
  NAME_RU: 'Поле "nameRU" должно быть заполнено',
  NAME_EN: 'Поле "nameEN" должно быть заполнено',
};

const USER_SCHEMA_MESSAGE = {
  EMAIL: 'Поле "email" должно быть заполнено',
  INVALID_EMAIL: 'Ошибка: невалидный email',
  PASSWORD: 'Поле "password" должно быть заполнено',
  NAME: 'Поле "name" должно быть заполнено',
};

module.exports = {
  MONGO_DB_URL,
  PORT_NUMBER,
  ALLOWED_CORS,
  SERVER_CRASH,
  NOT_FOUND_ERROR,
  NOT_AUTH_ERROR_WRONG_EMAIL_PASSWORD,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_ERROR,
  REQUEST_LOG_FILENAME,
  ERROR_LOG_FILENAME,
  NOT_URL_ADRESS,
  NOT_FOUND_MOVIE,
  FORBIDDEN_ERROR,
  MOVIE_DELETED,
  NOT_VALID_MOVIE_ID,
  NOT_FOUND_USER,
  CONFLICT_ERROR,
  CONFLICT_ERROR_EMAIL_ALREADY_EXIST,
  SIGNOUT_MESSAGE,
  MOVIE_SCHEMA_MESSAGE,
  USER_SCHEMA_MESSAGE,
};
