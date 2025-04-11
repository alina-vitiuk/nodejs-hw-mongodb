import express from 'express';
import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  requestPasswordResetController,
  resetPasswordController,
  getOAuthUrlController,
  confirmOAuthController,
} from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerSchema,
  loginSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
  confirmOAuthSchema,
} from '../validation/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import cookieParser from 'cookie-parser';

const router = express.Router();

const jsonParser = express.json();

router.use(
  '/register',
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

router.use(
  '/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);

router.post('/logout', ctrlWrapper(logoutController));

router.post('/refresh', ctrlWrapper(refreshController));

router.post(
  '/send-reset-email',
  jsonParser,
  validateBody(requestPasswordResetSchema),
  ctrlWrapper(requestPasswordResetController),
);

router.post(
  '/reset-pwd',
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

router.get('/get-oauth-url', ctrlWrapper(getOAuthUrlController));

router.post(
  '/confirm-oauth',
  jsonParser,
  validateBody(confirmOAuthSchema),
  ctrlWrapper(confirmOAuthController),
);

router.use(cookieParser());

export default router;
