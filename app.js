const express = require('express');

const bodyParser = require('body-parser');
const ShortUrl = require('./models/shortUrl');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render("index");
});
app.get('/:miniUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.miniUrl })
    if (shortUrl === null) {
        console.log("such url doesnt exist");
        return res.json({"msg": "wrong url"});
    }
    return res.json({"your_url": shortUrl});
  });
app.get('/faker', async (req, res) => {
    const newUrl = await ShortUrl.create({full: "https://www.google.com"});
    return res.json({"created": newUrl});
    res.render("index");
  });
  

module.exports = app;