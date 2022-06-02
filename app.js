const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { routes } = require('./routes/routes');
const errorHandler = require('./middlewares/errorHandler');
const ErrorNotFound = require('./errors/ErrorNotFound');
const { logger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use((req, res, next) => {
  next(new ErrorNotFound('Такого пути не существует'));
});
app.use(logger);
app.use(errors()); // celebrate handler
app.use(errorHandler);

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server has been started! Listen on PORT: ${PORT} `);
  });
}

main();
