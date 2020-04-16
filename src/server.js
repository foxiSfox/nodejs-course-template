const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./logger');
const connectDb = require('./dbconnect');

process.on('uncaughtException', error => {
  logger.error(error.message);
});

process.on('unhandledRejection', error => {
  logger.error(error.message);
});

app.listen(PORT, () => {
  connectDb(() => {
    console.log(`App is running on http://localhost:${PORT}`);
  });
});
