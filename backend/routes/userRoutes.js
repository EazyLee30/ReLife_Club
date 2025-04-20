import express from 'express';
import { register, login, getProfile, updateProfile, wechatLogin, googleLogin } from '../controllers/userController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// 公开路由
router.post('/register', register);
router.post('/login', login);
router.post('/wechat-login', wechatLogin);
router.post('/google-login', googleLogin);

// 需要认证的路由
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router; 