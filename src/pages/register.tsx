// src/pages/register.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (pass.length < 6) {
      setError('Пароль должен быть не короче 6 символов');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      alert('Регистрация успешна! Теперь войди.');
      navigate('/login');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') setError('Email уже зарегистрирован');
      else if (err.code === 'auth/invalid-email') setError('Некорректный email');
      else if (err.code === 'auth/weak-password') setError('Слишком слабый пароль');
      else setError('Ошибка регистрации.');
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
            required
          />
          <input
            type="password"
            placeholder="Пароль (мин. 6 символов)"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          {error && <p style={{ color: '#f85149', fontSize: 13, marginBottom: 10 }}>{error}</p>}
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