// src/pages/levels.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LEVELS } from '../data/levels';
import { useAuth } from '../context/AuthContext';
import {
  getLeaderboard,
  exportProgress,
  ACHIEVEMENTS,
  getUserAchievements,
} from '../services/progress';
import './levels.css';

type Filter = 'all' | 'passed' | 'current';

const LevelsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const [achievements, setAchievements] = useState<string[]>([]);

  const [showPlayersModal, setShowPlayersModal] = useState(false);
  const [modalLevel, setModalLevel] = useState<number | null>(null);
  const [modalPlayers, setModalPlayers] = useState<any[]>([]);

  const [showLeaderboard, setShowLeaderboard] = useState(false);

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

  useEffect(() => {
    const loadAchievements = async () => {
      if (user) {
        const a = await getUserAchievements(user.id);
        setAchievements(a);
      }
    };
    loadAchievements();
  }, [user]);

  const myProgress = players.find((p) => p.id === user?.id);
  const myLevel = myProgress?.level || 1;

  const playersOnLevel = (levelId: number) =>
    players.filter((p) => p.level === levelId);

  const openPlayersModal = (levelId: number) => {
    const onLevel = playersOnLevel(levelId);
    setModalLevel(levelId);
    setModalPlayers(onLevel);
    setShowPlayersModal(true);
  };

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

  const handleExport = async () => {
    if (!user) return;
    const data = await exportProgress(user.id);
    if (!data) alert('Не удалось экспортировать прогресс');
  };

  return (
    <div className="levels-page">
      <header className="levels-header">
        <div className="levels-title-block">
          <h1>Уровни</h1>
          {/* ⬇️ Изменено: / 30 → / 50 */}
          <p className="levels-subtitle">Твой прогресс: {myLevel} / 50</p>
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
          <button className="logout-btn" onClick={() => setShowLeaderboard(true)}>
            🏆 Рейтинг
          </button>
          <button className="logout-btn" onClick={handleExport}>
            Экспорт
          </button>
          <button className="logout-btn" onClick={() => navigate('/')}>
            Выйти
          </button>
        </div>
      </header>

      {/* Достижения */}
      <div className="achievements-bar">
        {Object.entries(ACHIEVEMENTS).map(([key, ach]) => {
          const unlocked = achievements.includes(key);
          return (
            <div
              key={key}
              className={`achievement-badge ${unlocked ? 'unlocked' : 'locked'}`}
              title={ach.desc}
            >
              <span className="badge-icon">{ach.icon}</span>
              <span className="badge-title">{ach.title}</span>
            </div>
          );
        })}
      </div>

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
                {totalOnLevel > 3 && (
                  <span
                    className="more-players"
                    onClick={(e) => {
                      e.stopPropagation();
                      openPlayersModal(lvl.id);
                    }}
                  >
                    +{totalOnLevel - 3}
                  </span>
                )}
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

      {/* Модалка: игроки на уровне */}
      {showPlayersModal && modalLevel !== null && (
        <div className="modal-overlay" onClick={() => setShowPlayersModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Игроки на уровне {modalLevel}</h2>
            <p>Всего: {modalPlayers.length}</p>
            <ul className="players-list">
              {modalPlayers.map((p) => (
                <li key={p.id}>
                  <span className="player-avatar">{p.avatar || '🧗'}</span>
                  <span className="player-name">
                    {p.nickname || p.email?.split('@')[0] || 'Аноним'}
                    {p.id === user?.id && ' (ВЫ)'}
                  </span>
                  <span className="player-level">Ур. {p.level}</span>
                  <span className="player-score">{p.total_score}</span>
                </li>
              ))}
            </ul>
            <button className="continue-btn" onClick={() => setShowPlayersModal(false)}>
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Панель рейтинга */}
      {showLeaderboard && (
        <div className="modal-overlay" onClick={() => setShowLeaderboard(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>🏆 Рейтинг (топ-15)</h2>
            <ul className="players-list">
              {players.slice(0, 15).map((p, idx) => (
                <li key={p.id}>
                  <span className="player-rank">{idx + 1}.</span>
                  <span className="player-avatar">{p.avatar || '🧗'}</span>
                  <span className="player-name">
                    {p.nickname || p.email?.split('@')[0] || 'Аноним'}
                    {p.id === user?.id && ' (ВЫ)'}
                  </span>
                  <span className="player-level">Ур. {p.level}</span>
                  <span className="player-score">{p.total_score}</span>
                </li>
              ))}
            </ul>
            <button className="continue-btn" onClick={() => setShowLeaderboard(false)}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelsPage;