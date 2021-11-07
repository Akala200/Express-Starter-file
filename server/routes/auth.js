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
  resendCode,
} = AuthController;

router.post('/manual/login', manualLogin);
router.post('/google/auth', generateAuthGoogleUrl);
router.get('/google/verification', googleRedirect);
router.post('/forgot/password', forgetPassword);
router.post('/confirm/password', confirmPassword);
router.post('/resend/code', resendCode);

export default router;
