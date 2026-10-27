// src/data/levels.ts
export interface Level {
  id: number;
  title: string;
  x: number;
  y: number;
  task: string;
  type: 'write' | 'fix';
  buggyCode?: string;
  starterCode?: string;
  timeLimit?: number;
  fallbackLevel?: number;
  reference?: string;
  checks: { pattern: RegExp; message: string }[];
}

export const LEVELS: Level[] = [
  // ═══ ЭТАП 1: 1–10 (основы) ═══
  { id: 1, title: 'Подножие', x: 8, y: 92, type: 'write',
    task: 'Объяви целочисленную переменную с любым значением.',
    starterCode: 'void setup() {\n  // Код здесь\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /int\s+\w+\s*=\s*\d+\s*;/, message: 'Нужно объявить переменную типа int' }] },
  { id: 2, title: 'Базовый лагерь', x: 16, y: 91, type: 'write',
    task: 'Открой Serial-порт на скорости 9600.',
    starterCode: 'void setup() {\n  // Настройка\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /Serial\s*\.\s*begin\s*\(\s*9600\s*\)/, message: 'Нужен Serial.begin(9600);' }] },
  { id: 3, title: 'Первый вывод', x: 24, y: 90, type: 'write',
    task: 'Выведи значение любой переменной в Serial Monitor.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Вывод\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /Serial\s*\.\s*println\s*\(\s*\w+\s*\)/, message: 'Нужен Serial.println(имяПеременной);' }] },
  { id: 4, title: 'Лагерь 1', x: 32, y: 90, type: 'write',
    task: 'Объяви две целочисленные переменные с разными значениями.',
    starterCode: 'void setup() {\n  // Переменные\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /int\s+\w+\s*=\s*\d+[\s\S]*int\s+\w+\s*=\s*\d+/, message: 'Нужно две переменные типа int' }] },
  { id: 5, title: 'Сумма', x: 40, y: 90, type: 'write',
    task: 'Сложи две переменные и выведи результат в Serial.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Сумма\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /Serial\s*\.\s*println\s*\(\s*\w+\s*\+\s*\w+\s*\)/, message: 'Сложи две переменные внутри Serial.println()' }] },
  { id: 6, title: 'Ледник', x: 48, y: 90, type: 'write',
    task: 'Если значение переменной больше 10, выведи "больше".',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Условие\n}\n\nvoid loop() {\n}',
    checks: [
      { pattern: /if\s*\(\s*\w+\s*>\s*10\s*\)/, message: 'Нужно условие if (переменная > 10)' },
      { pattern: /Serial\s*\.\s*println/, message: 'Выведи результат через Serial.println' }] },
  { id: 7, title: 'Развилка', x: 56, y: 90, type: 'write',
    task: 'Добавь else: если условие не выполняется, выведи "меньше".',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // if/else\n}\n\nvoid loop() {\n}',
    checks: [
      { pattern: /if\s*\(/, message: 'Нужен if' },
      { pattern: /else/, message: 'Нужен else' },
      { pattern: /Serial\s*\.\s*println[\s\S]*Serial\s*\.\s*println/, message: 'Нужны два вывода: в if и в else' }] },
  { id: 8, title: 'Цикл for', x: 64, y: 90, type: 'write',
    task: 'Создай цикл for, который выполняется 5 раз.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Цикл\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*5\s*;/, message: 'Нужен for с началом 0 и условием < 5' }] },
  { id: 9, title: 'Цикл while', x: 72, y: 90, type: 'write',
    task: 'Создай цикл while, который работает, пока счётчик меньше 3. Не забудь увеличивать счётчик.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Цикл\n}\n\nvoid loop() {\n}',
    checks: [
      { pattern: /while\s*\(\s*\w+\s*<\s*3\s*\)/, message: 'Нужен while (counter < 3)' },
      { pattern: /\w+\s*\+\+/, message: 'Увеличивай счётчик: counter++' }] },
  { id: 10, title: 'Вложенный цикл', x: 85, y: 85, type: 'write',
    task: 'Сделай два цикла for: один вложен в другой.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Вложенные циклы\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /for[\s\S]*for/, message: 'Нужны два цикла for' }] },

  // ═══ ЭТАП 2: 11–15 (Обрыв) ═══
  { id: 11, title: 'Обрыв 1', x: 74, y: 78, type: 'fix',
    timeLimit: 90, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 90 СЕКУНД!\n\nПропущена точка с запятой в setup.',
    buggyCode: 'void setup() {\n  Serial.begin(9600)\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /Serial\s*\.\s*begin\s*\(\s*9600\s*\)\s*;/, message: 'Пропущена ; после Serial.begin(9600)' }] },
  { id: 12, title: 'Обрыв 2', x: 65, y: 75, type: 'fix',
    timeLimit: 90, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 90 СЕКУНД!\n\nПеременная используется без объявления.',
    buggyCode: 'void setup() {\n  Serial.begin(9600);\n  Serial.println(x);\n}\n\nvoid loop() {\n}',
    checks: [
      { pattern: /int\s+\w+/, message: 'Переменная не объявлена' },
      { pattern: /Serial\s*\.\s*println/, message: 'Нужен Serial.println()' }] },
  { id: 13, title: 'Обрыв 3', x: 55, y: 72, type: 'fix',
    timeLimit: 120, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 120 СЕКУНД!\n\nУсловие в if некорректное. Должно срабатывать при x > 5.',
    buggyCode: 'int x = 10;\nvoid setup() {\n  Serial.begin(9600);\n  if (x < 5) {\n    Serial.println("yes");\n  }\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /if\s*\(\s*\w+\s*>\s*5\s*\)/, message: 'Условие должно быть x > 5' }] },
  { id: 14, title: 'Обрыв 4', x: 45, y: 69, type: 'fix',
    timeLimit: 120, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 120 СЕКУНД!\n\nЦикл for бесконечный. Исправь условие.',
    buggyCode: 'void setup() {\n  Serial.begin(9600);\n  for (int i = 0; i > 5; i++) {\n    Serial.println(i);\n  }\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*5\s*;/, message: 'Условие должно быть i < 5' }] },
  { id: 15, title: 'Обрыв 5', x: 35, y: 66, type: 'fix',
    timeLimit: 150, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 150 СЕКУНД!\n\nФункция вызывается без скобок. Исправь.',
    buggyCode: 'void setup() {\n  Serial.begin(9600);\n  printHello;\n}\n\nvoid printHello() {\n  Serial.println("Hello");\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /printHello\s*\(\s*\)\s*;/, message: 'Функция вызывается без скобок: printHello();' }] },

  // ═══ ЭТАП 3: 16–20 (пины, кнопки) — строго в setup/loop ═══
  { id: 16, title: 'Светодиод', x: 25, y: 60, type: 'write',
    task: 'В setup() настрой пин 13 как OUTPUT. В loop() включи светодиод (HIGH).',
    starterCode: 'void setup() {\n  // Настройка\n}\n\nvoid loop() {\n  // Включить\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*pinMode\s*\(\s*13\s*,\s*OUTPUT\s*\)/, message: 'В setup() нужен pinMode(13, OUTPUT);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/, message: 'В loop() нужен digitalWrite(13, HIGH);' }] },
  { id: 17, title: 'Кнопка', x: 25, y: 51, type: 'write',
    task: 'В setup() настрой пин 2 как INPUT_PULLUP. В loop() прочитай его в переменную.',
    starterCode: 'void setup() {\n  // Настройка\n}\n\nvoid loop() {\n  // Чтение\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*pinMode\s*\(\s*2\s*,\s*INPUT_PULLUP\s*\)/, message: 'В setup() нужен pinMode(2, INPUT_PULLUP);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*digitalRead\s*\(\s*2\s*\)/, message: 'В loop() нужен digitalRead(2);' }] },
  { id: 18, title: 'Кнопка + LED', x: 35, y: 50, type: 'write',
    task: 'В setup() настрой пины 13 (OUTPUT) и 2 (INPUT_PULLUP). В loop() — если кнопка нажата (LOW), включи светодиод.',
    starterCode: 'void setup() {\n  pinMode(13, OUTPUT);\n  pinMode(2, INPUT_PULLUP);\n}\n\nvoid loop() {\n  // Условие\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*if\s*\(\s*digitalRead\s*\(\s*2\s*\)\s*==\s*LOW\s*\)/, message: 'В loop() нужно if (digitalRead(2) == LOW)' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/, message: 'В loop() включи светодиод: digitalWrite(13, HIGH);' }] },
  { id: 19, title: 'ШИМ', x: 45, y: 50, type: 'write',
    task: 'В loop() плавно меняй яркость светодиода на пине 9 от 0 до 255 через analogWrite.',
    starterCode: 'void setup() {\n  pinMode(9, OUTPUT);\n}\n\nvoid loop() {\n  // Плавное изменение\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*analogWrite\s*\(\s*9\s*,/, message: 'В loop() нужен analogWrite(9, ...);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*(for|while)/, message: 'В loop() используй цикл для плавности' }] },
  { id: 20, title: 'Потенциометр', x: 55, y: 50, type: 'write',
    task: 'В loop() прочитай значение с пина A0 и выведи его в Serial.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Чтение и вывод\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*analogRead\s*\(\s*A0\s*\)/, message: 'В loop() нужен analogRead(A0);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*Serial\s*\.\s*println/, message: 'В loop() выведи результат через Serial.println();' }] },

  // ═══ ЭТАП 5: 21–25 (Секундомер) — строго в setup/loop ═══
  { id: 21, title: 'millis()', x: 65, y: 50, type: 'write',
    task: 'В loop() сделай так, чтобы каждую секунду (1000 мс) выводилось "Тик". Используй millis().',
    starterCode: 'unsigned long lastTime = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Логика\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*millis\s*\(\s*\)/, message: 'В loop() используй millis();' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*1000/, message: 'В loop() сравнивай с 1000 мс' }] },
  { id: 22, title: 'Секунды', x: 75, y: 50, type: 'write',
    task: 'В loop() сделай счётчик секунд, который увеличивается каждую секунду и выводится в Serial.',
    starterCode: 'int seconds = 0;\nunsigned long lastTime = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Логика\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*seconds\s*\+\+/, message: 'В loop() увеличивай seconds: seconds++;' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*Serial\s*\.\s*println\s*\(\s*seconds\s*\)/, message: 'В loop() выводи seconds: Serial.println(seconds);' }] },
  { id: 23, title: 'Кнопка Старт', x: 86, y: 50, type: 'write',
    task: 'В loop() добавь кнопку (пин 2). Если нажата (LOW), счётчик увеличивается. Иначе стоит.',
    starterCode: 'int seconds = 0;\nunsigned long lastTime = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(2, INPUT_PULLUP);\n}\n\nvoid loop() {\n  // Логика\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*digitalRead\s*\(\s*2\s*\)/, message: 'В loop() читай кнопку: digitalRead(2);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*if\s*\(\s*digitalRead\s*\(\s*2\s*\)\s*==\s*LOW\s*\)/, message: 'В loop() условие: if (digitalRead(2) == LOW)' }] },
  { id: 24, title: 'Сброс', x: 85, y: 40, type: 'write',
    task: 'В loop() сделай кнопку сброса (пин 3). Если нажать — seconds = 0. Всё выводи в Serial.',
    starterCode: 'int seconds = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(2, INPUT_PULLUP);\n  pinMode(3, INPUT_PULLUP);\n}\n\nvoid loop() {\n  // Логика\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*digitalRead\s*\(\s*3\s*\)/, message: 'В loop() читай кнопку сброса: digitalRead(3);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*seconds\s*=\s*0/, message: 'В loop() сбрасывай счётчик: seconds = 0;' }] },
  { id: 25, title: 'Счёт до 60', x: 68, y: 40, type: 'write',
    task: 'В loop() счёт 0–60, остановка на 60, вывод через Serial.println.',
    starterCode: 'int seconds = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Логика\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*if\s*\(\s*\w+\s*>=\s*60\s*\)/, message: 'В loop() проверка >= 60' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*Serial\s*\.\s*println/, message: 'В loop() Serial.println' }] },

  // ═══ ЭТАП 6: 26–30 (Продвинутое) ═══
  { id: 26, title: 'map()', x: 55, y: 40, type: 'write',
    task: 'В loop() прочитай A0 (0-1023) и переведи в 0-255 через map(). Выведи в Serial.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Логика\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*analogRead\s*\(\s*A0\s*\)/, message: 'В loop() прочитай analogRead(A0);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*map\s*\(\s*.*0\s*,\s*1023\s*,\s*0\s*,\s*255\s*\)/, message: 'В loop() используй map(value, 0, 1023, 0, 255);' }] },
  { id: 27, title: 'Звук', x: 40, y: 39, type: 'write',
    task: 'В loop() издай звук частотой 440 Гц на пине 8 с помощью tone().',
    starterCode: 'void setup() {\n}\n\nvoid loop() {\n  // Звук\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*tone\s*\(\s*8\s*,\s*440\s*\)/, message: 'В loop() используй tone(8, 440);' }] },
  { id: 28, title: 'Сервопривод', x: 41, y: 30, type: 'write',
    task: 'Подключи библиотеку Servo в setup() и поверни мотор на 90 градусов в loop().',
    starterCode: '#include <Servo.h>\n\nServo myServo;\n\nvoid setup() {\n  // Подключение\n}\n\nvoid loop() {\n  // Поворот\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*myServo\s*\.\s*attach\s*\(\s*\d+\s*\)/, message: 'В setup() подключи серво: myServo.attach(9);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*myServo\s*\.\s*write\s*\(\s*90\s*\)/, message: 'В loop() поверни на 90: myServo.write(90);' }] },
  { id: 29, title: 'Случайность', x: 48, y: 30, type: 'write',
    task: 'В setup() запусти генератор случайных чисел. В loop() сгенерируй число от 1 до 100 и выведи в Serial.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Генератор\n}\n\nvoid loop() {\n  // Случайное число\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*randomSeed/, message: 'В setup() нужен randomSeed(analogRead(0));' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*random\s*\(\s*1\s*,\s*101\s*\)/, message: 'В loop() используй random(1, 101);' }] },
  { id: 30, title: 'Мастер', x: 53, y: 25, type: 'write',
    task: 'Собери проект: в setup() настрой пины. В loop() — кнопка (пин 2) включает светодиод (пин 13) и издаёт звук (пин 8).',
    starterCode: 'void setup() {\n  // Настройка пинов\n}\n\nvoid loop() {\n  // Логика\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*pinMode\s*\(\s*13\s*,\s*OUTPUT\s*\)/, message: 'В setup() настрой pinMode(13, OUTPUT);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*digitalRead\s*\(\s*2\s*\)/, message: 'В loop() читай кнопку: digitalRead(2);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/, message: 'В loop() включи светодиод: digitalWrite(13, HIGH);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*tone\s*\(\s*8/, message: 'В loop() издай звук: tone(8, ...);' }] },
];