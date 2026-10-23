// src/App.tsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const Home = lazy(() => import('./pages/index'));
const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/register'));
const Lesson = lazy(() => import('./pages/lesson/[id]'));
const MapPage = lazy(() => import('./pages/map'));

// Компонент для защиты маршрутов
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Защищённые маршруты */}
        <Route path="/map" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
        <Route path="/lesson/:id" element={<ProtectedRoute><Lesson /></ProtectedRoute>} />
        <Route path="*" element={<div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Страница не найдена</div>} />
      </Routes>
    </Suspense>
  );
}