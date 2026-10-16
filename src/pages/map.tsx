// src/pages/map.tsx
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LEVELS } from '../data/levels';
import { generateFakePlayers } from '../data/players';
import './map.css';

// Строит путь: старт → угол → финиш (Г-образная линия)
function buildPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  horizontalFirst: boolean
): { x: number; y: number }[] {
  if (horizontalFirst) {
    return [from, { x: to.x, y: from.y }, to];
  }
  return [from, { x: from.x, y: to.y }, to];
}

const MapPage = () => {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showRating, setShowRating] = useState(false);
  const [playerPos, setPlayerPos] = useState({
    x: LEVELS[0].x,
    y: LEVELS[0].y,
  });

  const prevLevelRef = useRef(currentLevel);
  const animationRef = useRef<number | null>(null);

  // Загружаем сохранённый прогресс
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

  // Анимация игрока при смене уровня
  useEffect(() => {
    const prevLvl = LEVELS.find((l) => l.id === prevLevelRef.current) || LEVELS[0];
    const currLvl = LEVELS.find((l) => l.id === currentLevel) || LEVELS[0];

    // Если уровень не изменился — просто ставим на место
    if (prevLevelRef.current === currentLevel) {
      setPlayerPos({ x: currLvl.x, y: currLvl.y });
      return;
    }

    const path = buildPath(prevLvl, currLvl, true);
    let segment = 0;
    let t = 0;
    const speed = 0.04;

    const animate = () => {
      const a = path[segment];
      const b = path[segment + 1];

      if (!a || !b) {
        prevLevelRef.current = currentLevel;
        return;
      }

      t += speed;

      if (t >= 1) {
        t = 0;
        segment += 1;

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

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [currentLevel]);

  // Фейковые игроки — генерируются один раз
  const fakePlayers = useMemo(
    () => generateFakePlayers(15, LEVELS.length),
    []
  );

  const handleClick = (levelId: number) => {
    if (levelId <= currentLevel) {
      navigate(`/lesson/${levelId}`);
    }
  };

  return (
    <div className="map-container">
      {/* Верхняя панель */}
      <div className="map-topbar">
        <div className="round-info">
          <span className="round-label">Round</span>
          <span className="round-number">
            {String(currentLevel).padStart(2, '0')}
          </span>
        </div>
        <div className="players-count">{fakePlayers.length + 1} players</div>
        <button
          className="rating-btn"
          onClick={() => setShowRating(!showRating)}
        >
          {showRating ? 'Скрыть рейтинг' : 'Рейтинг'}
        </button>
      </div>

      {/* Г-образные линии между узлами */}
      <svg
        className="map-lines"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {LEVELS.slice(0, -1).map((lvl, i) => {
          const next = LEVELS[i + 1];
          const isPassed = lvl.id < currentLevel;
          const mid = { x: next.x, y: lvl.y };
          return (
            <polyline
              key={lvl.id}
              points={`${lvl.x},${lvl.y} ${mid.x},${mid.y} ${next.x},${next.y}`}
              fill="none"
              stroke={isPassed ? '#d4b106' : '#30363d'}
              strokeWidth="0.5"
              strokeDasharray={isPassed ? '0' : '2 2'}
            />
          );
        })}
      </svg>

      {/* Узлы уровней */}
      {LEVELS.map((lvl) => {
        const isPassed = lvl.id < currentLevel;
        const isCurrent = lvl.id === currentLevel;
        return (
          <div
            key={lvl.id}
            className={`level-node ${isPassed ? 'passed' : ''} ${isCurrent ? 'current' : ''}`}
            style={{ left: `${lvl.x}%`, top: `${lvl.y}%` }}
            onClick={() => handleClick(lvl.id)}
          >
            <div className="node-box">{lvl.id}</div>
            <span className="node-title">{lvl.title}</span>
          </div>
        );
      })}

      {/* Фейковые игроки — раскиданы рядом со своими уровнями */}
      {fakePlayers.map((p) => {
        const lvl = LEVELS.find((l) => l.id === p.level) || LEVELS[0];
        const offsetX = (Math.random() - 0.5) * 6;
        const offsetY = (Math.random() - 0.5) * 4;
        return (
          <div
            key={p.id}
            className="fake-player"
            style={{
              left: `${lvl.x + offsetX}%`,
              top: `${lvl.y + offsetY}%`,
            }}
            title={`${p.name} — уровень ${p.level}`}
          >
            {p.avatar}
          </div>
        );
      })}

      {/* Твой игрок — стрелка над текущим узлом */}
      <div
        className="player-icon"
        style={{ left: `${playerPos.x}%`, top: `${playerPos.y - 5}%` }}
      >
        ▲
      </div>

      {/* Панель рейтинга */}
      {showRating && (
        <div className="rating-panel">
          <h2>Tableau des scores</h2>
          <ol>
            {[...fakePlayers]
              .sort((a, b) => b.score - a.score)
              .map((p) => (
                <li key={p.id}>
                  <span className="rating-avatar">{p.avatar}</span>
                  <span className="rating-name">{p.name}</span>
                  <span className="rating-level">Ур. {p.level}</span>
                  <span className="rating-score">{p.score}</span>
                </li>
              ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default MapPage;