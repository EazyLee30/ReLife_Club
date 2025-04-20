const Post = require('../models/Post');
const User = require('../models/User');

// 获取帖子列表
exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name avatar')
      .populate('likes', 'name avatar')
      .populate('comments.user', 'name avatar');

    const total = await Post.countDocuments();

    res.json({
      posts,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: '获取帖子列表失败', error: error.message });
  }
};

// 发布新帖子
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const author = req.user._id;

    const post = new Post({
      content,
      author
    });

    await post.save();
    
    const populatedPost = await Post.findById(post._id)
      .populate('author', 'name avatar')
      .populate('likes', 'name avatar')
      .populate('comments.user', 'name avatar');

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: '发布帖子失败', error: error.message });
  }
};

// 点赞帖子
exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: '帖子不存在' });
    }

    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(likeIndex, 1);
    }

    await post.save();
    
    const updatedPost = await Post.findById(postId)
      .populate('author', 'name avatar')
      .populate('likes', 'name avatar')
      .populate('comments.user', 'name avatar');

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: '点赞操作失败', error: error.message });
  }
};

// 评论帖子
exports.commentPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: '帖子不存在' });
    }

    post.comments.push({
      user: userId,
      content
    });

    await post.save();
    
    const updatedPost = await Post.findById(postId)
      .populate('author', 'name avatar')
      .populate('likes', 'name avatar')
      .populate('comments.user', 'name avatar');

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: '评论失败', error: error.message });
  }
};

// 分享帖子
exports.sharePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: '帖子不存在' });
    }

    post.shares += 1;
    await post.save();
    
    const updatedPost = await Post.findById(postId)
      .populate('author', 'name avatar')
      .populate('likes', 'name avatar')
      .populate('comments.user', 'name avatar');

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: '分享失败', error: error.message });
  }
}; 