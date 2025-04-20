import axios from 'axios';

const VOICE_CHAT_API = 'http://localhost:8080/api';

// 创建频道
export const createChannel = async (name, description, isPrivate = false) => {
  try {
    const response = await axios.post(`${VOICE_CHAT_API}/channel/create`, {
      name,
      description,
      is_private: isPrivate
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('vocechat_token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('创建频道失败:', error);
    throw error;
  }
};

// 获取频道列表
export const getChannels = async () => {
  try {
    const response = await axios.get(`${VOICE_CHAT_API}/channel/list`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('vocechat_token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('获取频道列表失败:', error);
    throw error;
  }
};

// 加入频道
export const joinChannel = async (channelId) => {
  try {
    const response = await axios.post(`${VOICE_CHAT_API}/channel/join`, {
      channel_id: channelId
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('vocechat_token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('加入频道失败:', error);
    throw error;
  }
};

// 获取用户信息
export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${VOICE_CHAT_API}/user/info`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('vocechat_token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    throw error;
  }
};

// SSO 登录
export const ssoLogin = async (userId, username, avatar) => {
  try {
    const response = await axios.post(`${VOICE_CHAT_API}/auth/sso`, {
      user_id: userId,
      username,
      avatar,
      platform: 'relife'
    });
    const { token } = response.data;
    localStorage.setItem('vocechat_token', token);
    return token;
  } catch (error) {
    console.error('SSO 登录失败:', error);
    throw error;
  }
}; 