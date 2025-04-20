import React from 'react';
import { Layout, List, Avatar } from 'antd';
import './Community.css';

const { Content } = Layout;

const Community = () => {
  const channels = [
    {
      id: 'retirement-life',
      name: '退休生活交流',
      description: '欢迎来到 退休生活交流 频道',
      members: 1,
      icon: '退'
    },
    {
      id: 'health-care',
      name: '健康养生好交流',
      description: '欢迎来到 健康养生好交流 频道',
      members: 0,
      icon: '健'
    },
    {
      id: 'hobbies',
      name: '兴趣爱好交流',
      description: '欢迎来到 兴趣爱好交流 频道',
      members: 0,
      icon: '趣'
    }
  ];

  const handleChannelSelect = (channel) => {
    // 直接跳转到 VoceChat 的对应频道
    window.location.href = `http://localhost:8080/group/${channel.id}`;
  };

  return (
    <Layout className="community-layout">
      <Content className="community-content">
        <div className="community-header">
          <h1>社区交流</h1>
          <p>选择一个频道开始交流</p>
        </div>
        <List
          className="channel-list-container"
          dataSource={channels}
          renderItem={channel => (
            <List.Item
              className="community-item"
              onClick={() => handleChannelSelect(channel)}
            >
              <List.Item.Meta
                avatar={
                  <Avatar className="channel-avatar">
                    {channel.icon}
                  </Avatar>
                }
                title={channel.name}
                description={
                  <div className="channel-description">
                    <div>{channel.description}</div>
                    <small>{channel.members} 成员</small>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default Community; 