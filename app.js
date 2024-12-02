const express = require('express');

const bodyParser = require('body-parser');
const ShortUrl = require('./models/shortUrl');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
    let created = await ShortUrl.create({ full: req.body.fullUrl })
    return res.send({"created": created});
    
  })
  

module.exports = app;