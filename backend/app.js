const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');

const morgan = require('morgan');

const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');

const connectDb = require('./db');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.CONNECTION_STRING);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
