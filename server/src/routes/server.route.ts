import controller from 'controller';
import { Router } from 'express';
import permissionMiddleware from 'middleware/permission.middleware';
import s3 from 'services/aws/S3';

const router = Router();

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

export default router;
