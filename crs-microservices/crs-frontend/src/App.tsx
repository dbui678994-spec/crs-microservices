import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; 
import LoginPage from './pages/LoginPage';
import CoursesPage from './pages/CoursesPage';
import AdminCoursesPage from './pages/AdminCoursesPage';
import RegisterCoursePage from './pages/RegisterCoursePage'; 
import MyRegistrationsPage from './pages/MyRegistrationsPage';
import Navbar from './components/Navbar';
import axiosClient from './api/axiosClient';
import axios from 'axios';

// Update Axios Interceptors (from Buổi 8 and Buổi 10/7)
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('crs_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem('crs_token');
      localStorage.removeItem('crs_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/courses" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/courses" element={<CoursesPage />} /> 
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminCoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register-course"
            element={
              <ProtectedRoute requiredRole="STUDENT">
                <RegisterCoursePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-registrations"
            element={
              <ProtectedRoute requiredRole="STUDENT">
                <MyRegistrationsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
