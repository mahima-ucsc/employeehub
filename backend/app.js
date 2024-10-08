const express = require('express');
const app = express();
require('dotenv').config();
require('express-async-errors');
var cors = require('cors');

const morgan = require('morgan');

const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');

const connectDb = require('./db');

const {
  employeesRouter,
  authRouter,
  leavesRouter,
  noticesRouter,
} = require('./routes');
const {
  errorHandlerMiddleware,
  routeNotFoundMiddlewear,
  authenticationMidddleware,
} = require('./middlewear');

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', authRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/leaves', authenticationMidddleware, leavesRouter);
app.use('/api/notices', authenticationMidddleware, noticesRouter);

app.use(errorHandlerMiddleware);
app.use(routeNotFoundMiddlewear);

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
