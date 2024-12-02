const { doubleCsrf } = require("csrf-csrf");
const ShortUrl = require('../models/shortUrl');



exports.main = async function (req, res) {
    const shortUrls = await ShortUrl.find()
    const token = generateToken(req, res, true);
    
    return res.render("index", {shortUrls, 
        flash_msg: req.flash('flash-msg'), 
        your_url: req.flash('your-url'),
        token:  token
    })
}

exports.mini = async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.miniUrl })
    if (shortUrl === null) {
        console.log("such url doesnt exist");
        return res.json({"msg": "wrong url"});
    }
    shortUrl.clicks++
    await shortUrl.save();
    return res.redirect(shortUrl.full);
  };

exports.create = async (req, res) => {
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
    
  }