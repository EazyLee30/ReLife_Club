import React, { useEffect } from 'react';
import { GOOGLE_CONFIG } from '../config/oauth';

const GoogleLogin = () => {
  useEffect(() => {
    // 加载Google登录JS
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CONFIG.clientId,
          callback: handleGoogleResponse,
          auto_select: false,
          cancel_on_tap_outside: true
        });

        window.google.accounts.id.renderButton(
          document.getElementById('google-login-container'),
          { theme: 'outline', size: 'large' }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleResponse = (response) => {
    // 处理Google登录响应
    console.log('Google login response:', response);
    // 这里可以调用后端API处理登录
  };

  return (
    <div className="google-login">
      <div id="google-login-container"></div>
    </div>
  );
};

export default GoogleLogin; 