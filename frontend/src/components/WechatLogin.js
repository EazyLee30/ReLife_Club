import React, { useEffect } from 'react';
import { WECHAT_CONFIG } from '../config/oauth';

const WechatLogin = () => {
  useEffect(() => {
    // 加载微信登录JS
    const script = document.createElement('script');
    script.src = 'https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // 初始化微信登录
      if (window.WxLogin) {
        new window.WxLogin({
          self_redirect: true,
          id: 'wechat-login-container',
          appid: WECHAT_CONFIG.appId,
          scope: WECHAT_CONFIG.scope,
          redirect_uri: encodeURIComponent(WECHAT_CONFIG.redirectUri),
          state: WECHAT_CONFIG.state,
          style: WECHAT_CONFIG.style,
          href: WECHAT_CONFIG.href
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="wechat-login">
      <div id="wechat-login-container" style={{ width: '300px', height: '300px' }}></div>
    </div>
  );
};

export default WechatLogin; 