import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col, Avatar, Tabs, Badge, List, Button, Tag, Statistic, Empty, Modal, Input, message, Tooltip, Alert } from 'antd';
import { 
  UserOutlined, 
  TrophyOutlined, 
  TeamOutlined, 
  BookOutlined, 
  WalletOutlined, 
  PlusOutlined,
  EditOutlined,
  CrownOutlined,
  StarOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import userService from '../services/userService';
import './UserCenter.css';

const { TabPane } = Tabs;

const UserCenter = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNicknameModalVisible, setIsNicknameModalVisible] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const [canUpdateNickname, setCanUpdateNickname] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getProfile();
      setUserData(data);
      // 检查是否可以更新昵称
      if (data.profile?.lastNicknameUpdate) {
        const lastUpdate = new Date(data.profile.lastNicknameUpdate);
        const now = new Date();
        const diffHours = Math.floor((now - lastUpdate) / (1000 * 60 * 60));
        setCanUpdateNickname(diffHours >= 24);
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
      setError(error.message || '无法加载用户信息，请检查网络连接');
      message.error('获取用户信息失败：' + (error.message || '请检查网络连接'));
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchUserData();
  };

  const handleNicknameUpdate = async () => {
    if (!newNickname.trim()) {
      message.error('昵称不能为空');
      return;
    }

    try {
      await userService.updateProfile({
        profile: {
          ...userData.profile,
          nickname: newNickname,
          lastNicknameUpdate: new Date()
        }
      });
      message.success('昵称更新成功');
      setIsNicknameModalVisible(false);
      fetchUserData(); // 刷新用户数据
    } catch (error) {
      message.error('昵称更新失败: ' + error.message);
    }
  };

  const getRoleTag = (role) => {
    const roleConfig = {
      user: { color: 'blue', icon: <UserOutlined />, text: '普通用户' },
      instructor: { color: 'green', icon: <StarOutlined />, text: '讲师' },
      organizer: { color: 'orange', icon: <CrownOutlined />, text: '组织者' },
      admin: { color: 'red', icon: <TrophyOutlined />, text: '管理员' }
    };
    const config = roleConfig[role] || roleConfig.user;
    return (
      <Tag color={config.color} icon={config.icon}>
        {config.text}
      </Tag>
    );
  };

  const getBadgeTooltip = (badge) => {
    const badgeConfig = {
      instructor: '课程讲师',
      organizer: '活动组织者',
      volunteer: '志愿者',
      expert: '领域专家'
    };
    return badgeConfig[badge] || badge;
  };

  if (loading) {
    return (
      <div className="user-center">
        <Card loading={true}>
          <div style={{ padding: '20px', textAlign: 'center' }}>加载中...</div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-center">
        <Card>
          <Alert
            message="加载失败"
            description={error}
            type="error"
            showIcon
            action={
              <Button 
                icon={<ReloadOutlined />} 
                onClick={handleRetry}
                type="primary"
              >
                重试
              </Button>
            }
          />
        </Card>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="user-center">
        <Card>
          <Empty
            description="暂无用户数据"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" onClick={handleRetry}>刷新</Button>
          </Empty>
        </Card>
      </div>
    );
  }

  return (
    <div className="user-center">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <div className="user-profile-header">
              <Avatar size={64} src={userData.avatar} icon={<UserOutlined />} />
              <div className="user-info">
                <div className="nickname-section">
                  <h2>
                    {userData.profile?.nickname || userData.username}
                    <Tooltip title={canUpdateNickname ? '修改昵称' : '每24小时只能修改一次昵称'}>
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => setIsNicknameModalVisible(true)}
                        disabled={!canUpdateNickname}
                      />
                    </Tooltip>
                  </h2>
                </div>
                <div className="user-roles">
                  {userData.role && getRoleTag(userData.role)}
                  {userData.profile?.badges?.map((badge, index) => (
                    <Tooltip key={index} title={getBadgeTooltip(badge)}>
                      <Badge
                        count={badge}
                        style={{
                          backgroundColor: '#52c41a',
                          marginLeft: '8px'
                        }}
                      />
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Statistic title="等级" value={userData.stats?.level || 1} />
              </Col>
              <Col span={6}>
                <Statistic title="积分" value={userData.stats?.points || 0} />
              </Col>
              <Col span={6}>
                <Statistic title="课程" value={userData.stats?.coursesCreated || 0} />
              </Col>
              <Col span={6}>
                <Statistic title="活动" value={userData.stats?.activitiesParticipated || 0} />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <TeamOutlined />
                    我的社区
                  </span>
                }
                key="1"
              >
                <div className="section-header">
                  <h3>我加入的社区</h3>
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/communities/create')}>
                    创建社区
                  </Button>
                </div>
                {userData.communities?.length > 0 ? (
                  <List
                    dataSource={userData.communities}
                    renderItem={community => (
                      <List.Item
                        actions={[
                          <Button type="link" onClick={() => navigate(`/communities/${community._id}`)}>
                            进入社区
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          title={community.name}
                          description={community.description}
                        />
                      </List.Item>
                    )}
                  />
                ) : (
                  <Empty description="还没有加入任何社区">
                    <Button type="primary" onClick={() => navigate('/communities')}>
                      浏览社区
                    </Button>
                  </Empty>
                )}
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <BookOutlined />
                    我的课程
                  </span>
                }
                key="2"
              >
                <div className="section-header">
                  <h3>我的课程</h3>
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/courses/create')}>
                    创建课程
                  </Button>
                </div>
                {userData.courses?.length > 0 ? (
                  <List
                    dataSource={userData.courses}
                    renderItem={course => (
                      <List.Item
                        actions={[
                          <Button type="link" onClick={() => navigate(`/courses/${course._id}`)}>
                            继续学习
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          title={course.title}
                          description={course.description}
                        />
                      </List.Item>
                    )}
                  />
                ) : (
                  <Empty description="还没有参加任何课程">
                    <Button type="primary" onClick={() => navigate('/courses')}>
                      浏览课程
                    </Button>
                  </Empty>
                )}
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <TrophyOutlined />
                    我的活动
                  </span>
                }
                key="3"
              >
                <div className="section-header">
                  <h3>我的活动</h3>
                  <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/activities/create')}>
                    创建活动
                  </Button>
                </div>
                {userData.activities?.length > 0 ? (
                  <List
                    dataSource={userData.activities}
                    renderItem={activity => (
                      <List.Item
                        actions={[
                          <Button type="link" onClick={() => navigate(`/activities/${activity._id}`)}>
                            查看详情
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          title={activity.title}
                          description={`角色: ${activity.role} | 状态: ${activity.status}`}
                        />
                      </List.Item>
                    )}
                  />
                ) : (
                  <Empty description="还没有参加任何活动">
                    <Button type="primary" onClick={() => navigate('/activities')}>
                      浏览活动
                    </Button>
                  </Empty>
                )}
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <WalletOutlined />
                    我的钱包
                  </span>
                }
                key="4"
              >
                <div className="wallet-info">
                  <Statistic title="余额" value={userData.wallet?.balance || 0} prefix="¥" />
                  <div className="wallet-actions">
                    <Button type="primary" onClick={() => navigate('/wallet/deposit')}>
                      充值
                    </Button>
                    <Button onClick={() => navigate('/wallet/transactions')}>
                      交易记录
                    </Button>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>

      <Modal
        title="修改昵称"
        visible={isNicknameModalVisible}
        onOk={handleNicknameUpdate}
        onCancel={() => setIsNicknameModalVisible(false)}
      >
        <p style={{ marginBottom: 16 }}>
          {canUpdateNickname ? 
            '请输入新的昵称（每24小时只能修改一次）' : 
            '今天已经修改过昵称了，请24小时后再试'
          }
        </p>
        <Input
          placeholder="请输入新昵称"
          value={newNickname}
          onChange={e => setNewNickname(e.target.value)}
          disabled={!canUpdateNickname}
        />
      </Modal>
    </div>
  );
};

export default UserCenter; 