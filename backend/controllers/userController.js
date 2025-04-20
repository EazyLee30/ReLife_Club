import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Activity from '../models/Activity.js';

// 注册
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 检查用户是否已存在
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '该邮箱已被注册' });
    }

    // 创建新用户
    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    // 生成 JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ message: '注册失败，请稍后重试' });
  }
};

// 登录
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: '邮箱和密码不能为空' });
    }

    // 查找用户
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '用户不存在' });
    }

    // 验证密码
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: '密码错误' });
    }

    // 生成 JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ 
      message: '登录失败，请稍后重试',
      error: error.message 
    });
  }
};

// 获取用户信息
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    console.error('获取用户信息错误:', error);
    res.status(500).json({ message: '获取用户信息失败' });
  }
};

// 更新用户信息
export const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user.userId);

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();
    res.json({ message: '用户信息更新成功' });
  } catch (error) {
    console.error('更新用户信息错误:', error);
    res.status(500).json({ message: '更新用户信息失败' });
  }
};

// 微信登录
export const wechatLogin = async (req, res) => {
  try {
    const { code } = req.body;
    // 这里需要实现微信登录的具体逻辑
    res.status(501).json({ message: '微信登录功能尚未实现' });
  } catch (error) {
    console.error('微信登录错误:', error);
    res.status(500).json({ message: '微信登录失败' });
  }
};

// Google登录
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    // 这里需要实现Google登录的具体逻辑
    res.status(501).json({ message: 'Google登录功能尚未实现' });
  } catch (error) {
    console.error('Google登录错误:', error);
    res.status(500).json({ message: 'Google登录失败' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateNickname = async (req, res) => {
  const { userId, newNickname } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const now = new Date();
    if (user.lastNicknameUpdate && (now - user.lastNicknameUpdate) < 24 * 60 * 60 * 1000) {
      return res.status(400).json({ message: 'Nickname can only be updated once per day' });
    }
    user.nickname = newNickname;
    user.lastNicknameUpdate = now;
    await user.save();
    res.json({ message: 'Nickname updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 参与活动
export const joinActivity = async (req, res) => {
  try {
    const { activityId, role } = req.body;
    const user = await User.findById(req.user.userId);
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ message: '活动不存在' });
    }

    if (!activity.canJoin()) {
      return res.status(400).json({ message: '活动已满或已结束' });
    }

    // 检查用户是否已参与
    const existingParticipant = activity.participants.find(
      p => p.user.toString() === user._id.toString()
    );

    if (existingParticipant) {
      return res.status(400).json({ message: '您已参与此活动' });
    }

    // 添加参与者
    activity.participants.push({
      user: user._id,
      status: 'pending'
    });

    // 更新用户活动记录
    user.activities.push({
      activityId: activity._id,
      role,
      status: 'pending'
    });

    await Promise.all([activity.save(), user.save()]);

    res.json({ message: '成功申请参与活动' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 更新用户角色
export const updateRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    user.role = role;
    await user.save();

    res.json({ message: '用户角色更新成功', role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 添加用户徽章
export const addBadge = async (req, res) => {
  try {
    const { userId, badge } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    if (!user.profile.badges.includes(badge)) {
      user.profile.badges.push(badge);
      await user.save();
    }

    res.json({ message: '徽章添加成功', badges: user.profile.badges });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 