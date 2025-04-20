import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, List, Button, Input, Space, Tag, Avatar } from 'antd';
import { PlusOutlined, SearchOutlined, TeamOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './Courses.css';

const { Search } = Input;

const Courses = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    '全部',
    '职业发展',
    '领导力',
    '数字技能',
    '艺术创作',
    '技术探索',
    '投资理财'
  ];

  const subCategories = {
    '职业发展': ['职业规划', '技能提升', '行业洞察'],
    '领导力': ['团队管理', '战略思维', '沟通技巧'],
    '数字技能': ['自媒体运营', '播客制作', '摄影技巧'],
    '艺术创作': ['DJ打碟', '音乐制作', '视频剪辑'],
    '技术探索': ['人工智能', '3D打印', 'Docker技术'],
    '投资理财': ['量化交易', '投资策略', '资产管理']
  };

  // 模拟课程数据
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: '从零开始学习Docker',
      description: '系统学习Docker容器技术，掌握容器化部署技能',
      category: '技术探索',
      subCategory: 'Docker技术',
      price: 100,
      teacher: '张老师',
      duration: '2小时',
      maxStudents: 50,
      currentStudents: 15,
      meetingLink: 'https://meeting.tencent.com/dm/xxx',
      isOfficial: true
    },
    {
      id: 2,
      title: '自媒体运营实战',
      description: '学习如何打造个人IP，提升内容创作能力',
      category: '数字技能',
      subCategory: '自媒体运营',
      price: 80,
      teacher: '李老师',
      duration: '1.5小时',
      maxStudents: 30,
      currentStudents: 25,
      meetingLink: 'https://meeting.tencent.com/dm/yyy',
      isOfficial: false
    }
  ]);

  const handleCreateCourse = () => {
    navigate('/courses/create');
  };

  const handlePurchaseCourse = (courseId) => {
    // 这里应该调用钱包组件进行支付
    alert('请确认使用瑞泰币购买课程');
  };

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === '全部' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="courses-container">
      <Card>
        <div className="courses-header">
          <h2>课程中心</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateCourse}
          >
            开设课程
          </Button>
        </div>

        <div className="category-filter">
          {categories.map(category => (
            <Button
              key={category}
              type={selectedCategory === category ? 'primary' : 'default'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <Search
          placeholder="搜索课程..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          className="course-search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <List
          className="course-list"
          itemLayout="horizontal"
          dataSource={filteredCourses}
          renderItem={course => (
            <List.Item
              className="course-item"
              actions={[
                <Button 
                  type="primary" 
                  onClick={() => handlePurchaseCourse(course.id)}
                  disabled={course.currentStudents >= course.maxStudents}
                >
                  {course.currentStudents >= course.maxStudents ? '已满员' : '立即报名'}
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<VideoCameraOutlined />} />}
                title={
                  <div className="course-title">
                    {course.title}
                    {course.isOfficial && <Tag color="blue">官方课程</Tag>}
                  </div>
                }
                description={
                  <div className="course-content">
                    <p className="course-description">{course.description}</p>
                    <div className="course-meta">
                      <span className="teacher">讲师: {course.teacher}</span>
                      <span className="category">{course.category} · {course.subCategory}</span>
                      <span className="duration">时长: {course.duration}</span>
                      <span className="students">
                        <TeamOutlined /> {course.currentStudents}/{course.maxStudents}
                      </span>
                    </div>
                    <div className="course-price">
                      <span className="price">{course.price} 瑞泰币</span>
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Courses; 