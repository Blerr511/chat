import controller from "controller";
import { Router } from "express";

const router = Router();

router.post('/', controller.auth.signIn);

export default router;
