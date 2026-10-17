// src/components/FallingScreen.tsx
import React, { useEffect } from 'react';
import './FallingScreen.css';

interface FallingScreenProps {
  levelId: number;
  onDone: () => void;
}

const FallingScreen: React.FC<FallingScreenProps> = ({ levelId, onDone }) => {
  useEffect(() => {
    // Запоминаем, что игрок падает с этого уровня
    localStorage.setItem('falling_from', String(levelId));

    const timer = setTimeout(onDone, 2000);
    return () => clearTimeout(timer);
  }, [onDone, levelId]);

  return (
    <div className="falling-overlay">
      <div className="falling-content">
        <div className="falling-arrow">⬇</div>
        <h1>ТЫ ПАДАЕШЬ!</h1>
        <p>Время вышло. Возвращайся на 10-й уровень.</p>
      </div>
    </div>
  );
};

export default FallingScreen;