// src/components/FallingScreen.tsx
import React, { useEffect } from 'react';
import './FallingScreen.css';

interface FallingScreenProps {
  onDone: () => void;
}

const FallingScreen: React.FC<FallingScreenProps> = ({ onDone }) => {
  useEffect(() => {
    const timer = setTimeout(onDone, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);

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