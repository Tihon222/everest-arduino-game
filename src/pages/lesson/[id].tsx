// src/pages/lesson/[id].tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LEVELS } from '../../data/levels';
import { THEORY } from '../../data/theory';
import TheoryModal from '../../components/TheoryModal';
import FallingScreen from '../../components/FallingScreen';
import { useAuth } from '../../context/AuthContext';
import { getProgress, saveProgress, addScore } from '../../services/progress';
import './lesson.css';

const LessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const levelId = parseInt(id || '1');
  const level = LEVELS.find((l) => l.id === levelId);
  const { user } = useAuth();

  const [code, setCode] = useState(level?.buggyCode || level?.starterCode || '');
  const [output, setOutput] = useState('Готов к запуску...');
  const [status, setStatus] = useState<'idle' | 'passed' | 'failed'>('idle');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showTheory, setShowTheory] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isFalling, setIsFalling] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (level) {
      setCode(level.buggyCode || level.starterCode || '');
      setOutput('Готов к запуску...');
      setStatus('idle');
      setAttempts(0);
    }
  }, [levelId]);

  useEffect(() => {
    if (!level || !THEORY[levelId]) return;
    if (level.type === 'fix') return;
    const seen = localStorage.getItem(`theory_seen_${levelId}`);
    if (!seen) {
      setShowTheory(true);
    }
  }, [level, levelId]);

  const closeTheory = () => {
    setShowTheory(false);
    localStorage.setItem(`theory_seen_${levelId}`, 'true');
  };

  useEffect(() => {
    if (!level || level.type !== 'fix' || !level.timeLimit) return;

    setTimeLeft(level.timeLimit);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return prev;
        if (prev <= 1) {
          const fallback = level.fallbackLevel || 1;
          localStorage.setItem('everest_progress', String(fallback));
          setIsFalling(true);

          if (user) {
            saveProgress(user.id, { is_falling: true, level: fallback })
              .catch(e => console.error('saveProgress error:', e));
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [level, navigate, user]);

  if (!level) {
    return (
      <div className="lesson-container">
        <h1>Уровень не найден</h1>
        <Link to="/map">Вернуться на карту</Link>
      </div>
    );
  }

  const checkCode = (): { ok: boolean; errors: string[] } => {
    const errors: string[] = [];
    for (const rule of level.checks) {
      if (!rule.pattern.test(code)) {
        errors.push('✗ ' + rule.message);
      }
    }
    return { ok: errors.length === 0, errors };
  };

  const simulateOutput = () => {
    let log = '> Программа запущена...\n';
    let hasOutput = false;

    const textMatches = code.match(/Serial\.println\s*\(\s*["']([^"']+)["']\s*\)/g);
    if (textMatches) {
      textMatches.forEach(match => {
        const text = match.match(/["']([^"']+)["']/)?.[1];
        if (text) { log += `> ${text}\n`; hasOutput = true; }
      });
    }

    const varMatches = code.match(/Serial\.println\s*\(\s*(\w+)\s*\)/g);
    if (varMatches) {
      varMatches.forEach(match => {
        const varName = match.match(/\(\s*(\w+)\s*\)/)?.[1];
        if (varName && varName !== 'digitalRead' && varName !== 'analogRead') {
          const varValueMatch = code.match(new RegExp(`${varName}\\s*=\\s*(\\d+)`));
          if (varValueMatch) {
            log += `> ${varValueMatch[1]}\n`;
          } else {
            log += `> [значение ${varName}]\n`;
          }
          hasOutput = true;
        }
      });
    }

    if (code.includes('for') && (code.includes('Serial.println') || code.includes('Serial.print'))) {
      log += '> 0\n> 1\n> 2\n> 3\n> 4\n';
      hasOutput = true;
    }

    if (code.includes('analogRead') && code.includes('Serial.println')) {
      log += '> 512\n';
      hasOutput = true;
    }

    if (!hasOutput) {
      log += '> (Код выполнен, но ничего не выведено)\n';
    }

    return log;
  };

  const runCode = () => {
    setAttempts((prev) => prev + 1);

    if (!code.trim()) {
      setOutput('⚠ ОШИБКА: код не обнаружен.\nНапиши решение в редакторе и нажми «Запустить код».');
      setStatus('failed');
      return;
    }

    const result = checkCode();
    if (!result.ok) {
      setOutput('❌ ПРОВЕРКА НЕ ПРОЙДЕНА\n\n' + result.errors.join('\n') + '\n\nИсправь ошибки и попробуй снова.');
      setStatus('failed');
      return;
    }

    const lines = code.split('\n').length;
    const chars = code.length;
    const simLog = simulateOutput();

    setOutput(
      `✅ КОМПИЛЯЦИЯ УСПЕШНА\n` +
      `Строк: ${lines} | Символов: ${chars}\n\n` +
      `Serial Monitor:\n` +
      simLog +
      `\nСтатус: ✅ ПРОЙДЕНО`
    );
    setStatus('passed');
  };

  const completeLevel = async () => {
    if (status !== 'passed') {
      setOutput('⚠ Сначала запусти код и убедись, что он проходит проверку.');
      return;
    }

    const nextLevel = levelId + 1;
    const currentProgress = parseInt(localStorage.getItem('everest_progress') || '1');
    if (nextLevel > currentProgress) {
      localStorage.setItem('everest_progress', String(nextLevel));
    }

    if (user) {
      try {
        const existing = await getProgress(user.id);
        const prevAttempts = existing?.attempts || {};
        const newAttempts = {
          ...prevAttempts,
          [levelId]: (prevAttempts[levelId] || 0) + attempts,
        };

        const penalty = Math.max(0, (attempts - 1) * 10);
        const points = Math.max(0, 100 - penalty);

        await saveProgress(user.id, {
          level: Math.max(nextLevel, existing?.level || 1),
          attempts: newAttempts,
          rest_until: null,
          is_falling: false,
        });

        await addScore(user.id, points);
      } catch (e) {
        console.error('Ошибка сохранения прогресса:', e);
      }
    }

    if (timerRef.current) clearInterval(timerRef.current);
    navigate('/map');
  };

  return (
    <div className="lesson-container">
      <header className="lesson-header">
        <div>
          <h1>
            Уровень {id}: {level.title}
            {level.type === 'fix' && ' ⚠ ОБРЫВ'}
          </h1>
          {level.reference && (
            <div className="level-reference">{level.reference}</div>
          )}
        </div>

        {timeLeft !== null && (
          <div className={`timer ${timeLeft < 15 ? 'danger' : ''}`}>
            ⏱ {timeLeft} сек
          </div>
        )}

        <div className="header-actions">
          {THEORY[levelId] && level.type !== 'fix' && (
            <button className="theory-btn" onClick={() => setShowTheory(true)}>
              📘 Теория
            </button>
          )}
          <Link to="/map" className="exit-btn">Выйти на карту</Link>
        </div>
      </header>

      <div className="lesson-body">
        <div className="code-editor-panel">
          <div className="panel-header">
            Редактор кода
            {attempts > 0 && (
              <span style={{ fontSize: 11, color: '#8b949e', fontWeight: 'normal' }}>
                {' '}· попыток: {attempts}
              </span>
            )}
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="code-area"
            spellCheck={false}
          />
          <button
            onClick={runCode}
            className={`run-btn ${status === 'passed' ? 'success' : ''}`}
          >
            {status === 'passed' ? '✅ Код верен' : 'Запустить код'}
          </button>
        </div>

        <div className="task-panel">
          <div className="panel-header">Задание</div>
          <div className="task-content">
            <p style={{ whiteSpace: 'pre-wrap' }}>{level.task}</p>
          </div>
        </div>
      </div>

      <div className="serial-monitor">
        <div className="panel-header">
          Serial Monitor
          {status === 'passed' && <span className="status-badge success">ПРОЙДЕНО</span>}
          {status === 'failed' && <span className="status-badge failed">ОШИБКА</span>}
        </div>
        <pre className={`monitor-output ${status}`}>{output}</pre>
      </div>

      <button
        onClick={completeLevel}
        className="complete-btn"
        disabled={status !== 'passed'}
        style={{
          opacity: status !== 'passed' ? 0.4 : 1,
          cursor: status !== 'passed' ? 'not-allowed' : 'pointer',
        }}
      >
        {status !== 'passed' ? 'Сначала запусти код' : 'Завершить уровень →'}
      </button>

      {showTheory && THEORY[levelId] && (
        <TheoryModal
          title={THEORY[levelId].title}
          content={THEORY[levelId].content}
          onClose={closeTheory}
        />
      )}

      {isFalling && (
        <FallingScreen
          onDone={() => {
            setIsFalling(false);
            navigate('/map');
          }}
        />
      )}
    </div>
  );
};

export default LessonPage;