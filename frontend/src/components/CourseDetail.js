import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseDetail.css';

function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    content: ''
  });

  // 模拟课程数据
  const course = {
    id: 1,
    title: '从零开始学习Docker',
    description: '系统学习Docker容器技术，掌握容器化部署技能。本课程适合零基础学员，通过实践项目掌握Docker的核心概念和实际应用。',
    category: '技术探索',
    subCategory: 'Docker技术',
    price: 100,
    duration: '2小时',
    level: '初级',
    teacher: {
      name: '张老师',
      avatar: 'https://example.com/avatar.jpg',
      bio: '资深DevOps工程师，5年Docker实践经验'
    },
    requirements: [
      '基本的Linux命令行操作',
      '了解基本的软件开发概念',
      '一台可以运行Docker的电脑'
    ],
    schedule: '每周三 19:00-21:00',
    enrolled: true,
    reviews: [
      {
        id: 1,
        user: '李同学',
        rating: 5,
        content: '老师讲解非常清晰，课程内容实用，收获很大！',
        date: '2024-03-15'
      },
      {
        id: 2,
        user: '王同学',
        rating: 4,
        content: '课程内容很好，就是有些概念可以再详细一些。',
        date: '2024-03-10'
      }
    ]
  };

  const handleEnroll = () => {
    // 这里应该调用API进行报名
    console.log('Enrolling in course:', courseId);
    setIsEnrolled(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // 这里应该调用API提交评价
    setShowReviewModal(false);
    setNewReview({ rating: 5, content: '' });
  };

  const handleManageCourse = () => {
    navigate(`/teacher/courses/${courseId}/manage`);
  };

  return (
    <div className="course-detail">
      <div className="course-header">
        <div className="course-info">
          <h1>{course.title}</h1>
          <div className="course-meta">
            <span className="category">{course.category} - {course.subCategory}</span>
            <span className="level">{course.level}</span>
            <span className="duration">{course.duration}</span>
          </div>
        </div>
        <div className="course-actions">
          {!course.enrolled ? (
            <button className="enroll-btn" onClick={handleEnroll}>
              报名课程 ({course.price} 瑞泰币)
            </button>
          ) : (
            <button className="review-btn" onClick={() => setShowReviewModal(true)}>
              评价课程
            </button>
          )}
          {course.teacher.name === '当前用户' && (
            <button className="manage-btn" onClick={handleManageCourse}>
              管理课程
            </button>
          )}
        </div>
      </div>

      <div className="course-content">
        <div className="course-description">
          <h2>课程描述</h2>
          <p>{course.description}</p>
        </div>

        <div className="course-requirements">
          <h2>课程要求</h2>
          <ul>
            {course.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="teacher-info">
          <h2>讲师介绍</h2>
          <div className="teacher-profile">
            <img src={course.teacher.avatar} alt={course.teacher.name} />
            <div className="teacher-details">
              <h3>{course.teacher.name}</h3>
              <p>{course.teacher.bio}</p>
            </div>
          </div>
        </div>

        <div className="course-schedule">
          <h2>课程时间</h2>
          <p>{course.schedule}</p>
        </div>

        <div className="course-reviews">
          <h2>课程评价</h2>
          {course.reviews.length > 0 ? (
            <div className="reviews-list">
              {course.reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <span className="reviewer">{review.user}</span>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <div className="review-rating">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <p className="review-content">{review.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>暂无评价</p>
          )}
        </div>
      </div>

      {showReviewModal && (
        <div className="review-modal">
          <form onSubmit={handleReviewSubmit}>
            <h3>评价课程</h3>
            <div className="rating-input">
              <label>评分：</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
              >
                <option value="5">5星</option>
                <option value="4">4星</option>
                <option value="3">3星</option>
                <option value="2">2星</option>
                <option value="1">1星</option>
              </select>
            </div>
            <textarea
              placeholder="请输入您的评价内容..."
              value={newReview.content}
              onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
              required
            />
            <div className="modal-buttons">
              <button type="submit">提交评价</button>
              <button type="button" onClick={() => setShowReviewModal(false)}>取消</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default CourseDetail; 