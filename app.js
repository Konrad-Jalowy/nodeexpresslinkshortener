const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const mainRouter = require('./routes/mainRoutes');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const { doubleCsrf } = require("csrf-csrf");
const {
    doubleCsrfProtection,
  } = doubleCsrf({
    getSecret: () => "Secret", // 
    getSessionIdentifier: (req) => req.sessionID,
    getTokenFromRequest: (req) => req.body._csrf, 
  });

const store = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: 'mySessions'
  });
  
store.on('error', function(error) {
    console.log(error);
  });

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store
  }));

app.use(doubleCsrfProtection);
app.use(express.static(process.env.STATIC_FILES));

app.use(flash());

app.use('/', mainRouter);

exports.app = app;