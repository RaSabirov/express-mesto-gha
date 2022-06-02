const { isCelebrateError } = require('celebrate');

// eslint-disable-next-line consistent-return
const errorHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err.stack || err);
  const status = err.statusCode || 500;

  if (isCelebrateError(err)) {
    const [error] = err.details.values();
    return res.status(400).send({ message: error.message });
  }

  res.status(status).send({
    message: err.message,
    err,
  });
  next();
};

module.exports = errorHandler;
