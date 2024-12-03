const flash = require('connect-flash');

function initialize(app){
    app.use(flash());
};

module.exports = initialize;