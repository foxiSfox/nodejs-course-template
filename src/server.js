const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./logger');

process.on('uncaughtException', error => {
  logger.error(error.message);
});

process.on('unhandledRejection', error => {
  logger.error(error.message);
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
