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
app.get('/faker', async (req, res) => {
    const newUrl = await ShortUrl.create({full: "https://www.google.com"});
    return res.json({"created": newUrl});
    res.render("index");
  });
  

module.exports = app;