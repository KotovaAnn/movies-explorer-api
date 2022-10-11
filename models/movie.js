const mongoose = require('mongoose');
const validator = require('validator');
const { MOVIE_SCHEMA_MESSAGE } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.COUNTRY],
  },
  director: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.DIRECTOR],
  },
  duration: {
    type: Number,
    required: [true, MOVIE_SCHEMA_MESSAGE.DURATION],
  },
  year: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.YEAR],
  },
  description: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.DESCRIPTION],
  },
  image: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.IMAGE],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: MOVIE_SCHEMA_MESSAGE.INVALID_IMAGE_URL,
    },
  },
  trailerLink: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.TRAILERLINK],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: MOVIE_SCHEMA_MESSAGE.INVALID_TRAILERLINK_URL,
    },
  },
  thumbnail: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.THUMBNAIL],
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: MOVIE_SCHEMA_MESSAGE.INVALID_URL_THUMBNAIL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, MOVIE_SCHEMA_MESSAGE.OWNER],
  },
  movieId: {
    type: Number,
    required: [true, MOVIE_SCHEMA_MESSAGE.MOVIEID],
  },
  nameRU: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.NAME_RU],
  },
  nameEN: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.NAME_EN],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
