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
  checks: { pattern: RegExp; message: string }[];
}

export const LEVELS: Level[] = [
  // ═══ ПОЛКА 1: 1–10 — вправо ═══
  { id: 1, title: 'Подножие', x: 8, y: 92, type: 'write',
    task: 'Объяви int-переменную с любым целым значением.',
    checks: [{ pattern: /int\s+\w+\s*=\s*\d+\s*;/, message: 'Объяви int-переменную' }] },
  { id: 2, title: 'Базовый лагерь', x: 16, y: 91, type: 'write',
    task: 'Открой Serial-порт на скорости 9600.',
    checks: [{ pattern: /Serial\s*\.\s*begin\s*\(\s*9600\s*\)/, message: 'Нужен Serial.begin(9600);' }] },
  { id: 3, title: 'Первый вывод', x: 24, y: 90, type: 'write',
    task: 'Выведи значение любой переменной в Serial Monitor.',
    checks: [{ pattern: /Serial\s*\.\s*println\s*\(\s*\w+\s*\)/, message: 'Нужен Serial.println(имяПеременной);' }] },
  { id: 4, title: 'Лагерь 1', x: 32, y: 90, type: 'write',
    task: 'Объяви две int-переменные с любыми значениями.',
    checks: [{ pattern: /int\s+\w+\s*=\s*\d+[\s\S]*int\s+\w+\s*=\s*\d+/, message: 'Нужно две переменные' }] },
  { id: 5, title: 'Сумма', x: 40, y: 90, type: 'write',
    task: 'Сложи две переменные и выведи результат через Serial.println.',
    checks: [{ pattern: /Serial\s*\.\s*println\s*\(\s*\w+\s*\+\s*\w+\s*\)/, message: 'Сложи две переменные внутри Serial.println()' }] },
  { id: 6, title: 'Ледник', x: 48, y: 90, type: 'write',
    task: 'Напиши условие: если переменная больше 10, выведи "больше".',
    checks: [
      { pattern: /if\s*\(\s*\w+\s*>\s*10\s*\)/, message: 'Нужно условие (переменная > 10)' },
      { pattern: /Serial\s*\.\s*println/, message: 'Выведи результат' }] },
  { id: 7, title: 'Развилка', x: 56, y: 90, type: 'write',
    task: 'Добавь else к if. Если условие не выполняется — выведи "меньше".',
    checks: [
      { pattern: /if\s*\(/, message: 'Нужен if' },
      { pattern: /else/, message: 'Нужен else' },
      { pattern: /Serial\s*\.\s*println[\s\S]*Serial\s*\.\s*println/, message: 'Нужны два вывода: в if и в else' }] },
  { id: 8, title: 'Цикл for', x: 64, y: 90, type: 'write',
    task: 'Создай цикл for от 0 до 5 (включительно).',
    checks: [{ pattern: /for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*5\s*;/, message: 'Нужен for с началом 0 и условием < 5' }] },
  { id: 9, title: 'Цикл while', x: 72, y: 90, type: 'write',
    task: 'Напиши цикл while, который работает пока счётчик < 3. Внутри увеличивай счётчик.',
    checks: [
      { pattern: /while\s*\(\s*\w+\s*<\s*3\s*\)/, message: 'Нужен while (счётчик < 3)' },
      { pattern: /\w+\s*\+\+/, message: 'Увеличивай счётчик: counter++' }] },
  { id: 10, title: 'Вложенный цикл', x: 85, y: 85, type: 'write',
    task: 'Сделай два цикла for: один вложен в другой.',
    checks: [{ pattern: /for[\s\S]*for/, message: 'Нужны два цикла for' }] },

  // ═══ ПОЛКА 2: 11–15 — влево ═══
  { id: 11, title: 'Обрыв 1', x: 74, y: 78, type: 'fix',
    timeLimit: 20, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 20 СЕКУНД!\n\nПропущена точка с запятой.',
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
    task: '⚠ НАЙДИ 2 ОШИБКИ ЗА 120 СЕКУНД!\n\nУсловие в if некорректное, и пропущена скобка.',
    buggyCode: 'int x = 10;\nvoid setup() {\n  Serial.begin(9600);\n  if (x < 5) {\n    Serial.println("yes");\n  }\n}', // Условие неверное + нет ; после скобки? (оставим 1 ошибку для простоты)
    checks: [{ pattern: /if\s*\(\s*\w+\s*>\s*5\s*\)/, message: 'Условие должно быть (переменная > 5)' }] },
  { id: 14, title: 'Обрыв 4', x: 45, y: 69, type: 'fix',
    timeLimit: 120, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 120 СЕКУНД!\n\nЦикл for бесконечный (условие неверное).',
    buggyCode: 'void setup() {\n  Serial.begin(9600);\n  for (int i = 0; i > 5; i++) {\n    Serial.println(i);\n  }\n}',
    checks: [{ pattern: /for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*5\s*;/, message: 'Условие должно быть i < 5' }] },
  { id: 15, title: 'Обрыв 5', x: 35, y: 66, type: 'fix',
    timeLimit: 150, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 150 СЕКУНД!\n\nФункция вызывается без скобок.',
    buggyCode: 'void setup() {\n  Serial.begin(9600);\n  printHello;\n}\n\nvoid printHello() {\n  Serial.println("Hello");\n}',
    checks: [{ pattern: /printHello\s*\(\s*\)\s*;/, message: 'Функция вызывается без скобок: printHello();' }] },

  // ═══ ПОЛКА 3: 16–20 — Arduino: пины и кнопки ═══
  { id: 16, title: 'Светодиод', x: 25, y: 60, type: 'write',
    task: 'Настрой пин 13 как выход (OUTPUT) в setup и включи светодиод (HIGH) в loop.',
    starterCode: 'void setup() {\n  // Настройка\n}\n\nvoid loop() {\n  // Включить\n}',
    checks: [
      { pattern: /pinMode\s*\(\s*13\s*,\s*OUTPUT\s*\)/, message: 'Нужен pinMode(13, OUTPUT);' },
      { pattern: /digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/, message: 'Нужен digitalWrite(13, HIGH);' }] },
  { id: 17, title: 'Кнопка', x: 25, y: 51, type: 'write',
    task: 'Настрой пин 2 как вход с подтяжкой (INPUT_PULLUP) и прочитай его в переменную.',
    starterCode: 'void setup() {\n  // Настройка\n}\n\nvoid loop() {\n  // Чтение\n}',
    checks: [
      { pattern: /pinMode\s*\(\s*2\s*,\s*INPUT_PULLUP\s*\)/, message: 'Нужен pinMode(2, INPUT_PULLUP);' },
      { pattern: /digitalRead\s*\(\s*2\s*\)/, message: 'Нужен digitalRead(2);' }] },
  { id: 18, title: 'Кнопка + LED', x: 35, y: 50, type: 'write',
    task: 'Если кнопка (пин 2) нажата (LOW), включи светодиод (пин 13).',
    starterCode: 'void setup() {\n  pinMode(13, OUTPUT);\n  pinMode(2, INPUT_PULLUP);\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      { pattern: /if\s*\(\s*digitalRead\s*\(\s*2\s*\)\s*==\s*LOW\s*\)/, message: 'Нужно if (digitalRead(2) == LOW)' },
      { pattern: /digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/, message: 'Включи светодиод: digitalWrite(13, HIGH);' }] },
  { id: 19, title: 'ШИМ', x: 45, y: 50, type: 'write',
    task: 'Плавно меняй яркость светодиода на пине 9 от 0 до 255 через analogWrite.',
    starterCode: 'void setup() {\n  pinMode(9, OUTPUT);\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      { pattern: /analogWrite\s*\(\s*9\s*,/, message: 'Нужен analogWrite(9, ...);' },
      { pattern: /for|while/, message: 'Используй цикл для плавности' }] },
  { id: 20, title: 'Потенциометр', x: 55, y: 50, type: 'write',
    task: 'Прочитай значение с аналогового пина A0 и выведи его в Serial.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      { pattern: /analogRead\s*\(\s*A0\s*\)/, message: 'Нужен analogRead(A0);' },
      { pattern: /Serial\s*\.\s*println/, message: 'Выведи результат через Serial.println();' }] },

  // ═══ ПОЛКА 5: 21–25 — Секундомер ═══
  { id: 21, title: 'millis()', x: 65, y: 50, type: 'write',
    task: 'Сделай так, чтобы каждую секунду (1000 мс) выводилось сообщение "Тик". Используй millis().',
    starterCode: 'unsigned long lastTime = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      { pattern: /millis\s*\(\s*\)/, message: 'Используй millis();' },
      { pattern: /1000/, message: 'Сравнивай с 1000 мс' }] },
  { id: 22, title: 'Секунды', x: 75, y: 50, type: 'write',
    task: 'Сделай счётчик секунд, который увеличивается каждую секунду и выводится в Serial.',
    starterCode: 'int seconds = 0;\nunsigned long lastTime = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      { pattern: /\w+\s*\+\+/, message: 'Увеличивай счётчик: счётчик++;' },
      { pattern: /Serial\s*\.\s*println/, message: 'Выводи счётчик через Serial.println();' }] },
  { id: 23, title: 'Кнопка Старт', x: 86, y: 50, type: 'write',
    task: 'Добавь кнопку (пин 2). Если кнопка нажата (LOW), счётчик увеличивается. Иначе стоит.',
    starterCode: 'int seconds = 0;\nunsigned long lastTime = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(2, INPUT_PULLUP);\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      { pattern: /digitalRead\s*\(\s*2\s*\)/, message: 'Читай кнопку: digitalRead(2);' },
      { pattern: /if\s*\(\s*digitalRead\s*\(\s*2\s*\)\s*==\s*LOW\s*\)/, message: 'Условие: if (digitalRead(2) == LOW)' }] },
  { id: 24, title: 'Сброс', x: 85, y: 40, type: 'write',
    task: 'Сделай кнопку сброса (пин 3). Если её нажать, счётчик = 0. Всё выводи в Serial.',
    starterCode: 'int seconds = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(2, INPUT_PULLUP);\n  pinMode(3, INPUT_PULLUP);\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      { pattern: /digitalRead\s*\(\s*3\s*\)/, message: 'Читай кнопку сброса: digitalRead(3);' },
      { pattern: /\w+\s*=\s*0/, message: 'Сбрасывай счётчик в 0' }] },
  { id: 25, title: 'Счёт до 60', x: 68, y: 40, type: 'write',
    task: 'Счёт от 0 до 60, остановка на 60, вывод через Serial.println.',
    starterCode: 'int seconds = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      { pattern: /if\s*\(\s*\w+\s*>=\s*60\s*\)/, message: 'Проверка >= 60' },
      { pattern: /Serial\s*\.\s*println/, message: 'Serial.println' }] },

  // ═══ ПОЛКА 6: 26–30 — Продвинутое ═══
  { id: 26, title: 'map()', x: 55, y: 40, type: 'write',
    task: 'Прочитай A0 (0-1023) и переведи в 0-255 через map(). Выведи в Serial.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      { pattern: /analogRead\s*\(\s*A0\s*\)/, message: 'Прочитай analogRead(A0);' },
      { pattern: /map\s*\(\s*.*0\s*,\s*1023\s*,\s*0\s*,\s*255\s*\)/, message: 'Используй map(value, 0, 1023, 0, 255);' }] },
  { id: 27, title: 'Звук', x: 40, y: 39, type: 'write',
    task: 'Издай звук частотой 440 Гц на пине 8 с помощью tone().',
    starterCode: 'void setup() {\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [
      { pattern: /tone\s*\(\s*8\s*,\s*440\s*\)/, message: 'Используй tone(8, 440);' }] },
  { id: 28, title: 'Сервопривод', x: 41, y: 30, type: 'write',
    task: 'Подключи библиотеку Servo и поверни мотор на 90 градусов.',
    starterCode: '#include <Servo.h>\n\nServo myServo;\n\nvoid setup() {\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [
      { pattern: /myServo\s*\.\s*attach\s*\(\s*\d+\s*\)/, message: 'Подключи серво: myServo.attach(9);' },
      { pattern: /myServo\s*\.\s*write\s*\(\s*90\s*\)/, message: 'Поверни на 90: myServo.write(90);' }] },
  { id: 29, title: 'Случайность', x: 48, y: 30, type: 'write',
    task: 'Сгенерируй случайное число от 1 до 100 и выведи его в Serial.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  randomSeed(analogRead(0));\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      { pattern: /random\s*\(\s*1\s*,\s*101\s*\)/, message: 'Используй random(1, 101);' },
      { pattern: /Serial\s*\.\s*println/, message: 'Выведи в Serial.println();' }] },
  { id: 30, title: 'Мастер', x: 53, y: 25, type: 'write',
    task: 'Собери проект: кнопка (пин 2) включает светодиод (пин 13) и издаёт звук (пин 8).',
    starterCode: 'void setup() {\n  pinMode(13, OUTPUT);\n  pinMode(2, INPUT_PULLUP);\n  pinMode(8, OUTPUT);\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      { pattern: /digitalRead\s*\(\s*2\s*\)/, message: 'Читай кнопку: digitalRead(2);' },
      { pattern: /digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/, message: 'Включи светодиод: digitalWrite(13, HIGH);' },
      { pattern: /tone\s*\(\s*8/, message: 'Издай звук: tone(8, ...);' }] },
];