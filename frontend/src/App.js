import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import Login from './components/Login';
import Register from './components/Register';
import AIHelper from './components/AIHelper';
import UserCenter from './components/UserCenter';
import Navbar from './components/Navbar';
import Header from './components/Header';
import CourseList from './components/CourseList';
import CourseCreate from './components/CourseCreate';
import CourseDetail from './components/CourseDetail';
import CourseEdit from './components/CourseEdit';
import CourseManage from './components/CourseManage';
import CommunityList from './components/CommunityList';
import Community from './components/Community';
import Wallet from './components/Wallet';
import Events from './components/Events';
import Home from './components/Home';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="app-layout">
        <Header />
        <Layout>
          <Navbar />
          <Content className="app-content">
            <Routes>
              <Route path="/" element={<Navigate to="/news" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/news" element={<Home />} />
              <Route path="/ai" element={<AIHelper />} />
              <Route path="/events" element={<Events />} />
              <Route path="/courses" element={<CourseList />} />
              <Route path="/courses/create" element={<CourseCreate />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/courses/:id/edit" element={<CourseEdit />} />
              <Route path="/courses/:id/manage" element={<CourseManage />} />
              <Route path="/communities" element={<CommunityList />} />
              <Route path="/communities/:id" element={<Community />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/user-center" element={<UserCenter />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App; 