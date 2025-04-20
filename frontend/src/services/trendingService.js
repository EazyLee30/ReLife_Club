import axios from 'axios';

const API_BASE_URL = 'http://localhost:6688';

// 获取所有热榜
export const getAllTrending = async () => {
  try {
    const [
      weibo,
      douyin,
      baidu,
      zhihu,
      bilibili,
      hupu,
      v2ex,
      ithome,
      juejin,
      tieba,
      doubanMovie,
      netease,
      toutiao,
      sspai,
      acfun
    ] = await Promise.all([
      axios.get(`${API_BASE_URL}/weibo`),
      axios.get(`${API_BASE_URL}/douyin`),
      axios.get(`${API_BASE_URL}/baidu`),
      axios.get(`${API_BASE_URL}/zhihu`),
      axios.get(`${API_BASE_URL}/bilibili`),
      axios.get(`${API_BASE_URL}/hupu`),
      axios.get(`${API_BASE_URL}/v2ex`),
      axios.get(`${API_BASE_URL}/ithome`),
      axios.get(`${API_BASE_URL}/juejin`),
      axios.get(`${API_BASE_URL}/tieba`),
      axios.get(`${API_BASE_URL}/douban-movie`),
      axios.get(`${API_BASE_URL}/netease-news`),
      axios.get(`${API_BASE_URL}/toutiao`),
      axios.get(`${API_BASE_URL}/sspai`),
      axios.get(`${API_BASE_URL}/acfun`)
    ]);

    return {
      weibo: weibo.data,
      douyin: douyin.data,
      baidu: baidu.data,
      zhihu: zhihu.data,
      bilibili: bilibili.data,
      hupu: hupu.data,
      v2ex: v2ex.data,
      ithome: ithome.data,
      juejin: juejin.data,
      tieba: tieba.data,
      doubanMovie: doubanMovie.data,
      netease: netease.data,
      toutiao: toutiao.data,
      sspai: sspai.data,
      acfun: acfun.data
    };
  } catch (error) {
    console.error('获取热榜失败:', error);
    return {
      weibo: [],
      douyin: [],
      baidu: [],
      zhihu: [],
      bilibili: [],
      hupu: [],
      v2ex: [],
      ithome: [],
      juejin: [],
      tieba: [],
      doubanMovie: [],
      netease: [],
      toutiao: [],
      sspai: [],
      acfun: []
    };
  }
};

// 获取微博热榜
export const getWeiboTrending = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weibo`);
    return response.data;
  } catch (error) {
    console.error('获取微博热榜失败:', error);
    return [];
  }
};

// 获取抖音热榜
export const getDouyinTrending = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/douyin`);
    return response.data;
  } catch (error) {
    console.error('获取抖音热榜失败:', error);
    return [];
  }
};

// 获取百度热榜
export const getBaiduTrending = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/baidu`);
    return response.data;
  } catch (error) {
    console.error('获取百度热榜失败:', error);
    return [];
  }
};

// 获取知乎热榜
export const getZhihuTrending = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/zhihu`);
    return response.data;
  } catch (error) {
    console.error('获取知乎热榜失败:', error);
    return [];
  }
};

// 获取哔哩哔哩热榜
export const getBilibiliTrending = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bilibili`);
    return response.data;
  } catch (error) {
    console.error('获取哔哩哔哩热榜失败:', error);
    return [];
  }
};

// 获取QQ音乐热榜
export const getQqTrending = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/qq`);
    return response.data;
  } catch (error) {
    console.error('获取QQ音乐热榜失败:', error);
    return [];
  }
};

// 获取微信读书热榜
export const getWechatTrending = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/wechat`);
    return response.data;
  } catch (error) {
    console.error('获取微信读书热榜失败:', error);
    return [];
  }
};

// 获取GitHub热榜
export const getGithubTrending = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/github`);
    return response.data;
  } catch (error) {
    console.error('获取GitHub热榜失败:', error);
    return [];
  }
}; 