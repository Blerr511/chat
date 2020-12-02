const controller = require('../controller');

const router = require('express').Router();

router.post('/', controller.auth.signIn);

module.exports = router;
