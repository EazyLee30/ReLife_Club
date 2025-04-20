export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001/api';

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}/users/register`,
  login: `${API_BASE_URL}/users/login`,
  profile: `${API_BASE_URL}/users/profile`,
  wechatLogin: `${API_BASE_URL}/users/wechat-login`,
  googleLogin: `${API_BASE_URL}/users/google-login`,
  activities: `${API_BASE_URL}/activities`
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}; 