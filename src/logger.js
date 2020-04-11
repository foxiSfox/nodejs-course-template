const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'silly',
      filename: 'silly.log',
      format: winston.format.simple()
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: winston.format.simple()
    }),
    new winston.transports.File({
      filename: 'info.log',
      level: 'info',
      format: winston.format.simple()
    })
  ]
});

module.exports = logger;
