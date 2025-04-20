import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, WechatOutlined } from '@ant-design/icons';
import GoogleLogin from './GoogleLogin';
import WechatLogin from './WechatLogin';
import userService from '../services/userService';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await userService.login({
        email: values.email,
        password: values.password
      });
      message.success('登录成功');
      navigate('/news');
    } catch (error) {
      message.error('登录失败：' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h2>登录</h2>
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="邮箱" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              登录
            </Button>
          </Form.Item>
        </Form>

        <Divider>其他登录方式</Divider>

        <div className="third-party-login">
          <GoogleLogin />
          <WechatLogin />
        </div>

        <div className="login-links">
          <a href="/register">注册新账号</a>
          <a href="/forgot-password">忘记密码？</a>
        </div>
      </Card>
    </div>
  );
};

export default Login; 