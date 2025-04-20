const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

// 获取帖子列表
router.get('/', postController.getPosts);

// 发布新帖子
router.post('/', auth, postController.createPost);

// 点赞帖子
router.post('/:id/like', auth, postController.likePost);

// 评论帖子
router.post('/:id/comment', auth, postController.commentPost);

// 分享帖子
router.post('/:id/share', auth, postController.sharePost);

module.exports = router; 