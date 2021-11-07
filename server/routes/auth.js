/* eslint-disable import/named */
import { Router } from 'express';
import AuthController from '../controllers/AuthController';


const router = Router();

const {
  manualLogin,
  generateAuthGoogleUrl,
  googleRedirect,
  forgetPassword,
  confirmPassword,
} = AuthController;

router.post('/manual/login', manualLogin);
router.post('/google/auth', generateAuthGoogleUrl);
router.get('/google/verification', googleRedirect);
router.post('/forgot/password', forgetPassword);
router.post('/confirm/password', confirmPassword);

export default router;
