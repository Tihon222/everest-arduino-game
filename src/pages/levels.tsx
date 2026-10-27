// src/pages/levels.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LEVELS } from '../data/levels';
import { useAuth } from '../context/AuthContext';
import { getLeaderboard } from '../services/progress';
import './levels.css';

const LevelsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getLeaderboard();
        setPlayers(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const myProgress = players.find((p) => p.id === user?.id);
  const myLevel = myProgress?.level || 1;

  const playersOnLevel = (levelId: number) =>
    players.filter((p) => p.level === levelId);

  return (
    <div className="levels-page">
      <header className="levels-header">
        <h1>Уровни</h1>
        <div className="levels-stats">
          <span>Твой уровень: {myLevel} / 30</span>
          <button className="logout-btn" onClick={() => navigate('/')}>
            Выйти
          </button>
        </div>
      </header>

      <div className="levels-grid">
        {LEVELS.map((lvl) => {
          const isPassed = lvl.id < myLevel;
          const isCurrent = lvl.id === myLevel;
          const isLocked = lvl.id > myLevel;
          const onLevel = playersOnLevel(lvl.id);

          return (
            <div
              key={lvl.id}
              className={`level-card ${isPassed ? 'passed' : ''} ${isCurrent ? 'current' : ''} ${isLocked ? 'locked' : ''}`}
              onClick={() => !isLocked && navigate(`/lesson/${lvl.id}`)}
            >
              <div className="card-header">
                <span className="card-number">{lvl.id}</span>
                <span className="card-status">
                  {isPassed ? '✅' : isCurrent ? '▶' : '🔒'}
                </span>
              </div>
              <h3 className="card-title">{lvl.title}</h3>
              <p className="card-task">{lvl.task.split('\n')[0]}</p>
              <div className="card-players">
                {onLevel.slice(0, 3).map((p) => (
                  <span key={p.id} title={p.nickname || p.email}>
                    {p.avatar || '🧗'}
                  </span>
                ))}
                {onLevel.length > 3 && <span>+{onLevel.length - 3}</span>}
                {onLevel.length === 0 && <span className="empty">Никого</span>}
              </div>
            </div>
          );
        })}
      </div>

      {loading && <p className="loading">Загрузка...</p>}
    </div>
  );
};

export default LevelsPage;