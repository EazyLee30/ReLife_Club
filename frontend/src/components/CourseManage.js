import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CourseManage.css';

function CourseManage() {
  const { courseId } = useParams();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // 模拟课程数据
  const course = {
    id: 1,
    title: '从零开始学习Docker',
    description: '系统学习Docker容器技术，掌握容器化部署技能。',
    category: '技术探索',
    subCategory: 'Docker技术',
    price: 100,
    duration: '2小时',
    maxStudents: 50,
    currentStudents: 15,
    meetingLink: 'https://meeting.tencent.com/dm/xxx',
    schedule: '每周三 19:00-21:00',
    students: [
      {
        id: 1,
        name: '李同学',
        joinTime: '2024-03-15',
        lastActive: '2024-03-20'
      },
      {
        id: 2,
        name: '王同学',
        joinTime: '2024-03-10',
        lastActive: '2024-03-19'
      }
    ]
  };

  const [editedCourse, setEditedCourse] = useState({ ...course });

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // 这里应该调用API保存更改
    setShowEditModal(false);
  };

  const handleUpdateSchedule = (e) => {
    e.preventDefault();
    // 这里应该调用API更新课程时间
    setShowScheduleModal(false);
  };

  return (
    <div className="course-manage">
      <div className="manage-header">
        <h2>课程管理</h2>
        <div className="course-title">{course.title}</div>
      </div>

      <div className="manage-content">
        <div className="course-stats">
          <div className="stat-card">
            <h3>报名人数</h3>
            <div className="stat-value">{course.currentStudents}/{course.maxStudents}</div>
          </div>
          <div className="stat-card">
            <h3>课程收入</h3>
            <div className="stat-value">{course.currentStudents * course.price} 瑞泰币</div>
          </div>
          <div className="stat-card">
            <h3>课程评分</h3>
            <div className="stat-value">4.8/5.0</div>
          </div>
        </div>

        <div className="manage-actions">
          <button 
            className="action-btn edit-btn"
            onClick={() => setShowEditModal(true)}
          >
            编辑课程信息
          </button>
          <button 
            className="action-btn schedule-btn"
            onClick={() => setShowScheduleModal(true)}
          >
            更新课程时间
          </button>
          <button 
            className="action-btn students-btn"
            onClick={() => setShowStudentList(true)}
          >
            查看学生名单
          </button>
          <a 
            href={course.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn meeting-btn"
          >
            进入课堂
          </a>
        </div>

        {showStudentList && (
          <div className="student-list">
            <h3>学生名单</h3>
            <table>
              <thead>
                <tr>
                  <th>学生姓名</th>
                  <th>加入时间</th>
                  <th>最后活跃</th>
                </tr>
              </thead>
              <tbody>
                {course.students.map(student => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.joinTime}</td>
                    <td>{student.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showEditModal && (
        <div className="edit-modal">
          <form onSubmit={handleSaveChanges}>
            <h3>编辑课程信息</h3>
            <input
              type="text"
              placeholder="课程标题"
              value={editedCourse.title}
              onChange={(e) => setEditedCourse({ ...editedCourse, title: e.target.value })}
              required
            />
            <textarea
              placeholder="课程描述"
              value={editedCourse.description}
              onChange={(e) => setEditedCourse({ ...editedCourse, description: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="课程价格（瑞泰币）"
              value={editedCourse.price}
              onChange={(e) => setEditedCourse({ ...editedCourse, price: parseInt(e.target.value) })}
              required
              min="0"
            />
            <input
              type="text"
              placeholder="腾讯会议链接"
              value={editedCourse.meetingLink}
              onChange={(e) => setEditedCourse({ ...editedCourse, meetingLink: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="最大学生数"
              value={editedCourse.maxStudents}
              onChange={(e) => setEditedCourse({ ...editedCourse, maxStudents: parseInt(e.target.value) })}
              required
              min="1"
            />
            <div className="modal-buttons">
              <button type="submit">保存更改</button>
              <button type="button" onClick={() => setShowEditModal(false)}>取消</button>
            </div>
          </form>
        </div>
      )}

      {showScheduleModal && (
        <div className="schedule-modal">
          <form onSubmit={handleUpdateSchedule}>
            <h3>更新课程时间</h3>
            <input
              type="text"
              placeholder="课程时间（例如：每周三 19:00-21:00）"
              value={editedCourse.schedule}
              onChange={(e) => setEditedCourse({ ...editedCourse, schedule: e.target.value })}
              required
            />
            <div className="modal-buttons">
              <button type="submit">更新</button>
              <button type="button" onClick={() => setShowScheduleModal(false)}>取消</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default CourseManage; 