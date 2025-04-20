const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 验证Google token
const verifyGoogleToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    return ticket.getPayload();
  } catch (error) {
    throw new Error('Google token验证失败');
  }
};

// 处理谷歌登录
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // 验证token
    const payload = await verifyGoogleToken(token);
    const { sub, email, name, picture } = payload;

    // 查找或创建用户
    let user = await User.findOne({ googleId: sub });
    
    if (!user) {
      // 创建新用户
      user = new User({
        username: name,
        email,
        googleId: sub,
        avatar: picture,
        profile: {
          nickname: name
        }
      });
      await user.save();
    }

    // 生成JWT token
    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token: jwtToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 