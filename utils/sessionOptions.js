sessionOptions = {
    
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: store
      
};
module.exports = sessionOptions;