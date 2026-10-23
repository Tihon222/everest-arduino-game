// src/pages/register.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import AvatarPicker from '../components/AvatarPicker';
import './auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (pass.length < 6) {
      setError('Пароль должен быть не короче 6 символов');
      return;
    }
    if (nickname.trim().length < 3) {
      setError('Ник должен быть не короче 3 символов');
      return;
    }
    setShowAvatarPicker(true);
  };

  const handleAvatarSelect = async (avatar: string) => {
    setShowAvatarPicker(false);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
      });

      if (error) {
        if (error.message.includes('already registered')) setError('Email уже зарегистрирован');
        else if (error.message.includes('invalid')) setError('Некорректный email');
        else setError('Ошибка регистрации: ' + error.message);
        return;
      }

      // Если пользователь уже существует, Supabase вернёт пустой identities
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setError('Этот email уже зарегистрирован. Попробуй войти.');
        return;
      }

      // Сохраняем профиль в таблицу users через upsert
      if (data.user) {
        const { error: upsertError } = await supabase
          .from('users')
          .upsert({
            id: data.user.id,
            email: data.user.email,
            avatar,
            nickname: nickname.trim(),
            level: 1,
            total_score: 0,
            attempts: {},
          });

        if (upsertError) {
          console.error('Ошибка создания профиля:', upsertError);
          setError('Ошибка создания профиля: ' + upsertError.message);
          return;
        }
      }

      alert('Регистрация успешна! Теперь войди.');
      navigate('/login');
    } catch (err: any) {
      setError('Ошибка регистрации: ' + err.message);
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
            type="text"
            placeholder="Твой ник (мин. 3 символа)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            maxLength={15}
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

      {showAvatarPicker && (
        <AvatarPicker
          onSelect={handleAvatarSelect}
          onCancel={() => setShowAvatarPicker(false)}
        />
      )}
    </div>
  );
};

export default Register;