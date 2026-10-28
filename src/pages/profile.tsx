// src/pages/profile.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getProgress,
  saveProgress,
  ACHIEVEMENTS,
  getUserAchievements,
} from '../services/progress';
import './profile.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [progress, setProgress] = useState<any>(null);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const p = await getProgress(user.id);
      setProgress(p);
      const a = await getUserAchievements(user.id);
      setAchievements(a);
      setLoading(false);
    };
    load();
  }, [user]);

  const handleReset = async () => {
    if (!user) return;
    if (!confirm('Сбросить прогресс? Уровень и баллы обнулятся.')) return;
    await saveProgress(user.id, {
      level: 1,
      total_score: 0,
      attempts: {},
      achievements: [],
      rest_until: null,
      is_falling: false,
    });
    alert('Прогресс сброшен!');
    navigate('/levels');
  };

  const handleLogout = () => {
    // Выйти можно через Supabase (в AuthContext)
    navigate('/');
    window.location.reload();
  };

  if (loading) {
    return <div className="profile-page"><p className="loading">Загрузка...</p></div>;
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>Личный кабинет</h1>
        <Link to="/levels" className="back-btn">← К уровням</Link>
      </header>

      <div className="profile-card">
        <div className="profile-avatar">{progress?.avatar || '🧗'}</div>
        <div className="profile-info">
          <h2>{progress?.nickname || user?.email?.split('@')[0] || 'Игрок'}</h2>
          <p>{user?.email}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <span className="stat-label">Уровень</span>
          <span className="stat-value">{progress?.level || 1} / 50</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Баллы</span>
          <span className="stat-value">{progress?.total_score || 0}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Достижения</span>
          <span className="stat-value">{achievements.length} / {Object.keys(ACHIEVEMENTS).length}</span>
        </div>
      </div>

      <div className="profile-achievements">
        <h3>Достижения</h3>
        <div className="achievements-grid">
          {Object.entries(ACHIEVEMENTS).map(([key, ach]) => {
            const unlocked = achievements.includes(key);
            return (
              <div
                key={key}
                className={`achievement-item ${unlocked ? 'unlocked' : 'locked'}`}
                title={ach.desc}
              >
                <span className="ach-icon">{ach.icon}</span>
                <span className="ach-title">{ach.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="profile-actions">
        <button className="reset-btn" onClick={handleReset}>Сбросить прогресс</button>
        <button className="logout-btn" onClick={handleLogout}>Выйти</button>
      </div>
    </div>
  );
};

export default ProfilePage;