export const WECHAT_CONFIG = {
  appId: 'YOUR_WECHAT_APP_ID',
  redirectUri: 'http://localhost:3000/auth/wechat/callback',
  scope: 'snsapi_login',
  state: 'wechat_login',
  style: 'black',
  href: ''
};

export const GOOGLE_CONFIG = {
  clientId: 'YOUR_GOOGLE_CLIENT_ID',
  redirectUri: 'http://localhost:3000/auth/google/callback',
  scope: 'profile email',
  state: 'google_login'
}; 