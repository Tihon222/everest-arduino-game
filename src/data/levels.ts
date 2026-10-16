// src/data/levels.ts
export interface Level {
  id: number;
  title: string;
  x: number;
  y: number;
  task: string;
  type: 'write' | 'fix' | 'design' | 'diagnostic';
  buggyCode?: string;
  starterCode?: string;
  timeLimit?: number;
  fallbackLevel?: number;
  reference?: string;
  checks: { pattern: RegExp; message: string }[];
}

export const LEVELS: Level[] = [
  // ═══ ПОЛКА 1: 1–10 — вправо ═══
  { id: 1, title: 'Подножие', x: 8, y: 92, type: 'write',
    task: 'Объяви переменную целого типа со значением 10.\nПример: int x = 10;',
    checks: [{ pattern: /int\s+\w+\s*=\s*\d+\s*;/, message: 'Объяви int-переменную: int x = 10;' }] },
  { id: 2, title: 'Базовый лагерь', x: 16, y: 91, type: 'write',
    task: 'Открой Serial-порт на скорости 9600.\nSerial.begin(9600);',
    checks: [{ pattern: /Serial\s*\.\s*begin\s*\(\s*9600\s*\)/, message: 'Нужен Serial.begin(9600);' }] },
  { id: 3, title: 'Первый вывод', x: 24, y: 90, type: 'write',
    task: 'Выведи переменную в Serial Monitor:\nSerial.println(x);',
    checks: [{ pattern: /Serial\s*\.\s*println\s*\(\s*\w+\s*\)/, message: 'Нужен Serial.println(имяПеременной);' }] },
  { id: 4, title: 'Лагерь 1', x: 32, y: 90, type: 'write',
    task: 'Объяви две int-переменные с любыми значениями.',
    checks: [{ pattern: /int\s+\w+\s*=\s*\d+[\s\S]*int\s+\w+\s*=\s*\d+/, message: 'Нужно две переменные' }] },
  { id: 5, title: 'Сумма', x: 40, y: 90, type: 'write',
    task: 'Сложи две переменные и выведи результат:\nSerial.println(a + b);',
    checks: [{ pattern: /Serial\s*\.\s*println\s*\(\s*\w+\s*\+\s*\w+\s*\)/, message: 'Сложи две переменные внутри Serial.println()' }] },
  { id: 6, title: 'Ледник', x: 48, y: 90, type: 'write',
    task: 'Если x > 10 — выведи "больше" через Serial.println.',
    checks: [
      { pattern: /if\s*\(\s*\w+\s*>\s*10\s*\)/, message: 'Нужно if (x > 10)' },
      { pattern: /Serial\s*\.\s*println/, message: 'Выведи результат' }] },
  { id: 7, title: 'Развилка', x: 56, y: 90, type: 'write',
    task: 'Добавь else к if. Если условие не выполняется — выведи "меньше".',
    checks: [
      { pattern: /if\s*\(/, message: 'Нужен if' },
      { pattern: /else/, message: 'Нужен else' },
      { pattern: /Serial\s*\.\s*println[\s\S]*Serial\s*\.\s*println/, message: 'Нужны два вывода: в if и в else' }] },
  { id: 8, title: 'Цикл for', x: 64, y: 90, type: 'write',
    task: 'Создай цикл for от 0 до 5.',
    checks: [{ pattern: /for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*5\s*;/, message: 'Нужен for с началом 0 и условием < 5' }] },
  { id: 9, title: 'Цикл while', x: 72, y: 90, type: 'write',
    task: 'Цикл while, пока counter < 3.\nУвеличивай counter внутри.',
    checks: [
      { pattern: /while\s*\(\s*\w+\s*<\s*3\s*\)/, message: 'Нужен while (counter < 3)' },
      { pattern: /\w+\s*\+\+/, message: 'Увеличивай счётчик: counter++' }] },
  { id: 10, title: 'Вложенный цикл', x: 85, y: 85, type: 'write',
    task: 'Сделай два цикла for: один вложен в другой.',
    checks: [{ pattern: /for[\s\S]*for/, message: 'Нужны два цикла for' }] },

  // ═══ ПОЛКА 2: 11–15 — влево ═══
  { id: 11, title: 'Обрыв 1', x: 74, y: 78, type: 'fix',
    timeLimit: 90, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 90 СЕКУНД!\n\nПропущена точка с запятой после Serial.begin(9600).',
    buggyCode: 'void setup() {\n  Serial.begin(9600)\n}',
    checks: [{ pattern: /Serial\s*\.\s*begin\s*\(\s*9600\s*\)\s*;/, message: 'Пропущена ; после Serial.begin(9600)' }] },
  { id: 12, title: 'Обрыв 2', x: 65, y: 75, type: 'fix',
    timeLimit: 90, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 90 СЕКУНД!\n\nПеременная используется без объявления.',
    buggyCode: 'void setup() {\n  Serial.begin(9600);\n  Serial.println(x);\n}',
    checks: [
      { pattern: /int\s+\w+/, message: 'Переменная x не объявлена' },
      { pattern: /Serial\s*\.\s*println/, message: 'Нужен Serial.println()' }] },
  { id: 13, title: 'Обрыв 3', x: 55, y: 72, type: 'fix',
    timeLimit: 120, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 120 СЕКУНД!\n\nУсловие в if некорректное.',
    buggyCode: 'int x = 10;\nvoid setup() {\n  Serial.begin(9600);\n  if (x < 5) {\n    Serial.println("yes");\n  }\n}',
    checks: [{ pattern: /if\s*\(\s*\w+\s*>\s*5\s*\)/, message: 'Условие должно быть x > 5' }] },
  { id: 14, title: 'Обрыв 4', x: 45, y: 69, type: 'fix',
    timeLimit: 120, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 120 СЕКУНД!\n\nЦикл for бесконечный.',
    buggyCode: 'void setup() {\n  Serial.begin(9600);\n  for (int i = 0; i > 5; i++) {\n    Serial.println(i);\n  }\n}',
    checks: [{ pattern: /for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*5\s*;/, message: 'Условие должно быть i < 5' }] },
  { id: 15, title: 'Обрыв 5', x: 35, y: 66, type: 'fix',
    timeLimit: 150, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 150 СЕКУНД!\n\nФункция вызывается без скобок.',
    buggyCode: 'void setup() {\n  Serial.begin(9600);\n  printHello;\n}\n\nvoid printHello() {\n  Serial.println("Hello");\n}',
    checks: [{ pattern: /printHello\s*\(\s*\)\s*;/, message: 'Функция вызывается без скобок: printHello();' }] },

  // ═══ 16 — чуть вверх ═══
  { id: 16, title: 'Схема', x: 25, y: 60, type: 'design',
    reference: 'КИМ 09.02.01-1-2027, Задание 1',
    task: '🎯 ЗАДАНИЕ 1: Проектирование цифровых систем.\n\nВ схеме должны быть: NE555, 4-разрядный счётчик, 5 светодиодов, 5 резисторов по 220 Ом.',
    checks: [
      { pattern: /NE555/, message: 'Укажи NE555' },
      { pattern: /счётчик|counter/i, message: 'Укажи 4-разрядный счётчик' },
      { pattern: /220/, message: 'Укажи резисторы 220 Ом' }] },

  // ═══ ПОЛКА 3: 17–19 — вправо ═══
  { id: 17, title: 'Сборка', x: 25, y: 51, type: 'design',
    reference: 'КИМ 09.02.01-1-2027, Задание 1',
    task: '🎯 ЗАДАНИЕ 1: Опиши: питание 5V, GND, сигнальные линии.',
    checks: [
      { pattern: /5V|5\s*V/, message: 'Укажи питание 5V' },
      { pattern: /GND|земл/i, message: 'Укажи GND' },
      { pattern: /Bat|батар|источник/i, message: 'Укажи источник питания' }] },
  { id: 18, title: 'Печатная плата', x: 35, y: 50, type: 'design',
    reference: 'КИМ 09.02.01-1-2027, Задание 1',
    task: '🎯 ЗАДАНИЕ 1: Сколько слоёв? Габариты в мм? Расположение компонентов?',
    checks: [
      { pattern: /сло[йя]|layer/i, message: 'Укажи количество слоёв' },
      { pattern: /мм|mm/, message: 'Укажи габариты в мм' }] },
  { id: 19, title: 'Документация', x: 45, y: 50, type: 'design',
    reference: 'КИМ 09.02.01-1-2027, Задание 1',
    task: '🎯 ЗАДАНИЕ 1: Таблица компонентов (U1 NE555, U2 счётчик, R1..R5, D1..D5).',
    checks: [
      { pattern: /U1/, message: 'Укажи U1 (NE555)' },
      { pattern: /U2/, message: 'Укажи U2 (счётчик)' },
      { pattern: /R1|R2|R3/, message: 'Укажи резисторы R1..R5' },
      { pattern: /D1|D2|D3/, message: 'Укажи светодиоды D1..D5' }] },

  // ═══ ПОЛКА 4: 20–22 — влево (змейка) ═══
  { id: 20, title: 'Проверка', x: 55, y: 50, type: 'design',
    reference: 'КИМ 09.02.01-1-2027, Задание 1',
    task: '🎯 ЗАДАНИЕ 1: Опиши проверку схемы во встроенных инструментариях САПР.',
    checks: [
      { pattern: /симул|simulat|проверк/i, message: 'Опиши процесс проверки' },
      { pattern: /осциллограф|мультиметр|probe/i, message: 'Укажи инструмент проверки' }] },
  { id: 21, title: 'Секундомер', x: 65, y: 50, type: 'write',
    reference: 'КИМ 09.02.01-1-2027, Задание 2',
    task: '🎯 ЗАДАНИЕ 2: Открой Serial.begin(9600); и объяви переменную для счёта секунд.',
    starterCode: 'void setup() {\n  // Инициализация\n}\n\nvoid loop() {\n  // Основной цикл\n}',
    checks: [
      { pattern: /Serial\s*\.\s*begin\s*\(\s*9600\s*\)/, message: 'Нужен Serial.begin(9600);' },
      { pattern: /int\s+\w+\s*=\s*0/, message: 'Объяви int-счётчик = 0' }] },
  { id: 22, title: 'Кнопка', x: 75, y: 50, type: 'write',
    reference: 'КИМ 09.02.01-1-2027, Задание 2',
    task: '🎯 ЗАДАНИЕ 2: Пин 2 как INPUT_PULLUP + digitalRead(2).',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n}',
    checks: [
      { pattern: /pinMode\s*\(\s*2\s*,\s*INPUT_PULLUP\s*\)/, message: 'Нужен pinMode(2, INPUT_PULLUP)' },
      { pattern: /digitalRead\s*\(\s*2\s*\)/, message: 'Нужен digitalRead(2)' }] },

  // ═══ ПОЛКА 5: 23–25 — вправо к вершине ═══
  { id: 23, title: 'Мигание', x: 86, y: 50, type: 'write',
    reference: 'КИМ 09.02.01-1-2027, Задание 2',
    task: '🎯 ЗАДАНИЕ 2: Точка мигает каждую секунду через millis().',
    checks: [
      { pattern: /millis\s*\(\s*\)/, message: 'Используй millis()' },
      { pattern: /1000/, message: 'Интервал 1000 мс' }] },
  { id: 24, title: 'Режимы', x: 85, y: 40, type: 'write',
    reference: 'КИМ 09.02.01-1-2027, Задание 2',
    task: '🎯 ЗАДАНИЕ 2: Три режима (пуск, стоп, сброс) по кнопке.',
    checks: [
      { pattern: /switch|if\s*\(/, message: 'Используй switch или if/else' },
      { pattern: /state|mode|режим/i, message: 'Нужна переменная для режима' }] },
  { id: 25, title: 'Счёт до 60', x: 68, y: 40, type: 'write',
    reference: 'КИМ 09.02.01-1-2027, Задание 2',
    task: '🎯 ЗАДАНИЕ 2: Счёт 0–60, остановка на 60, вывод через Serial.println.',
    checks: [
      { pattern: /if\s*\(\s*\w+\s*>=\s*60\s*\)/, message: 'Проверка >= 60' },
      { pattern: /Serial\s*\.\s*println/, message: 'Serial.println' }] },

  // ═══ ПОЛКА 6: 26–30 — спуск вправо-вниз ═══
  { id: 26, title: 'Диагностика', x: 55, y: 40, type: 'diagnostic',
    reference: 'КИМ 09.02.01-1-2027, Задание 3',
    task: '🎯 ЗАДАНИЕ 3: ПК не включается, экран чёрный. Опиши 3 шага диагностики.',
    checks: [
      { pattern: /питани|power|кабел/i, message: 'Проверь кабель питания' },
      { pattern: /ОЗУ|RAM|памят/i, message: 'Проверь ОЗУ' },
      { pattern: /материн|motherboard|24-?pin/i, message: 'Проверь питание материнской платы' }] },
  { id: 27, title: 'POST-коды', x: 40, y: 39, type: 'diagnostic',
    reference: 'КИМ 09.02.01-1-2027, Задание 3',
    task: '🎯 ЗАДАНИЕ 3: 1 длинный / 1 длинный + 2 коротких / 3 длинных — что означают?',
    checks: [
      { pattern: /ОЗУ|RAM|памят/i, message: 'Упомяни ОЗУ' },
      { pattern: /видеокарт|GPU|график/i, message: 'Упомяни видеокарту' },
      { pattern: /BIOS|материн/i, message: 'Упомяни BIOS' }] },
  { id: 28, title: 'Разбивка диска', x: 41, y: 30, type: 'diagnostic',
    reference: 'КИМ 09.02.01-1-2027, Задание 3',
    task: '🎯 ЗАДАНИЕ 3: Разбей HDD на C (20%) и D (80%). Какие утилиты?',
    checks: [
      { pattern: /Disk\s*Management|Управление\s*дисками|diskpart/i, message: 'Disk Management / diskpart' },
      { pattern: /20\s*%?/, message: '20% для C' },
      { pattern: /80\s*%?/, message: '80% для D' }] },
  { id: 29, title: 'Сеть', x: 48, y: 30, type: 'diagnostic',
    reference: 'КИМ 09.02.01-1-2027, Задание 3',
    task: '🎯 ЗАДАНИЕ 3: Патч-корд UTP + RJ-45. Порядок T568B + LAN-тестер.',
    checks: [
      { pattern: /бело-?оранж|white-?orange/i, message: 'Бело-оранжевый' },
      { pattern: /оранж|orange/i, message: 'Оранжевый' },
      { pattern: /бело-?зел|white-?green/i, message: 'Бело-зелёный' },
      { pattern: /LAN-?тестер|тестер|tester/i, message: 'LAN-тестер' }] },
  { id: 30, title: 'Мастер', x: 53, y: 25, type: 'diagnostic',
    reference: 'КИМ 09.02.01-1-2027, Задание 3',
    task: '🎯 ФИНАЛ: Полный цикл: осмотр → питание → POST → устранение → ОС → сеть.',
    checks: [
      { pattern: /осмотр|визуальн/i, message: 'Визуальный осмотр' },
      { pattern: /питани|power/i, message: 'Питание' },
      { pattern: /POST/i, message: 'POST' },
      { pattern: /драйвер|driver/i, message: 'Драйверы' },
      { pattern: /DHCP|IP-?адрес|сеть/i, message: 'Сеть' },
      { pattern: /отч[её]т|report/i, message: 'Отчёт' }] },
];