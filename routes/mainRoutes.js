const express = require('express');

const mainController = require('../controllers/mainController');

const router = express.Router();

router.get('/', mainController.main);

router.get('/:miniUrl', mainController.mini);

router.post('/create', mainController.create);

module.exports = router;