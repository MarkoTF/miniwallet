const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session');
const passport = require('passport');
const { authenticationMiddleware } = require('./middlewares/protectedPath');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const transferRouter = require('./routes/transfer');
const accountRouter = require('./routes/account');
const ajaxRouter = require('./routes/ajaxMethods');

require('./middlewares/auth');

const app = express();
app.use(cors());

//Conexión a la base de datos
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/crypowallet';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;
// const sessionStorage;
db.on('error', () => {
	console.log('Error al conectarse a la base de datos');
});
db.once('open', () => {
	console.log('Conexión exitosa a la base de datos');
});

app.use(session({
	secret: 'Llave secreta',
	resave: true,
	saveUninitialized: true,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

app.use(authenticationMiddleware('/login/signin', ['/login/signup']));
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/transfer', transferRouter);
app.use('/account', accountRouter);
app.use('/ajax', ajaxRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
