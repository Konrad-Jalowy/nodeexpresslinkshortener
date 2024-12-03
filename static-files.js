const express = require('express');

function initialize(app){
    app.use(express.static(process.env.STATIC_FILES));
};

module.exports = initialize;