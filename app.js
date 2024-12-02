const express = require('express');

const bodyParser = require('body-parser');
const ShortUrl = require('./models/shortUrl');
const app = express();

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');

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

app.use(express.static('public'));

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    return res.render("index", {shortUrls});
});

app.get('/:miniUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.miniUrl })
    if (shortUrl === null) {
        console.log("such url doesnt exist");
        return res.json({"msg": "wrong url"});
    }
    shortUrl.clicks++
    await shortUrl.save();
    return res.redirect(shortUrl.full);
  });

app.post('/create', async (req, res) => {
    let exists = await ShortUrl.findOne({full: req.body.fullUrl});
    if(exists !== null){
        return res.json({"msg": "url already exists", "url": exists.short});
    }
    let created = await ShortUrl.create({ full: req.body.fullUrl })
    return res.redirect("/");
    
  })
  

module.exports = app;