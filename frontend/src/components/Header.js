import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Space } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import './Header.css';

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader className="app-header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="Relife Club" className="logo-img" />
            <span className="logo-text">Relife Club</span>
          </Link>
        </div>
        
        <Space className="header-actions">
          <Button type="text" icon={<HomeOutlined />}>
            <Link to="/">首页</Link>
          </Button>
          <Button type="text" icon={<UserOutlined />}>
            <Link to="/user-center">个人中心</Link>
          </Button>
        </Space>
      </div>
    </AntHeader>
  );
};

export default Header; 