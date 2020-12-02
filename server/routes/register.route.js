const controller = require('../controller');

const router = require('express').Router();

module.exports = router.post('/', controller.auth.signUp);
