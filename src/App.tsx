import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/index'));
const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/register'));
const Lesson = lazy(() => import('./pages/lesson/[id]'));
const LevelsPage = lazy(() => import('./pages/levels'));
const ProfilePage = lazy(() => import('./pages/profile')); // ← новый

export default function App() {
  return (
    <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/levels" element={<LevelsPage />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* ← новый */}
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="*" element={<div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Страница не найдена</div>} />
      </Routes>
    </Suspense>
  );
}