// src/pages/lesson/[id].tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { LEVELS } from '../../data/levels';
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
  const timerRef = useRef<number | null>(null);

  // Сброс кода при смене уровня
  useEffect(() => {
    if (level) {
      setCode(level.buggyCode || level.starterCode || '');
      setOutput('Готов к запуску...');
      setStatus('idle');
    }
  }, [levelId]);

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

  // Кнопка «Запустить код»
  const runCode = () => {
    // 1. Пусто?
    if (!code.trim()) {
      setOutput('⚠ ОШИБКА: код не обнаружен.\nНапиши решение в редакторе слева и нажми «Запустить код».');
      setStatus('failed');
      return;
    }

    // 2. Проверка правил
    const result = checkCode();

    if (!result.ok) {
      setOutput(
        '❌ ПРОВЕРКА НЕ ПРОЙДЕНА\n\n' +
        result.errors.join('\n') +
        '\n\nИсправь ошибки и попробуй снова.'
      );
      setStatus('failed');
      return;
    }

    // 3. Всё ок — эмулируем работу «компилятора»
    const lines = code.split('\n').length;
    const chars = code.length;

    setOutput(
      `✅ КОМПИЛЯЦИЯ УСПЕШНА\n` +
      `Строк: ${lines} | Символов: ${chars}\n\n` +
      `Serial Monitor:\n` +
      `> Программа запущена...\n` +
      `> Все условия уровня выполнены.\n\n` +
      `Статус: ✅ ПРОЙДЕНО`
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
            {level.type === 'design' && ' 🎨 САПР'}
            {level.type === 'diagnostic' && ' 🔧 ДИАГНОСТИКА'}
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

        <Link to="/map" className="exit-btn">Выйти на карту</Link>
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
          {status === 'passed' && <span className="status-badge success">PROIDENO</span>}
          {status === 'failed' && <span className="status-badge failed">OSHIBKA</span>}
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
    </div>
  );
};

export default LessonPage;