// src/pages/map.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LEVELS } from '../data/levels';
import { useAuth } from '../context/AuthContext';
import { getLeaderboard } from '../services/progress';
import './map.css';

function buildPath(from: { x: number; y: number }, to: { x: number; y: number }, horizontalFirst: boolean) {
  if (horizontalFirst) return [from, { x: to.x, y: from.y }, to];
  return [from, { x: from.x, y: to.y }, to];
}

const MapPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showRating, setShowRating] = useState(false);
  const [playerPos, setPlayerPos] = useState({ x: LEVELS[0].x, y: LEVELS[0].y });
  const [realPlayers, setRealPlayers] = useState<any[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  const prevLevelRef = useRef(currentLevel);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('everest_progress');
    if (saved) {
      const lvl = parseInt(saved);
      const found = LEVELS.find((x) => x.id === lvl);
      if (found) {
        setCurrentLevel(lvl);
        prevLevelRef.current = lvl;
        setPlayerPos({ x: found.x, y: found.y });
      }
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const players = await getLeaderboard();
        setRealPlayers(players);
      } catch (e) {
        console.error('Ошибка загрузки рейтинга:', e);
      } finally {
        setLoadingLeaderboard(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const prevLvl = LEVELS.find((l) => l.id === prevLevelRef.current) || LEVELS[0];
    const currLvl = LEVELS.find((l) => l.id === currentLevel) || LEVELS[0];
    if (prevLevelRef.current === currentLevel) {
      setPlayerPos({ x: currLvl.x, y: currLvl.y });
      return;
    }
    const path = buildPath(prevLvl, currLvl, true);
    let segment = 0, t = 0;
    const speed = 0.04;
    const animate = () => {
      const a = path[segment], b = path[segment + 1];
      if (!a || !b) { prevLevelRef.current = currentLevel; return; }
      t += speed;
      if (t >= 1) {
        t = 0; segment += 1;
        if (segment >= path.length - 1) {
          setPlayerPos({ x: currLvl.x, y: currLvl.y });
          prevLevelRef.current = currentLevel;
          return;
        }
      }
      const x = a.x + (b.x - a.x) * t;
      const y = a.y + (b.y - a.y) * t;
      setPlayerPos({ x, y });
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [currentLevel]);

  const handleClick = (levelId: number) => {
    if (levelId <= currentLevel) navigate(`/lesson/${levelId}`);
  };

  return (
    <div className="map-container">
      <div className="map-topbar">
        <div className="round-info">
          <span className="round-label">Round</span>
          <span className="round-number">{String(currentLevel).padStart(2, '0')}</span>
        </div>
        <div className="players-count">{realPlayers.length} players</div>
        <button className="rating-btn" onClick={() => setShowRating(!showRating)}>
          {showRating ? 'Скрыть рейтинг' : 'Рейтинг'}
        </button>
      </div>

      <svg className="map-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {LEVELS.slice(0, -1).map((lvl, i) => {
          const next = LEVELS[i + 1];
          const isPassed = lvl.id < currentLevel;
          const mid = { x: next.x, y: lvl.y };
          return (
            <polyline key={lvl.id} points={`${lvl.x},${lvl.y} ${mid.x},${mid.y} ${next.x},${next.y}`} fill="none" stroke={isPassed ? '#d4b106' : '#30363d'} strokeWidth="0.5" strokeDasharray={isPassed ? '0' : '2 2'} />
          );
        })}
      </svg>

      {LEVELS.map((lvl) => {
        const isPassed = lvl.id < currentLevel;
        const isCurrent = lvl.id === currentLevel;
        return (
          <div key={lvl.id} className={`level-node ${isPassed ? 'passed' : ''} ${isCurrent ? 'current' : ''}`} style={{ left: `${lvl.x}%`, top: `${lvl.y}%` }} onClick={() => handleClick(lvl.id)}>
            <div className="node-box">{lvl.id}</div>
            <span className="node-title">{lvl.title}</span>
          </div>
        );
      })}

      {realPlayers.map((p: any, idx: number) => {
        const lvl = LEVELS.find((l) => l.id === (p.level || 1)) || LEVELS[0];
        const offsetX = Math.sin(idx * 1.7) * 4;
        const offsetY = Math.cos(idx * 1.3) * 3;
        const isMe = p.id === user?.id;
        return (
          <div key={p.id} className={`fake-player ${isMe ? 'me' : ''}`} style={{ left: `${lvl.x + offsetX}%`, top: `${lvl.y + offsetY}%` }} title={`Уровень ${p.level}, баллы: ${p.total_score || 0}`}>
            {isMe ? '🎯' : '🧗'}
          </div>
        );
      })}

      <div className="player-icon" style={{ left: `${playerPos.x}%`, top: `${playerPos.y - 5}%` }}>▲</div>

      {showRating && (
        <div className="rating-panel">
          <h2>Tableau des scores</h2>
          {loadingLeaderboard ? (
            <p style={{ color: '#8b949e' }}>Загрузка...</p>
          ) : realPlayers.length === 0 ? (
            <p style={{ color: '#8b949e' }}>Пока никто не зарегистрирован.</p>
          ) : (
            <ol>
              {realPlayers.map((p: any, idx: number) => (
                <li key={p.id}>
                  <span className="rating-avatar">{idx + 1}.</span>
                  <span className="rating-name">{p.id === user?.id ? 'ВЫ' : (p.email || p.id).slice(0, 8)}</span>
                  <span className="rating-level">Ур. {p.level || 1}</span>
                  <span className="rating-score">{p.total_score || 0}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
};

export default MapPage;