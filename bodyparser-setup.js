const bodyParser = require('body-parser');

function initialize(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
};

module.exports = initialize;