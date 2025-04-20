import { API_BASE_URL } from '../config/api';

const userService = {
  // 用户注册
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || '注册失败');
      }
      return data;
    } catch (error) {
      console.error('注册错误:', error);
      throw error;
    }
  },

  // 用户登录
  async login(credentials) {
    try {
      if (!credentials.email || !credentials.password) {
        throw new Error('邮箱和密码不能为空');
      }

      console.log('发送登录请求到:', `${API_BASE_URL}/users/login`);
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log('登录响应状态:', response.status);
      console.log('登录响应数据:', data);

      if (!response.ok) {
        throw new Error(data.message || '登录失败');
      }

      if (!data.token) {
        throw new Error('登录失败：未收到token');
      }

      // 存储token
      localStorage.setItem('token', data.token);
      
      // 存储用户信息
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error('登录请求错误:', error);
      throw error;
    }
  },

  // 获取用户信息
  async getProfile() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('未登录');
      }

      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || '获取用户信息失败');
      }
      return data;
    } catch (error) {
      console.error('获取用户信息错误:', error);
      throw error;
    }
  },

  // 更新用户信息
  async updateProfile(profileData) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('未登录');
      }

      const response = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || '更新用户信息失败');
      }
      return data;
    } catch (error) {
      console.error('更新用户信息错误:', error);
      throw error;
    }
  },

  // 微信登录
  async wechatLogin() {
    // 重定向到微信授权页面
    window.location.href = API_BASE_URL + '/users/wechat-login';
  },

  // Google登录
  async googleLogin() {
    // 重定向到Google授权页面
    window.location.href = API_BASE_URL + '/users/google-login';
  },

  // 退出登录
  logout() {
    localStorage.removeItem('token');
  },

  // 申请角色
  async applyForRole(roleData) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('未登录');
      }

      const response = await fetch(`${API_BASE_URL}/users/roles/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(roleData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || '申请角色失败');
      }
      return data;
    } catch (error) {
      console.error('申请角色错误:', error);
      throw error;
    }
  },

  // 获取用户角色申请历史
  async getRoleApplications() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('未登录');
      }

      const response = await fetch(`${API_BASE_URL}/users/roles/applications`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || '获取角色申请历史失败');
      }
      return data;
    } catch (error) {
      console.error('获取角色申请历史错误:', error);
      throw error;
    }
  },

  // 获取用户可申请的角色列表
  async getAvailableRoles() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('未登录');
      }

      const response = await fetch(`${API_BASE_URL}/users/roles/available`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || '获取可用角色列表失败');
      }
      return data;
    } catch (error) {
      console.error('获取可用角色列表错误:', error);
      throw error;
    }
  }
};

export default userService; 