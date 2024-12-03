const cookieParser = require('cookie-parser');

function initialize(app){
    app.use(cookieParser());
};

module.exports = initialize;