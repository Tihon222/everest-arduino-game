import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/index'));
const Login = lazy(() => import('./pages/login'));
const Register = lazy(() => import('./pages/register'));
const Lesson = lazy(() => import('./pages/lesson/[id]'));
const MapPage = lazy(() => import('./pages/map'));

export default function App() {
  return (
    <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lesson/:id" element={<Lesson />} />
        <Route path="*" element={<div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Страница не найдена</div>} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Suspense>
  );
}