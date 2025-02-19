import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './pages/Main'
import MainMapView from './pages/MainMapView'
import Login from './pages/Login'
import MyPage from './pages/MyPage'
import Register from './pages/Register'
import LoginPet from './pages/LoginPet'
import Layout from './layout/Layout.jsx'

import ReportMissingPet  from './pages/ReportMissingPet'
import { useAuthStore } from './stores/useAuthStore'
import './index.css';

const App = () => {

  return (
      <Routes>
        <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/map" element={<MainMapView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-pet" element={<LoginPet />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/find" element={<ReportMissingPet/>} />
        </Route>
      </Routes>
  );
};

export default App;