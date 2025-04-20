import React, { useState } from 'react';
import { Layout, Card, Button, Space } from 'antd';
import { MessageOutlined, CloseOutlined } from '@ant-design/icons';
import './AIHelper.css';

const { Content } = Layout;

const AIHelper = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  const closeChat = (e) => {
    e.stopPropagation();
    setIsChatVisible(false);
  };

  const iframeContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { margin: 0; padding: 0; }
          #coze-chat { height: 100vh; width: 100%; }
        </style>
      </head>
      <body>
        <div id="coze-chat"></div>
        <script src="https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/cn/index.js"></script>
        <script>
          new CozeWebSDK.WebChatClient({
            config: {
              bot_id: '7489797975750131722',
            },
            componentProps: {
              title: 'ReLife AI 助手',
              position: 'right',
              width: '100%',
              height: '100%',
            },
            auth: {
              type: 'token',
              token: 'pat_MM44nlhmNH2tczbAX7nQYFGPt1RGgZSboJDN5c1xpSTTeAXN75WBqNxUJOkCFj9d',
              onRefreshToken: function () {
                return 'pat_MM44nlhmNH2tczbAX7nQYFGPt1RGgZSboJDN5c1xpSTTeAXN75WBqNxUJOkCFj9d';
              }
            }
          });
        </script>
      </body>
    </html>
  `;

  return (
    <Layout className="ai-helper-layout">
      <Content className="ai-helper-content">
        <Card className="ai-helper-card">
          <div className="ai-helper-header">
            <h1>AI 助手</h1>
            <p>我是您的专属退休生活顾问，可以为您提供退休规划、健康管理、兴趣爱好推荐等服务。</p>
            <Space>
              <Button
                type={isChatVisible ? "default" : "primary"}
                icon={<MessageOutlined />}
                onClick={toggleChat}
                className="chat-button"
              >
                {isChatVisible ? '最小化对话' : '开始对话'}
              </Button>
              {isChatVisible && (
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={closeChat}
                  className="close-button"
                >
                  关闭
                </Button>
              )}
            </Space>
          </div>
          <div className="ai-helper-description">
            <h2>我能为您提供以下服务：</h2>
            <ul>
              <li>退休生活规划建议</li>
              <li>健康管理指导</li>
              <li>兴趣爱好推荐</li>
              <li>社交活动建议</li>
              <li>心理健康支持</li>
            </ul>
          </div>
        </Card>
      </Content>
      <div className={`chat-iframe-container ${isChatVisible ? 'visible' : ''}`}>
        <iframe
          srcDoc={iframeContent}
          className="chat-iframe"
          title="AI Chat"
          allow="microphone"
        />
      </div>
    </Layout>
  );
};

export default AIHelper; 