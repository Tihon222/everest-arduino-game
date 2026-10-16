// src/pages/login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь логика проверки, пока просто редирект
    if (email && pass) {
      navigate('/map'); // После входа кидаем на первый урок
    } else {
      alert('Заполните все поля');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Вход в систему</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Пароль" 
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
          />
          <button type="submit" className="auth-submit">Войти</button>
        </form>
        <p className="auth-footer">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;