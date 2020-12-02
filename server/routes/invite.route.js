const controller = require('../controller');

const router = require('express').Router();

router.post('/generate', controller.token.generate);

router.get('/check', controller.token.check);

module.exports = router;
