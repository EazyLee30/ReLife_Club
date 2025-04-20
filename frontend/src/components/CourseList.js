import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, List, Button, Input, Space, Tag, Progress } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import './CourseList.css';

const { Search } = Input;

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: 从API获取课程列表
    const fetchCourses = async () => {
      try {
        // 模拟数据
        const mockCourses = [
          {
            _id: '1',
            title: '区块链基础入门',
            description: '学习区块链的基本概念和原理',
            progress: 60,
            instructor: '张老师',
            duration: '8周',
            level: '初级'
          },
          {
            _id: '2',
            title: '智能合约开发',
            description: '学习Solidity语言和智能合约开发',
            progress: 30,
            instructor: '李老师',
            duration: '12周',
            level: '中级'
          }
        ];
        setCourses(mockCourses);
      } catch (error) {
        console.error('获取课程列表失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="course-list">
      <Card>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div className="course-header">
            <h2>课程</h2>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate('/courses/create')}
            >
              创建课程
            </Button>
          </div>
          <Search
            placeholder="搜索课程"
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
          />
          <List
            loading={loading}
            itemLayout="vertical"
            dataSource={courses}
            renderItem={course => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => navigate(`/courses/${course._id}`)}>
                    继续学习
                  </Button>
                ]}
              >
                <List.Item.Meta
                  title={course.title}
                  description={
                    <div>
                      <p>{course.description}</p>
                      <div className="course-info">
                        <Tag color="blue">讲师: {course.instructor}</Tag>
                        <Tag color="green">时长: {course.duration}</Tag>
                        <Tag color="orange">难度: {course.level}</Tag>
                      </div>
                      <div className="course-progress">
                        <Progress percent={course.progress} size="small" />
                      </div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Space>
      </Card>
    </div>
  );
};

export default CourseList; 