import React, { useState } from 'react';
import './Events.css';

function Events() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: '春季养生讲座',
      date: '2024-04-15',
      time: '14:00',
      location: '线上直播',
      description: '邀请中医专家讲解春季养生知识，分享健康饮食和运动建议。',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 0,
      capacity: 100,
      registered: 45
    },
    {
      id: 2,
      title: '太极拳入门课程',
      date: '2024-04-20',
      time: '09:00',
      location: '社区活动中心',
      description: '专业教练指导太极拳基础动作，适合零基础学员。',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 50,
      capacity: 20,
      registered: 15
    },
    {
      id: 3,
      title: '健康饮食工作坊',
      date: '2024-04-25',
      time: '10:00',
      location: '社区厨房',
      description: '学习制作健康营养餐，了解食物搭配原则。',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      price: 30,
      capacity: 15,
      registered: 8
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleRegister = (eventId) => {
    // 这里添加注册逻辑
    console.log('Registering for event:', eventId);
  };

  return (
    <div className="events-container">
      <h1>活动中心</h1>
      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-image">
              <img src={event.image} alt={event.title} />
            </div>
            <div className="event-content">
              <h2>{event.title}</h2>
              <div className="event-meta">
                <span className="date">{event.date}</span>
                <span className="time">{event.time}</span>
                <span className="location">{event.location}</span>
              </div>
              <p className="event-description">{event.description}</p>
              <div className="event-details">
                <div className="price">
                  {event.price === 0 ? '免费' : `¥${event.price}`}
                </div>
                <div className="capacity">
                  已报名: {event.registered}/{event.capacity}
                </div>
              </div>
              <button 
                className="register-btn"
                onClick={() => handleRegister(event.id)}
              >
                立即报名
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events; 