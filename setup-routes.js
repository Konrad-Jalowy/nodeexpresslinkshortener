
const mainRouter = require('./routes/mainRoutes');


function initialize(app){
    app.use('/', mainRouter);
};

module.exports = initialize;