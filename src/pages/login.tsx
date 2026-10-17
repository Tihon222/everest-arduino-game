// src/pages/login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate('/map');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') setError('Пользователь не найден');
      else if (err.code === 'auth/wrong-password') setError('Неверный пароль');
      else if (err.code === 'auth/invalid-email') setError('Некорректный email');
      else setError('Ошибка входа. Проверь данные.');
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
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          {error && <p style={{ color: '#f85149', fontSize: 13, marginBottom: 10 }}>{error}</p>}
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