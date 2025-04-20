import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';
const API_URL = 'https://api.coze.cn/v3/chat';
const WS_URL = 'wss://api.coze.cn/v3/chat/ws';
const API_TOKEN = 'Bearer pat_MM44nlhmNH2tczbAX7nQYFGPt1RGgZSboJDN5c1xpSTTeAXN75WBqNxUJOkCFj9d';
const BOT_ID = '7489797975750131722';
const USER_ID = '7441839724769296418';
const MAX_RETRIES = 10;
const POLL_INTERVAL = 2000; // 2 seconds

// 预设的回复 - 作为备用和快速响应
const PRESET_RESPONSES = {
  '你好': '你好！我是 ReLife AI 助手，很高兴为您服务。我可以帮您规划退休生活、提供健康建议、推荐兴趣活动等。请问有什么我可以帮您的吗？',
  '介绍': '我是您的专属退休生活顾问，可以为您提供以下服务：\n1. 退休生活规划\n2. 健康管理建议\n3. 兴趣爱好推荐\n4. 社交活动建议\n5. 心理健康咨询\n请告诉我您感兴趣的方面，我会为您提供专业的建议。',
  'default': '好的，我明白了。让我为您详细分析一下这个问题...'
};

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error);
  if (error.response) {
    // Server responded with error
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
    throw new Error(error.response.data.message || 'API request failed');
  } else if (error.request) {
    // Request made but no response
    throw new Error('No response from server');
  } else {
    // Request setup error
    throw new Error('Error setting up request');
  }
};

const aiService = {
  // 获取 AI 对话历史
  getConversationHistory: async (userId = localStorage.getItem('userId') || 'default_user') => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ai/conversation`, {
        params: {
          userId: userId
        }
      });
      return response.data;
    } catch (error) {
      console.error('获取对话历史失败:', error);
      return [];
    }
  },

  // 发送消息给 AI
  async sendMessage(message) {
    try {
      // 1. 发送消息获取会话ID
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': API_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bot_id: BOT_ID,
          user_id: USER_ID,
          stream: false,
          auto_save_history: true,
          messages: [
            {
              role: 'user',
              content: message
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Initial API Response:', data);

      if (!data.data || !data.data.conversation_id) {
        throw new Error('No conversation ID received');
      }

      const conversationId = data.data.conversation_id;

      // 2. 轮询获取结果
      for (let i = 0; i < MAX_RETRIES; i++) {
        await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));

        const pollResponse = await fetch(`${API_URL}/${conversationId}`, {
          method: 'GET',
          headers: {
            'Authorization': API_TOKEN,
            'Content-Type': 'application/json',
          }
        });

        if (!pollResponse.ok) {
          throw new Error(`Polling request failed with status ${pollResponse.status}`);
        }

        const pollData = await pollResponse.json();
        console.log('Poll Response:', pollData);

        if (pollData.data && pollData.data.status === 'completed' && pollData.data.reply) {
          return {
            success: true,
            content: pollData.data.reply
          };
        } else if (pollData.data && pollData.data.status === 'failed') {
          throw new Error(pollData.data.last_error?.msg || 'Request failed');
        }
      }

      throw new Error('Timeout waiting for response');
    } catch (error) {
      console.error('Error sending message:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // 获取推荐活动
  getRecommendedActivities: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ai/activities`);
      return response.data;
    } catch (error) {
      console.error('获取推荐活动失败:', error);
      return [];
    }
  },

  // 获取课程列表
  getCourses: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ai/courses`);
      return response.data;
    } catch (error) {
      console.error('获取课程列表失败:', error);
      return [];
    }
  },

  // 获取社群动态
  getCommunityUpdates: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ai/community`);
      return response.data;
    } catch (error) {
      console.error('获取社群动态失败:', error);
      return [];
    }
  },

  // 添加一个新方法来获取对话结果
  getConversationResult: async (conversationId) => {
    try {
      const response = await fetch(`https://api.coze.cn/v3/chat/completions/${conversationId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('获取对话结果失败');
      }

      const data = await response.json();
      console.log('Conversation result:', data);

      if (data.code === 0 && data.data && data.data.status === 'completed') {
        return {
          code: 0,
          data: {
            reply: data.data.message?.content || '抱歉，我没有得到有效的回复'
          }
        };
      } else if (data.data?.status === 'in_progress') {
        return {
          code: 1,
          msg: 'processing'
        };
      } else {
        throw new Error('获取对话结果失败: ' + (data.msg || '未知错误'));
      }
    } catch (error) {
      console.error('获取对话结果失败:', error);
      throw error;
    }
  }
};

export default aiService; 