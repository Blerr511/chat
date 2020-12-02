const controller = require('../controller');

const router = require('express').Router();

router.get('/*', controller.static.page);

module.exports = router;
