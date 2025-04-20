import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Avatar, Button, Badge, Space } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  TrophyOutlined,
  BookOutlined,
  WalletOutlined,
  UserOutlined,
  LogoutOutlined,
  RobotOutlined,
  FireOutlined,
  LoginOutlined
} from '@ant-design/icons';
import userService from '../services/userService';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    userService.logout();
    navigate('/login');
  };

  const menuItems = [
    {
      key: 'news',
      icon: <HomeOutlined />,
      label: '新鲜事',
      onClick: () => navigate('/news')
    },
    {
      key: 'ai',
      icon: <RobotOutlined />,
      label: 'AI助手',
      onClick: () => navigate('/ai')
    },
    {
      key: 'courses',
      icon: <BookOutlined />,
      label: '课程',
      onClick: () => navigate('/courses')
    },
    {
      key: 'communities',
      icon: <TeamOutlined />,
      label: '社区',
      onClick: () => navigate('/communities')
    },
    {
      key: 'events',
      icon: <FireOutlined />,
      label: '活动',
      onClick: () => navigate('/events')
    },
    {
      key: 'wallet',
      icon: <WalletOutlined />,
      label: '钱包',
      onClick: () => navigate('/wallet')
    }
  ];

  const userMenuItems = token ? [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
      onClick: () => navigate('/user-center')
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout
    }
  ] : [
    {
      key: 'login',
      icon: <LoginOutlined />,
      label: '登录',
      onClick: () => navigate('/login')
    }
  ];

  return (
    <Header className="navbar">
      <div className="logo" onClick={() => navigate('/')}>
        ReLife Club
      </div>
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname.split('/')[1] || 'home']}
        items={menuItems}
        className="nav-menu"
      />
      <div className="user-section">
        {token ? (
          <>
            <Badge count={5} offset={[-5, 5]}>
              <Avatar icon={<UserOutlined />} />
            </Badge>
            <Menu
              mode="horizontal"
              items={userMenuItems}
              className="user-menu"
            />
          </>
        ) : (
          <Space>
            <Button type="text" icon={<LoginOutlined />} onClick={() => navigate('/login')}>
              登录
            </Button>
            <Button type="primary" onClick={() => navigate('/register')}>
              注册
            </Button>
          </Space>
        )}
      </div>
    </Header>
  );
};

export default Navbar; 