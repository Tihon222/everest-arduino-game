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
  // ═══ ЭТАП 1: ПОДГОТОВКА И ПЕРЕМЕННЫЕ (1–5) ═══
  { id: 1, title: 'Подножие', x: 8, y: 92, type: 'write',
    task: 'Аналогия: (int, float, boolean) — это коробки для данных.\n\nВнутри setup() объяви целочисленную переменную с любым значением.',
    starterCode: 'void setup() {\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*int\s+\w+\s*=\s*\d+\s*;/, message: 'В setup() нужна переменная типа int' }] },
  { id: 2, title: 'Базовый лагерь', x: 16, y: 91, type: 'write',
    task: 'Аналогия: (Serial.begin) — это «включение рации».\n\nВнутри setup() открой Serial-порт на скорости 9600.',
    starterCode: 'void setup() {\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*Serial\s*\.\s*begin\s*\(\s*9600\s*\)/, message: 'В setup() нужен Serial.begin(9600);' }] },
  { id: 3, title: 'Первый вывод', x: 24, y: 90, type: 'write',
    task: 'Аналогия: Serial.println — это «крик в рацию».\n\nВнутри setup() выведи значение любой переменной в Serial.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*Serial\s*\.\s*println\s*\(\s*\w+\s*\)/, message: 'В setup() нужен Serial.println(имяПеременной);' }] },
  { id: 4, title: 'Лагерь 1', x: 32, y: 90, type: 'write',
    task: 'Аналогия: несколько переменных — это несколько коробок.\n\nВнутри setup() объяви две целочисленные переменные с разными значениями.',
    starterCode: 'void setup() {\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*int\s+\w+\s*=\s*\d+[\s\S]*int\s+\w+\s*=\s*\d+/, message: 'В setup() нужны две переменные int' }] },
  { id: 5, title: 'Сумма', x: 40, y: 90, type: 'write',
    task: 'Аналогия: арифметика — это «сложение коробок».\n\nВнутри setup() сложи две переменные и выведи результат в Serial.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*Serial\s*\.\s*println\s*\(\s*\w+\s*\+\s*\w+\s*\)/, message: 'В setup() сложи две переменные внутри Serial.println()' }] },

  // ═══ ЭТАП 2: УСЛОВИЯ И ЦИКЛЫ (6–10) ═══
  { id: 6, title: 'Ледник', x: 48, y: 90, type: 'write',
    task: 'Аналогия: if — это «проверка на развилке».\n\nВнутри setup() проверь: если значение переменной больше 10, выведи "больше".',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*if\s*\(\s*\w+\s*>\s*10\s*\)/, message: 'В setup() нужно if (переменная > 10)' },
      { pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*Serial\s*\.\s*println/, message: 'В setup() выведи результат через Serial.println' }] },
  { id: 7, title: 'Развилка', x: 56, y: 90, type: 'write',
    task: 'Аналогия: else — это «альтернативная дорога».\n\nВнутри setup() добавь else: если условие не выполняется, выведи "меньше".',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*if\s*\(/, message: 'В setup() нужен if' },
      { pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*else/, message: 'В setup() нужен else' },
      { pattern: /Serial\s*\.\s*println[\s\S]*Serial\s*\.\s*println/, message: 'Нужны два вывода: в if и в else' }] },
  { id: 8, title: 'Цикл for', x: 64, y: 90, type: 'write',
    task: 'Аналогия: for — это «счётчик повторений».\n\nВнутри setup() создай цикл for, который выполняется 5 раз.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*5\s*;/, message: 'В setup() нужен for с началом 0 и условием < 5' }] },
  { id: 9, title: 'Цикл while', x: 72, y: 90, type: 'write',
    task: 'Аналогия: while — это «движение, пока не выполнится условие».\n\nВнутри setup() создай цикл while, который работает, пока счётчик меньше 3. Увеличивай счётчик.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*while\s*\(\s*\w+\s*<\s*3\s*\)/, message: 'В setup() нужен while (counter < 3)' },
      { pattern: /\w+\s*\+\+/, message: 'Увеличивай счётчик: counter++' }] },
  { id: 10, title: 'Вложенный цикл', x: 85, y: 85, type: 'write',
    task: 'Аналогия: вложенные циклы — это «цикл внутри цикла».\n\nВнутри setup() сделай два цикла for: один вложен в другой.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*for[\s\S]*for/, message: 'В setup() нужны два цикла for' }] },

  // ═══ ЭТАП 3: ОБРЫВ (11–15) ═══
  { id: 11, title: 'Обрыв 1', x: 74, y: 78, type: 'fix',
    timeLimit: 90, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 90 СЕКУНД!\n\nПрограмма должна открыть Serial-порт. Но что-то не так.',
    buggyCode: 'void setup() {\n  Serial.begin(9600)\n}\n\nvoid loop() {\n}',
    checks: [{ pattern: /Serial\s*\.\s*begin\s*\(\s*9600\s*\)\s*;/, message: 'Пропущена ; после Serial.begin(9600)' }] },
  { id: 12, title: 'Обрыв 2', x: 65, y: 75, type: 'fix',
    timeLimit: 90, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 90 СЕКУНД!\n\nПрограмма должна вывести значение переменной. Но что-то не так.',
    buggyCode: 'void setup() {\n  Serial.begin(9600);\n  Serial.println(x);\n}\n\nvoid loop() {\n}',
    checks: [
      { pattern: /int\s+\w+/, message: 'Переменная не объявлена' },
      { pattern: /Serial\s*\.\s*println/, message: 'Нужен Serial.println()' }] },
  { id: 13, title: 'Обрыв 3', x: 55, y: 72, type: 'fix',
    timeLimit: 120, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 120 СЕКУНД!\n\nПрограмма должна выводить "OK", если value > threshold. Но что-то не так.',
    buggyCode:
      'int value = 10;\n' +
      'int threshold = 5;\n\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  if (value < threshold) {\n' +
      '    Serial.println("OK");\n' +
      '  } else {\n' +
      '    Serial.println("FAIL");\n' +
      '  }\n' +
      '}\n\n' +
      'void loop() {\n' +
      '}',
    checks: [{ pattern: /if\s*\(\s*value\s*>\s*threshold\s*\)/, message: 'Условие должно быть value > threshold' }] },
  { id: 14, title: 'Обрыв 4', x: 45, y: 69, type: 'fix',
    timeLimit: 120, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 120 СЕКУНД!\n\nСчётчик должен вывести числа от 0 до 4. Но что-то не так.',
    buggyCode:
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  int counter = 0;\n' +
      '  int maxValue = 5;\n\n' +
      '  for (int i = 0; i > maxValue; i++) {\n' +
      '    Serial.println(i);\n' +
      '  }\n' +
      '}\n\n' +
      'void loop() {\n' +
      '}',
    checks: [{ pattern: /for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*\w+\s*;/, message: 'Условие цикла должно быть i < maxValue' }] },
  { id: 15, title: 'Обрыв 5', x: 35, y: 66, type: 'fix',
    timeLimit: 150, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 150 СЕКУНД!\n\nПрограмма должна вывести приветствие дважды. Но что-то не так.',
    buggyCode:
      'void sayHello() {\n' +
      '  Serial.println("Hello");\n' +
      '}\n\n' +
      'void setup() {\n' +
      '  Serial.begin(9600);\n' +
      '  sayHello();\n' +
      '  sayHello;\n' +
      '}\n\n' +
      'void loop() {\n' +
      '}',
    checks: [{ pattern: /sayHello\s*\(\s*\)\s*;[\s\S]*sayHello\s*\(\s*\)\s*;/, message: 'Функция sayHello() должна вызываться дважды со скобками' }] },

  // ═══ ЭТАП 4: ПИНЫ И СИГНАЛЫ (16–20) ═══
  { id: 16, title: 'Светодиод', x: 25, y: 60, type: 'write',
    task: 'Аналогия: pinMode — «назначить роль пину», digitalWrite — «включить/выключить».\n\nВ setup() настрой пин 13 как OUTPUT. В loop() включи светодиод (HIGH).',
    starterCode: 'void setup() {\n  // Настройка\n}\n\nvoid loop() {\n  // Включить\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*pinMode\s*\(\s*13\s*,\s*OUTPUT\s*\)/, message: 'В setup() нужен pinMode(13, OUTPUT);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/, message: 'В loop() нужен digitalWrite(13, HIGH);' }] },
  { id: 17, title: 'Кнопка', x: 25, y: 51, type: 'write',
    task: 'Аналогия: digitalRead — «проверить сигнал».\n\nВ setup() настрой пин 2 как INPUT_PULLUP. В loop() прочитай его в переменную.',
    starterCode: 'void setup() {\n  // Настройка\n}\n\nvoid loop() {\n  // Чтение\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*pinMode\s*\(\s*2\s*,\s*INPUT_PULLUP\s*\)/, message: 'В setup() нужен pinMode(2, INPUT_PULLUP);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*digitalRead\s*\(\s*2\s*\)/, message: 'В loop() нужен digitalRead(2);' }] },
  { id: 18, title: 'Кнопка + LED', x: 35, y: 50, type: 'write',
    task: 'Аналогия: if + digitalRead — «реакция на сигнал».\n\nВ setup() настрой пины 13 (OUTPUT) и 2 (INPUT_PULLUP). В loop() — если кнопка нажата (LOW), включи светодиод.',
    starterCode: 'void setup() {\n  pinMode(13, OUTPUT);\n  pinMode(2, INPUT_PULLUP);\n}\n\nvoid loop() {\n  // Условие\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*if\s*\(\s*digitalRead\s*\(\s*2\s*\)\s*==\s*LOW\s*\)/, message: 'В loop() нужно if (digitalRead(2) == LOW)' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/, message: 'В loop() включи светодиод: digitalWrite(13, HIGH);' }] },
  { id: 19, title: 'ШИМ', x: 45, y: 50, type: 'write',
    task: 'Аналогия: analogWrite — «плавная регулировка».\n\nВ loop() плавно меняй яркость светодиода на пине 9 от 0 до 255 через analogWrite.',
    starterCode: 'void setup() {\n  pinMode(9, OUTPUT);\n}\n\nvoid loop() {\n  // Плавное изменение\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*analogWrite\s*\(\s*9\s*,/, message: 'В loop() нужен analogWrite(9, ...);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*(for|while)/, message: 'В loop() используй цикл для плавности' }] },
  { id: 20, title: 'Потенциометр', x: 55, y: 50, type: 'write',
    task: 'Аналогия: analogRead — «измерение сигнала».\n\nВ loop() прочитай значение с пина A0 и выведи его в Serial.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Чтение и вывод\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*analogRead\s*\(\s*A0\s*\)/, message: 'В loop() нужен analogRead(A0);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*Serial\s*\.\s*println/, message: 'В loop() выведи результат через Serial.println();' }] },

  // ═══ ЭТАП 5: ВРЕМЯ И СЕКУНДОМЕР (21–25) ═══
  { id: 21, title: 'millis()', x: 65, y: 50, type: 'write',
    task: 'Аналогия: millis() — «секундомер», delay() — «пауза».\n\nВ loop() сделай так, чтобы каждую секунду (1000 мс) выводилось "Тик". Используй millis().',
    starterCode: 'unsigned long lastTime = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Логика\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*millis\s*\(\s*\)/, message: 'В loop() используй millis();' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*1000/, message: 'В loop() сравнивай с 1000 мс' }] },
  { id: 22, title: 'Секунды', x: 75, y: 50, type: 'write',
    task: 'Аналогия: счётчик секунд — это «секундомер с кнопкой».\n\nВ loop() сделай счётчик секунд, который увеличивается каждую секунду и выводится в Serial.',
    starterCode: 'int seconds = 0;\nunsigned long lastTime = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Логика\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*seconds\s*\+\+/, message: 'В loop() увеличивай seconds: seconds++;' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*Serial\s*\.\s*println\s*\(\s*seconds\s*\)/, message: 'В loop() выводи seconds: Serial.println(seconds);' }] },
  { id: 23, title: 'Кнопка Старт', x: 86, y: 50, type: 'write',
    task: 'Аналогия: флаг running — «включён ли секундомер».\n\nВ loop() добавь кнопку (пин 2). Если нажата (LOW), счётчик увеличивается. Иначе стоит.',
    starterCode: 'int seconds = 0;\nunsigned long lastTime = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(2, INPUT_PULLUP);\n}\n\nvoid loop() {\n  // Логика\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*digitalRead\s*\(\s*2\s*\)/, message: 'В loop() читай кнопку: digitalRead(2);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*if\s*\(\s*digitalRead\s*\(\s*2\s*\)\s*==\s*LOW\s*\)/, message: 'В loop() условие: if (digitalRead(2) == LOW)' }] },
  { id: 24, title: 'Сброс', x: 85, y: 40, type: 'write',
    task: 'Аналогия: кнопка сброса — «обнулить секундомер».\n\nВ loop() сделай кнопку сброса (пин 3). Если нажать — seconds = 0. Всё выводи в Serial.',
    starterCode: 'int seconds = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(2, INPUT_PULLUP);\n  pinMode(3, INPUT_PULLUP);\n}\n\nvoid loop() {\n  // Логика\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*digitalRead\s*\(\s*3\s*\)/, message: 'В loop() читай кнопку сброса: digitalRead(3);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*seconds\s*=\s*0/, message: 'В loop() сбрасывай счётчик: seconds = 0;' }] },
  { id: 25, title: 'Счёт до 60', x: 68, y: 40, type: 'write',
    task: 'Аналогия: лимит — «стоп на 60».\n\nВ loop() счёт 0–60, остановка на 60, вывод через Serial.println.',
    starterCode: 'int seconds = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Логика\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*if\s*\(\s*\w+\s*>=\s*60\s*\)/, message: 'В loop() проверка >= 60' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*Serial\s*\.\s*println/, message: 'В loop() Serial.println' }] },

  // ═══ ЭТАП 6: ПРОДВИНУТОЕ (26–30) ═══
  { id: 26, title: 'map()', x: 55, y: 40, type: 'write',
    task: 'Аналогия: map() — «перевод диапазона».\n\nВ loop() прочитай A0 (0-1023) и переведи в 0-255 через map(). Выведи в Serial.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Логика\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*analogRead\s*\(\s*A0\s*\)/, message: 'В loop() прочитай analogRead(A0);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*map\s*\(\s*.*0\s*,\s*1023\s*,\s*0\s*,\s*255\s*\)/, message: 'В loop() используй map(value, 0, 1023, 0, 255);' }] },
  { id: 27, title: 'Звук', x: 40, y: 39, type: 'write',
    task: 'Аналогия: tone() — «издать звук».\n\nВ loop() издай звук частотой 440 Гц на пине 8 с помощью tone().',
    starterCode: 'void setup() {\n}\n\nvoid loop() {\n  // Звук\n}',
    checks: [
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*tone\s*\(\s*8\s*,\s*440\s*\)/, message: 'В loop() используй tone(8, 440);' }] },
  { id: 28, title: 'Сервопривод', x: 41, y: 30, type: 'write',
    task: 'Аналогия: Servo — «поворот на угол».\n\nПодключи библиотеку Servo в setup() и поверни мотор на 90 градусов в loop().',
    starterCode: '#include <Servo.h>\n\nServo myServo;\n\nvoid setup() {\n  // Подключение\n}\n\nvoid loop() {\n  // Поворот\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*myServo\s*\.\s*attach\s*\(\s*\d+\s*\)/, message: 'В setup() подключи серво: myServo.attach(9);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*myServo\s*\.\s*write\s*\(\s*90\s*\)/, message: 'В loop() поверни на 90: myServo.write(90);' }] },
  { id: 29, title: 'Случайность', x: 48, y: 30, type: 'write',
    task: 'Аналогия: random() — «случайное число».\n\nВ setup() запусти генератор случайных чисел. В loop() сгенерируй число от 1 до 100 и выведи в Serial.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Генератор\n}\n\nvoid loop() {\n  // Случайное число\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*randomSeed/, message: 'В setup() нужен randomSeed(analogRead(0));' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*random\s*\(\s*1\s*,\s*101\s*\)/, message: 'В loop() используй random(1, 101);' }] },
  { id: 30, title: 'Мастер', x: 53, y: 25, type: 'write',
    task: 'Аналогия: всё вместе — «сборка проекта».\n\nСобери проект: в setup() настрой пины. В loop() — кнопка (пин 2) включает светодиод (пин 13) и издаёт звук (пин 8).',
    starterCode: 'void setup() {\n  // Настройка пинов\n}\n\nvoid loop() {\n  // Логика\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{[\s\S]*pinMode\s*\(\s*13\s*,\s*OUTPUT\s*\)/, message: 'В setup() настрой pinMode(13, OUTPUT);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*digitalRead\s*\(\s*2\s*\)/, message: 'В loop() читай кнопку: digitalRead(2);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/, message: 'В loop() включи светодиод: digitalWrite(13, HIGH);' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{[\s\S]*tone\s*\(\s*8/, message: 'В loop() издай звук: tone(8, ...);' }] },
];