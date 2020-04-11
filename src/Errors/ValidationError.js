class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
    this.name = 'ValidationError';
  }
}

module.exports = ValidationError;
