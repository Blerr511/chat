const controller = require('../controller');

const router = require('express').Router();

router.get('/', controller.room.getRooms);

module.exports = router;
