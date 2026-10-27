// src/pages/index.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './index.css';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(false);

  return (
    <div className="home-container">
      {/* Шапка с кнопками */}
      <div className="auth-links">
        {user ? (
          <button className="auth-btn" onClick={() => navigate('/levels')}>
            К уровням →
          </button>
        ) : (
          <>
            <Link to="/login" className="auth-btn">Войти</Link>
            <Link to="/register" className="auth-btn">Зарегистрироваться</Link>
          </>
        )}
      </div>

      {/* Основной контент */}
      <div className="main-content">
        <h1>Arduino Games</h1>
        <p className="subtitle">Изучай Arduino через игру</p>

        <div className="description">
          <p>
            Ты — начинающий инженер. Твоя цель — пройти 30 уровней и стать <strong>Мастером Arduino</strong>.
          </p>
          <p>
            На каждом уровне тебя ждёт задание: написать код, найти ошибку или собрать проект.
          </p>
          <p>
            Учись на своих ошибках, соревнуйся с другими игроками и поднимайся по таблице лидеров.
          </p>
        </div>

        {user ? (
          <Link to="/levels" className="start-btn">Продолжить обучение →</Link>
        ) : (
          <button className="start-btn" onClick={() => setShowIntro(true)}>
            Начать обучение
          </button>
        )}
      </div>

      {/* Модалка с брифингом */}
      {showIntro && (
        <div className="modal-overlay" onClick={() => setShowIntro(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Брифинг перед стартом</h2>
            <p>Прежде чем начать, ознакомься с базовым синтаксисом, который тебе понадобится:</p>
            <pre className="code-block">
{`void setup() {
  Serial.begin(9600);
}

void loop() {
  int value = analogRead(A0);
  Serial.println(value);
}`}
            </pre>
            <p>Это твой базовый инструментарий. Далее будут переменные, условия и циклы.</p>
            <button className="continue-btn" onClick={() => navigate('/register')}>
              Зарегистрироваться и начать →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;