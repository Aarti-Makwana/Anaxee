import React, { useState } from 'react';
import { Layout, Button, Modal, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from '../services/userService';
const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login', { replace: true });
  };

  const userDataRaw = localStorage.getItem('userData');
  let username = '';
  try {
    const parsed = JSON.parse(userDataRaw);
    username = parsed?.username || parsed?.name || '';
  } catch (e) {
    username = userDataRaw || '';
  }


  const handleProfileSave = async (values) => {
    const payload = { ...values };
    const res = await updateProfile(payload);
    if (res.success) {
      // update localStorage userData
      try {
        const raw = localStorage.getItem('userData');
        const parsed = raw ? JSON.parse(raw) : {};
        const updated = { ...parsed, name: res.data.name || values.name, username: res.data.username || values.username, mobile: res.data.mobile || values.mobile };
        localStorage.setItem('userData', JSON.stringify(updated));
      } catch (e) {}
      message.success('Profile updated');
      setProfileVisible(false);
    } else {
      message.error(res.message || 'Update failed');
    }
  };

  return (
    <Header style={{ display: 'flex', alignItems: 'justify-between', justifyContent: 'space-between', padding: '0 24px' }}>
      <div style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginRight: 24 }}>
        
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {username ? <div style={{ color: '#fff' }}> <span style={{padding:"0px 5px"}}>Welcome</span>{username}</div> : null}
        <Button onClick={handleLogout} type="primary">
          Logout
        </Button>
      </div>

    </Header>
  );
};

export default AppHeader;
