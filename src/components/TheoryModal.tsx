// src/components/TheoryModal.tsx
import React from 'react';
import './TheoryModal.css';

interface TheoryModalProps {
  title: string;
  content: string;
  onClose: () => void;
  mode?: 'theory' | 'notes';
}

const TheoryModal: React.FC<TheoryModalProps> = ({ title, content, onClose, mode = 'notes' }) => {
  const icon = mode === 'theory' ? '📘' : '📝';
  const label = mode === 'theory' ? 'Теория' : 'Конспект';

  return (
    <div className="theory-overlay" onClick={onClose}>
      <div className="theory-modal" onClick={(e) => e.stopPropagation()}>
        <div className="theory-header">
          <h2>{icon} {label}: {title}</h2>
          <button className="theory-close" onClick={onClose} aria-label="Закрыть">×</button>
        </div>
        <pre className="theory-content">{content}</pre>
        <button className="theory-continue" onClick={onClose}>
          Понятно, к задаче →
        </button>
      </div>
    </div>
  );
};

export default TheoryModal;