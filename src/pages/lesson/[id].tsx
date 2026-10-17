// src/pages/lesson/[id].tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LEVELS } from '../../data/levels';
import { THEORY } from '../../data/theory';
import TheoryModal from '../../components/TheoryModal';
import './lesson.css';

const LessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const levelId = parseInt(id || '1');
  const level = LEVELS.find((l) => l.id === levelId);

  const [code, setCode] = useState(level?.buggyCode || level?.starterCode || '');
  const [output, setOutput] = useState('Готов к запуску...');
  const [status, setStatus] = useState<'idle' | 'passed' | 'failed'>('idle');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showTheory, setShowTheory] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Сброс кода при смене уровня
  useEffect(() => {
    if (level) {
      setCode(level.buggyCode || level.starterCode || '');
      setOutput('Готов к запуску...');
      setStatus('idle');
    }
  }, [levelId]);

  // Показ теории при первом заходе на уровень
  useEffect(() => {
    if (!level || !THEORY[levelId]) return;
    const seen = localStorage.getItem(`theory_seen_${levelId}`);
    if (!seen) {
      setShowTheory(true);
    }
  }, [level, levelId]);

  const closeTheory = () => {
    setShowTheory(false);
    localStorage.setItem(`theory_seen_${levelId}`, 'true');
  };

  // Таймер для fix-заданий
  useEffect(() => {
    if (!level || level.type !== 'fix' || !level.timeLimit) return;

    setTimeLeft(level.timeLimit);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return prev;
        if (prev <= 1) {
          const fallback = level.fallbackLevel || 1;
          localStorage.setItem('everest_progress', String(fallback));
          navigate('/map');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [level, navigate]);

  if (!level) {
    return (
      <div className="lesson-container">
        <h1>Уровень не найден</h1>
        <Link to="/map">Вернуться на карту</Link>
      </div>
    );
  }

  // Проверка кода против правил уровня
  const checkCode = (): { ok: boolean; errors: string[] } => {
    const errors: string[] = [];
    for (const rule of level.checks) {
      if (!rule.pattern.test(code)) {
        errors.push('✗ ' + rule.message);
      }
    }
    return { ok: errors.length === 0, errors };
  };

  // Умная имитация Serial Monitor
  const simulateOutput = () => {
    let log = '> Программа запущена...\n';
    let hasOutput = false;

    const textMatches = code.match(/Serial\.println\s*\(\s*["']([^"']+)["']\s*\)/g);
    if (textMatches) {
      textMatches.forEach(match => {
        const text = match.match(/["']([^"']+)["']/)?.[1];
        if (text) {
          log += `> ${text}\n`;
          hasOutput = true;
        }
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

  // Кнопка «Запустить код»
  const runCode = () => {
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

  // Кнопка «Завершить уровень»
  const completeLevel = () => {
    if (status !== 'passed') {
      setOutput('⚠ Сначала запусти код и убедись, что он проходит проверку.');
      return;
    }

    const nextLevel = levelId + 1;
    const currentProgress = parseInt(localStorage.getItem('everest_progress') || '1');
    if (nextLevel > currentProgress) {
      localStorage.setItem('everest_progress', String(nextLevel));
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
          {THEORY[levelId] && (
            <button
              className="theory-btn"
              onClick={() => setShowTheory(true)}
            >
              📘 Теория
            </button>
          )}
          <Link to="/map" className="exit-btn">Выйти на карту</Link>
        </div>
      </header>

      <div className="lesson-body">
        <div className="code-editor-panel">
          <div className="panel-header">Редактор кода</div>
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

      {/* Модалка теории */}
      {showTheory && THEORY[levelId] && (
        <TheoryModal
          title={THEORY[levelId].title}
          content={THEORY[levelId].content}
          onClose={closeTheory}
        />
      )}
    </div>
  );
};

export default LessonPage;