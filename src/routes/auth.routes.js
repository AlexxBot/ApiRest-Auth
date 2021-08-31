import { Router } from 'express';
import { authJwt } from '../middlewares/index';


const router = Router()

import * as authController from '../controllers/auth.controller';

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/setUserName', [authJwt.verifyToken], authController.setUserName);


export default router;