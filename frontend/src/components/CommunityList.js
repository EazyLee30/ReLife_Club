import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Input, Button, Avatar, Card, Space, Tag } from 'antd';
import { SearchOutlined, TeamOutlined, MessageOutlined } from '@ant-design/icons';
import './Community.css';

const { Search } = Input;

const CommunityList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // 模拟社区数据
  const communities = [
    {
      id: 1,
      name: '退休生活交流',
      description: '分享退休生活经验，交流养生心得',
      memberCount: 128,
      lastMessage: {
        content: '今天天气真好，大家有什么活动安排吗？',
        time: '10:30',
        sender: '张阿姨'
      }
    },
    {
      id: 2,
      name: '健康养生群',
      description: '分享健康饮食和运动经验',
      memberCount: 256,
      lastMessage: {
        content: '推荐一个很好的养生食谱...',
        time: '09:15',
        sender: '李叔叔'
      }
    },
    {
      id: 3,
      name: '兴趣爱好交流',
      description: '书法、绘画、摄影等艺术交流',
      memberCount: 89,
      lastMessage: {
        content: '分享一张最近画的山水画',
        time: '昨天',
        sender: '王老师'
      }
    }
  ];

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCommunityClick = (communityId) => {
    navigate(`/communities/${communityId}`);
  };

  return (
    <div className="community-list-container">
      <div className="community-list-header">
        <h2>社区列表</h2>
        <Button type="primary" icon={<TeamOutlined />}>
          创建社区
        </Button>
      </div>

      <Search
        placeholder="搜索社区"
        allowClear
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginBottom: 24 }}
      />

      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={filteredCommunities}
        renderItem={community => (
          <List.Item>
            <Card
              hoverable
              onClick={() => handleCommunityClick(community.id)}
              className="community-item"
            >
              <Card.Meta
                avatar={<Avatar size="large" icon={<TeamOutlined />} />}
                title={community.name}
                description={
                  <Space direction="vertical">
                    <div>{community.description}</div>
                    <div className="community-meta">
                      <Tag icon={<TeamOutlined />}>{community.memberCount} 成员</Tag>
                      <div className="last-message">
                        <MessageOutlined /> {community.lastMessage.sender}: {community.lastMessage.content}
                      </div>
                    </div>
                  </Space>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CommunityList; 