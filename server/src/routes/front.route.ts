import { Router } from 'express';
import controller from 'controller';

const router = Router();

router.get('/*', controller.static.page);

export default router;
