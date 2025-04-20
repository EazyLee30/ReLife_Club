import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  reviewParticipant,
  completeActivity
} from '../controllers/activityController.js';

const router = express.Router();

// 获取活动列表
router.get('/', getActivities);

// 获取活动详情
router.get('/:id', getActivity);

// 需要认证的路由
router.post('/', auth, createActivity);
router.put('/:id', auth, updateActivity);
router.post('/review', auth, reviewParticipant);
router.post('/:id/complete', auth, completeActivity);

export default router; 