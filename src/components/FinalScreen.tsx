// src/components/FinalScreen.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FinalScreen.css';

interface FinalScreenProps {
  nickname: string;
  avatar: string;
  totalScore: number;
  totalLevels: number;
}

const FinalScreen: React.FC<FinalScreenProps> = ({ nickname, avatar, totalScore, totalLevels }) => {
  const navigate = useNavigate();

  return (
    <div className="final-overlay">
      <div className="final-content">
        <div className="final-crown">👑</div>
        <h1 className="final-title">Ты стал Мастером!</h1>
        <p className="final-subtitle">Ты прошёл все уровни Arduino Games.</p>

        <div className="final-stats">
          <div className="final-avatar">{avatar}</div>
          <div className="final-info">
            <div className="final-name">{nickname}</div>
            <div className="final-row">
              <span className="final-label">Баллы:</span>
              <span className="final-value">{totalScore}</span>
            </div>
            <div className="final-row">
              <span className="final-label">Уровни:</span>
              <span className="final-value">{totalLevels} / {totalLevels}</span>
            </div>
          </div>
        </div>

        <button className="final-btn" onClick={() => navigate('/')}>
          На главную →
        </button>
      </div>
    </div>
  );
};

export default FinalScreen;