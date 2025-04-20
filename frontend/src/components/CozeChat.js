import React, { useEffect, useRef } from 'react';
import './CozeChat.css';

const CozeChat = () => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Load Coze SDK script
    const script = document.createElement('script');
    script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/cn/index.js';
    script.async = true;
    script.onload = () => {
      // Initialize Coze Web SDK after script is loaded
      new window.CozeWebSDK.WebChatClient({
        config: {
          bot_id: '7489797975750131722',
        },
        componentProps: {
          title: 'ReLife AI 助手',
          theme: {
            primaryColor: '#4d53e8', // Match your app's theme
            backgroundColor: '#ffffff',
          },
          container: chatContainerRef.current,
        },
        auth: {
          type: 'token',
          token: 'pat_MM44nlhmNH2tczbAX7nQYFGPt1RGgZSboJDN5c1xpSTTeAXN75WBqNxUJOkCFj9d',
          onRefreshToken: function () {
            return 'pat_MM44nlhmNH2tczbAX7nQYFGPt1RGgZSboJDN5c1xpSTTeAXN75WBqNxUJOkCFj9d';
          }
        }
      });
    };
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      ref={chatContainerRef}
      className="coze-chat-container"
    />
  );
};

export default CozeChat; 