import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserList from './pages/Users/UserList'
import UserForm from './pages/Users/UserForm'
import ProtectedRoute from './routes/ProtectedRoute'
import './App.css'

const { Header, Content } = Layout

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Content style={{ padding: '24px' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/user" element={<UserList />} />
              <Route path="/user/form" element={<UserForm />} />
              <Route path="/user/:id/edit" element={<UserForm />} />
            </Route>

            <Route path="/" element={<Login />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  )
}

export default App
