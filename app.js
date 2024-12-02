const express = require('express');

const bodyParser = require('body-parser');
const ShortUrl = require('./models/shortUrl');
const app = express();

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
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
app.use(flash());
app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    return res.render("index", {shortUrls, 
        flash_msg: req.flash('flash-msg'), 
        your_url: req.flash('your-url') 
    });
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
        req.flash("flash-msg", "URL already exists");
        req.flash("your-url", `http://localhost:3005/${exists.short}`);
        return res.redirect("/");
    }
    let created = await ShortUrl.create({ full: req.body.fullUrl })
    req.flash("flash-msg", "Short URL has been created");
    req.flash("your-url", `http://localhost:3005/${created.short}`);
    return res.redirect("/");
    
  })
  

module.exports = app;