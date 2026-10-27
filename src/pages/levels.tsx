// src/pages/levels.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LEVELS } from '../data/levels';
import { useAuth } from '../context/AuthContext';
import { getLeaderboard } from '../services/progress';
import './levels.css';

type Filter = 'all' | 'passed' | 'current';

const LevelsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');

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

  const filteredLevels = LEVELS.filter((lvl) => {
    const isPassed = lvl.id < myLevel;
    const isCurrent = lvl.id === myLevel;
    if (filter === 'passed') return isPassed;
    if (filter === 'current') return isCurrent;
    return true;
  });

  const handleCardClick = (levelId: number, isLocked: boolean) => {
    if (isLocked) return;
    navigate(`/lesson/${levelId}`);
  };

  return (
    <div className="levels-page">
      <header className="levels-header">
        <div className="levels-title-block">
          <h1>Уровни</h1>
          <p className="levels-subtitle">Твой прогресс: {myLevel} / 30</p>
        </div>
        <div className="levels-actions">
          <div className="levels-filters">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Все
            </button>
            <button
              className={`filter-btn ${filter === 'passed' ? 'active' : ''}`}
              onClick={() => setFilter('passed')}
            >
              Пройденные
            </button>
            <button
              className={`filter-btn ${filter === 'current' ? 'active' : ''}`}
              onClick={() => setFilter('current')}
            >
              Текущий
            </button>
          </div>
          <button className="logout-btn" onClick={() => navigate('/')}>
            Выйти
          </button>
        </div>
      </header>

      <div className="levels-grid">
        {filteredLevels.map((lvl, idx) => {
          const isPassed = lvl.id < myLevel;
          const isCurrent = lvl.id === myLevel;
          const isLocked = lvl.id > myLevel;
          const onLevel = playersOnLevel(lvl.id);
          const totalOnLevel = onLevel.length;
          const progressPercent = Math.min(100, (myLevel / lvl.id) * 100);

          return (
            <div
              key={lvl.id}
              className={`level-card ${isPassed ? 'passed' : ''} ${isCurrent ? 'current' : ''} ${isLocked ? 'locked' : ''}`}
              onClick={() => handleCardClick(lvl.id, isLocked)}
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              <div className="card-header">
                <span className="card-number">{String(lvl.id).padStart(2, '0')}</span>
                <span className="card-status">
                  {isPassed ? '✅' : isCurrent ? '▶' : '🔒'}
                </span>
              </div>
              <h3 className="card-title">{lvl.title}</h3>
              <p className="card-task">{lvl.task.split('\n')[0]}</p>

              <div className="card-progress">
                <div className="card-progress-bar">
                  <div
                    className="card-progress-fill"
                    style={{ width: isPassed ? '100%' : isCurrent ? `${progressPercent}%` : '0%' }}
                  />
                </div>
                <span className="card-progress-text">
                  {isPassed ? 'Пройден' : isCurrent ? 'В процессе' : 'Закрыт'}
                </span>
              </div>

              <div className="card-players">
                {onLevel.slice(0, 3).map((p) => (
                  <span key={p.id} title={p.nickname || p.email}>
                    {p.avatar || '🧗'}
                  </span>
                ))}
                {totalOnLevel > 3 && <span>+{totalOnLevel - 3}</span>}
                {totalOnLevel === 0 && <span className="empty">Никого</span>}
              </div>
            </div>
          );
        })}
      </div>

      {loading && <p className="loading">Загрузка...</p>}
      {!loading && filteredLevels.length === 0 && (
        <p className="loading">Нет уровней с таким фильтром.</p>
      )}
    </div>
  );
};

export default LevelsPage;