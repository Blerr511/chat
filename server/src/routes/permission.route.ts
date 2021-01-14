import controller from 'controller';
import { Router } from 'express';

const router = Router();

router.get('/', controller.permission.getAllRoles);

router.get('/:role', controller.permission.getRolePermissions);

export default router;
