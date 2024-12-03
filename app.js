const express = require('express');

const app = express();

const initializeTemplatingEngine = require('./templating-engine');
const setuptStaticFiles = require("./static-files");
const setupFlashMessages = require("./flash-messages");
const setupBodyParser = require("./bodyparser-setup");
const setupCookieParser = require('./cookieparser-setup');
const setupRoutes = require('./setup-routes');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);



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


initializeTemplatingEngine(app);

setupBodyParser(app);

setupCookieParser(app);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store
  }));

app.use(doubleCsrfProtection);

setuptStaticFiles(app);
setupFlashMessages(app);
setupRoutes(app);


exports.app = app;