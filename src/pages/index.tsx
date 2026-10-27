/// src/pages/index.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Стили для этой страницы

const Home = () => {
  const [showIntro, setShowIntro] = useState(false);

  return (
    <div className="home-container">
      {/* Верхний правый угол: Вход и Регистрация */}
      <div className="auth-links">
        <Link to="/login" className="auth-btn">Войти</Link>
        <Link to="/register" className="auth-btn">Зарегистрироваться</Link>
      </div>

      {/* Центральный контент */}
      <div className="main-content">
        <h1>Добро пожаловать, в Arduino Games </h1>
        
        <div className="description">
          <p>
            Ты стоишь у подножия Эвереста. Это не просто гора — это симуляция твоего мастерства.
            Твоя цель — не просто подняться, а стать <strong>Инструктором</strong>.
          </p>
          <p>
            Каждый шаг вверх — это новое задание. С каждым уровнем код становится сложнее, 
            переменные запутаннее, а навыки — острее. 
          </p>
          <p>
            Основа — работа с кодом и переменными. Ошибка на высоте может стоить дорого.
            Готов ли ты начать восхождение?
          </p>
        </div>
      </div>

      {/* Модальное окно с синтаксисом */}
      {showIntro && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Брифинг перед стартом</h2>
            <p>Прежде чем начать, ознакомься с базовым синтаксисом, который тебе понадобится:</p>
            <pre className="code-block">
              {`void setup() {
  Serial.begin(9600);
}

void loop() {
  int val = analogRead(A0);
  Serial.println(val);
}`}
            </pre>
            <p>Это твой базовый инструментарий. Далее будут переменные, условия и циклы.</p>
            <Link to="/map">
              <button className="continue-btn">Продолжить</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;