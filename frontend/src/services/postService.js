import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

// 获取帖子列表
export const getPosts = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('获取帖子列表失败:', error);
    throw error;
  }
};

// 发布新帖子
export const createPost = async (content) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts`, { content });
    return response.data;
  } catch (error) {
    console.error('发布帖子失败:', error);
    throw error;
  }
};

// 点赞帖子
export const likePost = async (postId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error('点赞失败:', error);
    throw error;
  }
};

// 评论帖子
export const commentPost = async (postId, content) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts/${postId}/comments`, { content });
    return response.data;
  } catch (error) {
    console.error('评论失败:', error);
    throw error;
  }
};

// 分享帖子
export const sharePost = async (postId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts/${postId}/share`);
    return response.data;
  } catch (error) {
    console.error('分享失败:', error);
    throw error;
  }
}; 