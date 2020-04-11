const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const bodyParser = require('body-parser');
const logger = require('./logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// logger
app.use('*', (req, res, next) => {
  logger.info(
    `url: ${req.baseUrl}, body: ${JSON.stringify(
      req.body
    )}, params: ${JSON.stringify(req.params)}, query: ${JSON.stringify(
      req.query
    )}`
  );

  next();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

// errors
app.use((err, req, res, next) => {
  logger.error(
    `url: ${req.baseUrl}, body: ${JSON.stringify(
      req.body
    )}, params: ${JSON.stringify(req.params)}, query: ${JSON.stringify(
      req.query
    )}, status: ${err.status}, message: ${err.message}`
  );
  res.status(err.status).send(err.message);

  next(err);
});

module.exports = app;
