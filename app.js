const express = require('express');

const bodyParser = require('body-parser');
const ShortUrl = require('./models/shortUrl');
const app = express();
const mainController = require('./controllers/mainController');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const { doubleCsrf } = require("csrf-csrf");
const {
    invalidCsrfTokenError, // This is just for convenience if you plan on making your own middleware.
    generateToken, // Use this in your routes to provide a CSRF hash + token cookie and token.
    validateRequest, // Also a convenience if you plan on making your own middleware.
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
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: store
  }))
app.use(doubleCsrfProtection);
app.use(express.static('public'));
app.use(flash());
app.get("/", (req, res, next) => {
    res.locals.token = generateToken(req, res, true);
    next();
})
app.get('/', mainController.main);

app.get('/:miniUrl', mainController.mini);

app.post('/create', mainController.create);


exports.app = app;