import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Card, Row, Col, Badge, Tag, Progress, Statistic } from 'antd';
import { EditOutlined, TrophyOutlined, TeamOutlined, StarOutlined } from '@ant-design/icons';
import type { UserProfile, UserBadge, UserRole } from '../types/user';
import './UserProfileEdit.css';

interface UserProfileEditProps {
  userProfile: UserProfile;
  onUpdate: (values: Partial<UserProfile>) => Promise<void>;
}

const UserProfileEdit: React.FC<UserProfileEditProps> = ({ userProfile, onUpdate }) => {
  const [form] = Form.useForm();
  const [isNicknameEditable, setIsNicknameEditable] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 检查昵称是否可以更新
    const lastUpdate = new Date(userProfile.lastNicknameUpdate);
    const now = new Date();
    const daysSinceLastUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 3600 * 24);
    setIsNicknameEditable(daysSinceLastUpdate >= 1);
  }, [userProfile.lastNicknameUpdate]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await onUpdate({
        ...values,
        lastNicknameUpdate: new Date().toISOString()
      });
      message.success('个人资料更新成功！');
    } catch (error) {
      message.error('更新失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const renderBadges = (badges: UserBadge[]) => {
    return badges.map(badge => (
      <Tag
        key={badge.id}
        color={badge.type === 'online' ? 'blue' : 'green'}
        icon={badge.type === 'online' ? <StarOutlined /> : <TeamOutlined />}
      >
        {badge.name}
      </Tag>
    ));
  };

  const renderRoles = (roles: UserRole[]) => {
    return roles.map(role => (
      <Badge key={role.id} count={role.badges.length}>
        <Tag color="purple" icon={<TrophyOutlined />}>
          {role.name}
        </Tag>
      </Badge>
    ));
  };

  const calculateNextLevel = () => {
    const currentLevel = userProfile.level;
    const pointsNeeded = Math.pow(2, currentLevel) * 1000;
    const progress = (userProfile.points / pointsNeeded) * 100;
    return { pointsNeeded, progress };
  };

  return (
    <div className="user-profile-edit">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Card title="基本信息" className="profile-card">
            <Form
              form={form}
              layout="vertical"
              initialValues={userProfile}
              onFinish={handleSubmit}
            >
              <Form.Item
                label="用户名"
                name="username"
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="昵称"
                name="nickname"
                extra={!isNicknameEditable && "昵称每24小时只能修改一次"}
              >
                <Input
                  disabled={!isNicknameEditable}
                  suffix={!isNicknameEditable && <EditOutlined style={{ color: '#ccc' }} />}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={!isNicknameEditable}
                >
                  保存修改
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="成就与角色" className="achievements-card">
            <div className="level-info">
              <h4>当前等级: {userProfile.level}</h4>
              <Progress
                percent={calculateNextLevel().progress}
                format={() => `${userProfile.points}/${calculateNextLevel().pointsNeeded}`}
              />
            </div>

            <div className="badges-section">
              <h4>获得的徽章</h4>
              <div className="badges-container">
                {renderBadges(userProfile.badges)}
              </div>
            </div>

            <div className="roles-section">
              <h4>担任的角色</h4>
              <div className="roles-container">
                {renderRoles(userProfile.roles)}
              </div>
            </div>

            <div className="contributions-section">
              <h4>贡献统计</h4>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Card size="small">
                    <Statistic title="课程" value={userProfile.contributions.courses} />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small">
                    <Statistic title="活动" value={userProfile.contributions.events} />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small">
                    <Statistic title="帖子" value={userProfile.contributions.posts} />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small">
                    <Statistic title="帮助他人" value={userProfile.contributions.helps} />
                  </Card>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfileEdit; 