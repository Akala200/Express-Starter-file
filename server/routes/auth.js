/* eslint-disable import/named */
import { Router } from 'express';
import AuthController from '../controllers/AuthController';


const router = Router();

const {
  manualLogin,
  generateAuthGoogleUrl,
  googleRedirect,
} = AuthController;

router.post('/manual/login', manualLogin);
router.post('/google/auth', generateAuthGoogleUrl);
router.get('/google/verification', googleRedirect);

export default router;
