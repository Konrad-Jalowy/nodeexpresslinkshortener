const { doubleCsrf } = require("csrf-csrf");
const ShortUrl = require('../models/shortUrl');

const {
    generateToken, 
  } = doubleCsrf({
    getSecret: () => "Secret", // 
    getSessionIdentifier: (req) => req.sessionID,
    getTokenFromRequest: (req) => req.body._csrf, 
  });

exports.main = async (req, res) => {
    const shortUrls = await ShortUrl.find()
    const token = generateToken(req, res, true);
    
    return res.render("index", {shortUrls, 
        flash_msg: req.flash('flash-msg'), 
        your_url: req.flash('your-url'),
        flash_cls: req.flash('flash-cls'),
        token:  token
    });
}

exports.mini = async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.miniUrl })
    if (shortUrl === null) {
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
        req.flash("flash-cls", `flash-error`);
        return res.redirect("/");
    }
    let created = await ShortUrl.create({ full: req.body.fullUrl })
    req.flash("flash-msg", "Short URL has been created");
    req.flash("your-url", `http://localhost:3005/${created.short}`);
    req.flash("flash-cls", `flash-success`);
    return res.redirect("/");
    
  }