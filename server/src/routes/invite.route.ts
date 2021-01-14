import { Router } from 'express';
import controller from 'controller';

const router = Router();

router.post('/generate', controller.token.generate);

router.get('/check', controller.token.check);

export default router;
