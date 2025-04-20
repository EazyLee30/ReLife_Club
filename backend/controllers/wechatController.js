const axios = require('axios');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const WECHAT_CONFIG = {
  appId: process.env.WECHAT_APP_ID,
  appSecret: process.env.WECHAT_APP_SECRET
};

// 获取微信access_token
const getWechatAccessToken = async (code) => {
  try {
    const response = await axios.get('https://api.weixin.qq.com/sns/oauth2/access_token', {
      params: {
        appid: WECHAT_CONFIG.appId,
        secret: WECHAT_CONFIG.appSecret,
        code,
        grant_type: 'authorization_code'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('获取微信access_token失败');
  }
};

// 获取微信用户信息
const getWechatUserInfo = async (accessToken, openId) => {
  try {
    const response = await axios.get('https://api.weixin.qq.com/sns/userinfo', {
      params: {
        access_token: accessToken,
        openid: openId,
        lang: 'zh_CN'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('获取微信用户信息失败');
  }
};

// 处理微信登录
exports.wechatLogin = async (req, res) => {
  try {
    const { code } = req.body;

    // 获取access_token
    const { access_token, openid, unionid } = await getWechatAccessToken(code);

    // 获取用户信息
    const userInfo = await getWechatUserInfo(access_token, openid);

    // 查找或创建用户
    let user = await User.findOne({ wechatOpenId: openid });
    
    if (!user) {
      // 创建新用户
      user = new User({
        username: userInfo.nickname,
        email: `${openid}@wechat.com`, // 使用openid作为邮箱前缀
        wechatOpenId: openid,
        wechatUnionId: unionid,
        avatar: userInfo.headimgurl,
        profile: {
          nickname: userInfo.nickname,
          gender: userInfo.sex,
          location: `${userInfo.country} ${userInfo.province} ${userInfo.city}`
        }
      });
      await user.save();
    }

    // 生成JWT token
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
        email: user.email,
        avatar: user.avatar,
        profile: user.profile
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 