import { API_ENDPOINTS, getAuthHeader } from '../config/api';

export const activityService = {
  // 获取活动列表
  async getActivities(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(
      `${API_ENDPOINTS.activities}${queryString ? `?${queryString}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        }
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '获取活动列表失败');
    }

    return response.json();
  },

  // 获取活动详情
  async getActivity(id) {
    const response = await fetch(`${API_ENDPOINTS.activities}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '获取活动详情失败');
    }

    return response.json();
  },

  // 创建活动
  async createActivity(activityData) {
    const response = await fetch(API_ENDPOINTS.activities, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(activityData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '创建活动失败');
    }

    return response.json();
  },

  // 更新活动
  async updateActivity(id, activityData) {
    const response = await fetch(`${API_ENDPOINTS.activities}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(activityData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '更新活动失败');
    }

    return response.json();
  },

  // 参加活动
  async joinActivity(id) {
    const response = await fetch(`${API_ENDPOINTS.activities}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ activityId: id })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '参加活动失败');
    }

    return response.json();
  },

  // 审核参与者
  async reviewParticipant(activityId, userId, status) {
    const response = await fetch(`${API_ENDPOINTS.activities}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify({ activityId, userId, status })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '审核参与者失败');
    }

    return response.json();
  },

  // 完成活动
  async completeActivity(id) {
    const response = await fetch(`${API_ENDPOINTS.activities}/${id}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '完成活动失败');
    }

    return response.json();
  }
}; 