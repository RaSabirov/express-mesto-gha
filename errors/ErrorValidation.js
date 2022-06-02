class ErrorValidation extends Error {
  constructor(message = 'Произошел конфликт') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = ErrorValidation;
