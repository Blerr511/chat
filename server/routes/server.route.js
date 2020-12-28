const router = require('express').Router();

const s3 = require('../services/aws/S3');

const permissionMiddleware = require('../middleware/permission.middleware');
const controller = require('../controller');

router.get('/', controller.server.getMyServers);

router.put('/', s3.upload.single('serverIcon'), controller.server.create);

router.post('/:serverId/join', controller.server.joinServer);

/**
 * @todo socket not joined to room after create
 */
router.post(
    '/:serverId/newRoom',
    permissionMiddleware('createRoom', (req) => req.params.serverId),
    controller.server.addRoom
);

/**
 * @todo socket not joined to room after create
 */
router.post(
    '/:serverId/newRtcRoom',
    permissionMiddleware('createRoom', (req) => req.params.serverId),
    controller.server.addRTCRoom
);

router.post('/:serverId/:roomId/join', controller.server.joinRoom);

router.post('/:serverId/:roomId/leave', controller.server.leaveRoom);

module.exports = router;
