import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseCreate.css';

function CourseCreate() {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    subCategory: '',
    price: '',
    duration: '',
    level: '初级',
    maxStudents: '',
    meetingLink: '',
    schedule: '',
    requirements: [''],
    image: null
  });

  const categories = [
    { value: '技术探索', label: '技术探索' },
    { value: '生活技能', label: '生活技能' },
    { value: '健康养生', label: '健康养生' },
    { value: '兴趣爱好', label: '兴趣爱好' }
  ];

  const subCategories = {
    '技术探索': ['Docker技术', 'Python编程', 'Web开发', '人工智能'],
    '生活技能': ['理财规划', '时间管理', '沟通技巧', '生活美学'],
    '健康养生': ['中医养生', '运动健身', '营养饮食', '心理健康'],
    '兴趣爱好': ['摄影技巧', '书法绘画', '音乐欣赏', '园艺种植']
  };

  const levels = [
    { value: '初级', label: '初级' },
    { value: '中级', label: '中级' },
    { value: '高级', label: '高级' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...courseData.requirements];
    newRequirements[index] = value;
    setCourseData(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const addRequirement = () => {
    setCourseData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index) => {
    const newRequirements = courseData.requirements.filter((_, i) => i !== index);
    setCourseData(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里应该调用API创建课程
    console.log('Creating course:', courseData);
    navigate('/courses');
  };

  return (
    <div className="course-create">
      <h2>创建新课程</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>课程标题</label>
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleInputChange}
            required
            placeholder="请输入课程标题"
          />
        </div>

        <div className="form-group">
          <label>课程描述</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleInputChange}
            required
            placeholder="请输入课程描述"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>课程分类</label>
            <select
              name="category"
              value={courseData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">请选择分类</option>
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>子分类</label>
            <select
              name="subCategory"
              value={courseData.subCategory}
              onChange={handleInputChange}
              required
              disabled={!courseData.category}
            >
              <option value="">请选择子分类</option>
              {courseData.category && subCategories[courseData.category].map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>课程价格（瑞泰币）</label>
            <input
              type="number"
              name="price"
              value={courseData.price}
              onChange={handleInputChange}
              required
              min="0"
              placeholder="请输入课程价格"
            />
          </div>

          <div className="form-group">
            <label>课程时长</label>
            <input
              type="text"
              name="duration"
              value={courseData.duration}
              onChange={handleInputChange}
              required
              placeholder="例如：2小时"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>课程难度</label>
            <select
              name="level"
              value={courseData.level}
              onChange={handleInputChange}
              required
            >
              {levels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>最大学生数</label>
            <input
              type="number"
              name="maxStudents"
              value={courseData.maxStudents}
              onChange={handleInputChange}
              required
              min="1"
              placeholder="请输入最大学生数"
            />
          </div>
        </div>

        <div className="form-group">
          <label>腾讯会议链接</label>
          <input
            type="text"
            name="meetingLink"
            value={courseData.meetingLink}
            onChange={handleInputChange}
            required
            placeholder="请输入腾讯会议链接"
          />
        </div>

        <div className="form-group">
          <label>课程时间</label>
          <input
            type="text"
            name="schedule"
            value={courseData.schedule}
            onChange={handleInputChange}
            required
            placeholder="例如：每周三 19:00-21:00"
          />
        </div>

        <div className="form-group">
          <label>课程要求</label>
          {courseData.requirements.map((req, index) => (
            <div key={index} className="requirement-input">
              <input
                type="text"
                value={req}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
                required
                placeholder="请输入课程要求"
              />
              {index > 0 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeRequirement(index)}
                >
                  删除
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-btn"
            onClick={addRequirement}
          >
            添加要求
          </button>
        </div>

        <div className="form-group">
          <label>课程封面</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">创建课程</button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/courses')}
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
}

export default CourseCreate; 