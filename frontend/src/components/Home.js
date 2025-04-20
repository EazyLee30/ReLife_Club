import React, { useState, useEffect } from 'react';
import { Card, Tabs, List, Tag, Spin, message } from 'antd';
import { 
  WeiboOutlined,
  TikTokOutlined,
  BaiduOutlined,
  FireOutlined,
  ZhihuOutlined,
  BilibiliOutlined,
  TrophyOutlined,
  GlobalOutlined,
  LaptopOutlined,
  CodeOutlined,
  MessageOutlined,
  PlayCircleOutlined,
  NotificationOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  YoutubeOutlined
} from '@ant-design/icons';
import { getAllTrending } from '../services/trendingService';
import './Home.css';

const { TabPane } = Tabs;

const Home = () => {
  const [trendingTopics, setTrendingTopics] = useState({
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
  });
  const [loading, setLoading] = useState(false);

  // 获取热搜数据
  useEffect(() => {
    const fetchTrendingTopics = async () => {
      setLoading(true);
      try {
        const data = await getAllTrending();
        setTrendingTopics(data);
      } catch (error) {
        message.error('获取热搜失败');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTopics();
    // 每5分钟更新一次热搜
    const interval = setInterval(fetchTrendingTopics, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const renderTrendingSection = (icon, title, data) => {
    // 检查数据格式是否正确
    if (!data || !data.data || !Array.isArray(data.data)) {
      return (
        <div className="trending-section">
          <h3>{icon} {title}</h3>
          <div className="no-data">暂无数据</div>
        </div>
      );
    }

    // 只取前5条数据
    const topFiveData = data.data.slice(0, 5);

    return (
      <div className="trending-section">
        <h3>{icon} {title}</h3>
        <List
          dataSource={topFiveData}
          renderItem={(item, index) => (
            <List.Item>
              <div className="trending-item">
                <span className="trending-rank">{index + 1}</span>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="trending-title">
                  {item.title}
                </a>
                {item.hot && (
                  <Tag color="red" className="trending-hot">
                    {item.hot}
                  </Tag>
                )}
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  };

  return (
    <div className="home-container">
      <Card 
        title={
          <span>
            <FireOutlined style={{ marginRight: 8 }} />
            今日热榜
          </span>
        }
        className="trending-card"
        loading={loading}
      >
        <Tabs defaultActiveKey="all">
          <TabPane
            tab={
              <span>
                <FireOutlined />
                全部热榜
              </span>
            }
            key="all"
          >
            <div className="all-trending">
              {renderTrendingSection(<WeiboOutlined />, '微博热搜', trendingTopics.weibo)}
              {renderTrendingSection(<TikTokOutlined />, '抖音热搜', trendingTopics.douyin)}
              {renderTrendingSection(<BaiduOutlined />, '百度热搜', trendingTopics.baidu)}
              {renderTrendingSection(<ZhihuOutlined />, '知乎热榜', trendingTopics.zhihu)}
              {renderTrendingSection(<BilibiliOutlined />, '哔哩哔哩热榜', trendingTopics.bilibili)}
              {renderTrendingSection(<TrophyOutlined />, '虎扑热榜', trendingTopics.hupu)}
              {renderTrendingSection(<GlobalOutlined />, 'V2EX热榜', trendingTopics.v2ex)}
              {renderTrendingSection(<LaptopOutlined />, 'IT之家', trendingTopics.ithome)}
              {renderTrendingSection(<CodeOutlined />, '掘金热榜', trendingTopics.juejin)}
              {renderTrendingSection(<MessageOutlined />, '贴吧热议', trendingTopics.tieba)}
              {renderTrendingSection(<PlayCircleOutlined />, '豆瓣电影', trendingTopics.doubanMovie)}
              {renderTrendingSection(<NotificationOutlined />, '网易新闻', trendingTopics.netease)}
              {renderTrendingSection(<ThunderboltOutlined />, '今日头条', trendingTopics.toutiao)}
              {renderTrendingSection(<ToolOutlined />, '少数派', trendingTopics.sspai)}
              {renderTrendingSection(<YoutubeOutlined />, 'AcFun', trendingTopics.acfun)}
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Home; 