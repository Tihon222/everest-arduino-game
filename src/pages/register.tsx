// src/pages/register.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика регистрации
    if (email && pass) {
      alert('Регистрация успешна! Теперь войдите.');
      navigate('/map');
    } else {
      alert('Заполните все поля');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Регистрация</h2>
        <form onSubmit={handleRegister}>
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
          <button type="submit" className="auth-submit">Создать аккаунт</button>
        </form>
        <p className="auth-footer">
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;