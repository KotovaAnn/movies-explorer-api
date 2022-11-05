require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes/index');

const rateLimiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  MONGO_DB_URL,
  PORT_NUMBER,
  SERVER_CRASH,
  INTERNAL_SERVER_ERROR,
} = require('./utils/constants');

const { PORT = PORT_NUMBER, MONGO_URL = MONGO_DB_URL } = process.env;
const app = express();
const errorHandler = require('./middlewares/error');

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://kot-movies-explore.nomoredomains.icu/',
      'https://kot-movies-explore.nomoredomains.icu/',
    ],
    credentials: true,
  }),
);

app.use(requestLogger);

app.use(helmet());

app.use(rateLimiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(SERVER_CRASH);
  }, 0);
});

app.use(routes);

async function main() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    await app.listen(PORT);
    console.log(`Сервер запущен на ${PORT} порту`);
    return;
  } catch (err) {
    console.log(INTERNAL_SERVER_ERROR);
  }
}

main();

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
