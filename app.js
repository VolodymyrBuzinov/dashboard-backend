const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const codes = require('./helpers/Codes');
const tasksRouter = require('./routes/TasksRouter');
const userRouter = require('./routes/UsersRouter');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const formatsLogger =
  app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);
app.use('/tasks', tasksRouter);
app.use('/users', userRouter);

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : codes.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? 'Server error' : 'Error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? codes.INTERNAL_SERVER_ERROR : err.data,
  });
});

module.exports = app;
