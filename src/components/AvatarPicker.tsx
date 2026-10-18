// src/components/AvatarPicker.tsx
import React, { useState } from 'react';
import './AvatarPicker.css';

const AVATARS = [
  '🧗', '🧙', '🦊', '🐺', '🦉', '🐧',
  '🐸', '🐙', '🦁', '🐯', '🐻', '🐨',
];

interface AvatarPickerProps {
  onSelect: (avatar: string) => void;
  onCancel?: () => void;
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({ onSelect, onCancel }) => {
  const [selected, setSelected] = useState<string>('🧗');

  return (
    <div className="avatar-overlay">
      <div className="avatar-modal">
        <h2>Выбери аватар</h2>
        <p>Этот персонаж будет представлять тебя на карте и в рейтинге.</p>

        <div className="avatar-grid">
          {AVATARS.map((a) => (
            <button
              key={a}
              className={`avatar-option ${selected === a ? 'selected' : ''}`}
              onClick={() => setSelected(a)}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="avatar-preview">
          <span className="avatar-preview-label">Твой выбор:</span>
          <span className="avatar-preview-icon">{selected}</span>
        </div>

        <div className="avatar-actions">
          {onCancel && (
            <button className="avatar-cancel" onClick={onCancel}>
              Отмена
            </button>
          )}
          <button className="avatar-confirm" onClick={() => onSelect(selected)}>
            Готово →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarPicker;