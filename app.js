const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const colors = require('colors');
const helmet = require('helmet');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const errorHandler = require('./app/middleware/error');
const rateLimit = require('express-rate-limit');

const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());// set header sc
app.use(xss());
app.use(morgan('tiny'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

const systemConfig = require('./app/configs/system');
const databaseConfig = require('./app/configs/database');

// Local variable
app.locals.systemConfig = systemConfig;
(async () => {
  await mongoose.connect(`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@cluster0.ripeili.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
      console.log('Database connected');
    })
    .catch((error) => {
      console.log('Error connecting to database');
    })
})();

// Setup router
app.use(cookieParser());
app.use('/api/v1', require('./app/routes/index'));
app.use(errorHandler);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.end('Error1 App');
// });

module.exports = app;

