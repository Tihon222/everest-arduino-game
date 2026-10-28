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

// Универсальные проверки структуры (для write-уровней 1-10, 16-50)
const STRUCTURE_CHECKS = (levelId: number) => {
  const checks = [
    { pattern: /void\s+setup\s*\(\s*\)\s*\{/, message: 'Нужна функция void setup() { ... }' },
    { pattern: /void\s+loop\s*\(\s*\)\s*\{/, message: 'Нужна функция void loop() { ... }' },
  ];
  // Для уровней, где нужны переменные в начале
  if ([1, 4, 5, 16, 17, 18, 21, 22, 23, 24, 25, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50].includes(levelId)) {
    checks.push({ pattern: /(int|const int|byte|bool|unsigned long|float)\s+\w+\s*=/, message: 'В начале кода должна быть объявлена переменная (int, const int, byte и т.д.)' });
  }
  return checks;
};

export const LEVELS: Level[] = [
  // ═══ ЭТАП 1: ОСНОВЫ (1–10) ═══
  { id: 1, title: 'Подножие', x: 8, y: 92, type: 'write',
    task: 'Объяви целочисленную переменную в начале кода и присвой ей значение. В setup() выведи её в порт.',
    starterCode: '// Объяви переменную здесь\n\nvoid setup() {\n  Serial.begin(9600);\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(1),
      { pattern: /Serial\s*\.\s*println\s*\(\s*\w+\s*\)\s*;/, message: 'В setup() нужен Serial.println(имяПеременной);' }
    ] },

  { id: 2, title: 'Базовый лагерь', x: 16, y: 91, type: 'write',
    task: 'Инициализируй последовательный порт в setup(). Используй стандартную скорость 9600.',
    starterCode: 'void setup() {\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(2),
      { pattern: /Serial\s*\.\s*begin\s*\(\s*9600\s*\)\s*;/, message: 'В setup() нужен Serial.begin(9600);' }
    ] },

  { id: 3, title: 'Первый вывод', x: 24, y: 90, type: 'write',
    task: 'В setup() выведи любое текстовое сообщение в последовательный порт с переводом строки.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(3),
      { pattern: /Serial\s*\.\s*println\s*\(\s*"[^"]+"\s*\)\s*;/, message: 'В setup() нужен Serial.println("текст");' }
    ] },

  { id: 4, title: 'Лагерь 1', x: 32, y: 90, type: 'write',
    task: 'Объяви две целочисленные переменные с разными значениями в начале кода.',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(4),
      { pattern: /int\s+\w+\s*=\s*\d+[\s\S]*int\s+\w+\s*=\s*\d+/, message: 'Нужны две переменные типа int' }
    ] },

  { id: 5, title: 'Сумма', x: 40, y: 90, type: 'write',
    task: 'В setup() сложи две переменные и выведи результат в порт.',
    starterCode: 'int a = 5;\nint b = 10;\n\nvoid setup() {\n  Serial.begin(9600);\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(5),
      { pattern: /Serial\s*\.\s*println\s*\(\s*\w+\s*\+\s*\w+\s*\)\s*;/, message: 'В setup() сложи две переменные внутри Serial.println()' }
    ] },

  { id: 6, title: 'Ледник', x: 48, y: 90, type: 'write',
    task: 'В setup() проверь, больше ли значение переменной 10. Если да — выведи "больше".',
    starterCode: 'int x = 15;\n\nvoid setup() {\n  Serial.begin(9600);\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(6),
      { pattern: /if\s*\(\s*\w+\s*>\s*10\s*\)\s*\{/, message: 'В setup() нужно if (переменная > 10)' },
      { pattern: /Serial\s*\.\s*println/, message: 'В setup() выведи результат' }
    ] },

  { id: 7, title: 'Развилка', x: 56, y: 90, type: 'write',
    task: 'В setup() добавь альтернативную ветку: если условие ложно — выведи "меньше".',
    starterCode: 'int x = 5;\n\nvoid setup() {\n  Serial.begin(9600);\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(7),
      { pattern: /if\s*\(/, message: 'В setup() нужен if' },
      { pattern: /else/, message: 'В setup() нужен else' },
      { pattern: /Serial\s*\.\s*println[\s\S]*Serial\s*\.\s*println/, message: 'Нужны два вывода: в if и в else' }
    ] },

  { id: 8, title: 'Цикл for', x: 64, y: 90, type: 'write',
    task: 'В setup() создай цикл, который выполнится ровно 5 раз.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(8),
      { pattern: /for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*5\s*;/, message: 'В setup() нужен for с началом 0 и условием < 5' }
    ] },

  { id: 9, title: 'Цикл while', x: 72, y: 90, type: 'write',
    task: 'В setup() создай цикл, который работает, пока счётчик меньше 3. Не забудь увеличивать счётчик.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(9),
      { pattern: /while\s*\(\s*\w+\s*<\s*3\s*\)/, message: 'В setup() нужен while (counter < 3)' },
      { pattern: /\w+\s*\+\+/, message: 'Увеличивай счётчик: counter++' }
    ] },

  { id: 10, title: 'Вложенный цикл', x: 85, y: 85, type: 'write',
    task: 'В setup() сделай два цикла, один внутри другого.',
    starterCode: 'void setup() {\n  Serial.begin(9600);\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(10),
      { pattern: /for[\s\S]*for/, message: 'В setup() нужны два цикла for' }
    ] },

  // ═══ ЭТАП 2: ОБРЫВ (11–15) — таймер и исправление ошибок ═══
  { id: 11, title: 'Обрыв 1', x: 74, y: 78, type: 'fix',
    timeLimit: 30, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 30 СЕКУНД!\n\nПрограмма должна открыть порт. Но что-то не так.',
    buggyCode: 'void setup() {\n  Serial.begin(9600)\n}\n\nvoid loop() {\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{/, message: 'Нужна функция void setup() { ... }' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{/, message: 'Нужна функция void loop() { ... }' },
      { pattern: /Serial\s*\.\s*begin\s*\(\s*9600\s*\)\s*;/, message: 'Пропущена ; после Serial.begin(9600)' }
    ] },

  { id: 12, title: 'Обрыв 2', x: 65, y: 75, type: 'fix',
    timeLimit: 45, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 45 СЕКУНД!\n\nПрограмма должна вывести значение. Но что-то не так.',
    buggyCode: 'void setup() {\n  Serial.begin(9600);\n  Serial.println(x);\n}\n\nvoid loop() {\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{/, message: 'Нужна функция void setup() { ... }' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{/, message: 'Нужна функция void loop() { ... }' },
      { pattern: /int\s+\w+/, message: 'Переменная не объявлена' },
      { pattern: /Serial\s*\.\s*println\s*\(\s*\w+\s*\)\s*;/, message: 'Нужен Serial.println()' }
    ] },

  { id: 13, title: 'Обрыв 3', x: 55, y: 72, type: 'fix',
    timeLimit: 60, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 60 СЕКУНД!\n\nПрограмма должна выводить "OK", если value > threshold. Но что-то не так.',
    buggyCode: 'int value = 10;\nint threshold = 5;\nvoid setup() {\n  Serial.begin(9600);\n  if (value < threshold) {\n    Serial.println("OK");\n  } else {\n    Serial.println("FAIL");\n  }\n}\nvoid loop() {\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{/, message: 'Нужна функция void setup() { ... }' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{/, message: 'Нужна функция void loop() { ... }' },
      { pattern: /if\s*\(\s*value\s*>\s*threshold\s*\)/, message: 'Условие должно быть value > threshold' }
    ] },

  { id: 14, title: 'Обрыв 4', x: 45, y: 69, type: 'fix',
    timeLimit: 60, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 60 СЕКУНД!\n\nСчётчик должен вывести числа от 0 до 4. Но что-то не так.',
    buggyCode: 'void setup() {\n  Serial.begin(9600);\n  int counter = 0;\n  int maxValue = 5;\n  for (int i = 0; i > maxValue; i++) {\n    Serial.println(i);\n  }\n}\nvoid loop() {\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{/, message: 'Нужна функция void setup() { ... }' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{/, message: 'Нужна функция void loop() { ... }' },
      { pattern: /for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*\w+\s*;/, message: 'Условие цикла должно быть i < maxValue' }
    ] },

  { id: 15, title: 'Обрыв 5', x: 35, y: 66, type: 'fix',
    timeLimit: 90, fallbackLevel: 10,
    task: '⚠ НАЙДИ ОШИБКУ ЗА 90 СЕКУНД!\n\nПрограмма должна вывести приветствие дважды. Но что-то не так.',
    buggyCode: 'void sayHello() {\n  Serial.println("Hello");\n}\nvoid setup() {\n  Serial.begin(9600);\n  sayHello();\n  sayHello;\n}\nvoid loop() {\n}',
    checks: [
      { pattern: /void\s+setup\s*\(\s*\)\s*\{/, message: 'Нужна функция void setup() { ... }' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{/, message: 'Нужна функция void loop() { ... }' },
      { pattern: /sayHello\s*\(\s*\)\s*;[\s\S]*sayHello\s*\(\s*\)\s*;/, message: 'Функция должна вызываться дважды со скобками' }
    ] },

  // ═══ ЭТАП 3: ПИНЫ (16–25) ═══
  { id: 16, title: 'Светодиод', x: 25, y: 60, type: 'write',
    task: 'В setup() настрой пин 13 как выход. В loop() включи его.',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(16),
      { pattern: /pinMode\s*\(\s*13\s*,\s*OUTPUT\s*\)\s*;/, message: 'В setup() нужен pinMode(13, OUTPUT);' },
      { pattern: /digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)\s*;/, message: 'В loop() нужен digitalWrite(13, HIGH);' }
    ] },

  { id: 17, title: 'Кнопка', x: 25, y: 51, type: 'write',
    task: 'Настрой пин 2 как вход с подтяжкой. Прочитай его в переменную.',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(17),
      { pattern: /pinMode\s*\(\s*2\s*,\s*INPUT_PULLUP\s*\)\s*;/, message: 'В setup() нужен pinMode(2, INPUT_PULLUP);' },
      { pattern: /digitalRead\s*\(\s*2\s*\)\s*;/, message: 'В loop() нужен digitalRead(2);' }
    ] },

  { id: 18, title: 'Кнопка + LED', x: 35, y: 50, type: 'write',
    task: 'Настрой пины. Если кнопка нажата, включи светодиод.',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(18),
      { pattern: /if\s*\(\s*digitalRead\s*\(\s*2\s*\)\s*==\s*LOW\s*\)\s*\{/, message: 'В loop() нужно if (digitalRead(2) == LOW)' },
      { pattern: /digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)\s*;/, message: 'Включи светодиод: digitalWrite(13, HIGH);' }
    ] },

  { id: 19, title: 'ШИМ', x: 45, y: 50, type: 'write',
    task: 'Плавно меняй яркость на пине 9 от 0 до 255.',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(19),
      { pattern: /analogWrite\s*\(\s*9\s*,/, message: 'Нужен analogWrite(9, ...);' },
      { pattern: /for|while/, message: 'Используй цикл' }
    ] },

  { id: 20, title: 'Потенциометр', x: 55, y: 50, type: 'write',
    task: 'Прочитай значение с A0 и выведи его в порт.',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(20),
      { pattern: /analogRead\s*\(\s*A0\s*\)\s*;/, message: 'Нужен analogRead(A0);' },
      { pattern: /Serial\s*\.\s*println\s*\(/, message: 'Выведи результат: Serial.println();' }
    ] },

  { id: 21, title: 'millis()', x: 65, y: 50, type: 'write',
    task: 'Каждую секунду выводи "Тик" (без delay).',
    starterCode: 'unsigned long lastTime = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      ...STRUCTURE_CHECKS(21),
      { pattern: /millis\s*\(\s*\)/, message: 'Используй millis()' },
      { pattern: /1000/, message: 'Сравнивай с 1000' }
    ] },

  { id: 22, title: 'Секунды', x: 75, y: 50, type: 'write',
    task: 'Счётчик секунд, увеличивается каждую секунду.',
    starterCode: 'int seconds = 0;\nunsigned long lastTime = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      ...STRUCTURE_CHECKS(22),
      { pattern: /seconds\s*\+\+/, message: 'seconds++' },
      { pattern: /Serial\s*\.\s*println\s*\(\s*seconds\s*\)/, message: 'Выводи seconds' }
    ] },

  { id: 23, title: 'Кнопка Старт', x: 86, y: 50, type: 'write',
    task: 'Счётчик увеличивается, только если кнопка нажата.',
    starterCode: 'int seconds = 0;\nunsigned long lastTime = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(2, INPUT_PULLUP);\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      ...STRUCTURE_CHECKS(23),
      { pattern: /digitalRead\s*\(\s*2\s*\)/, message: 'Читай кнопку' },
      { pattern: /if\s*\(\s*digitalRead\s*\(\s*2\s*\)\s*==\s*LOW\s*\)/, message: 'Проверяй нажатие' }
    ] },

  { id: 24, title: 'Сброс', x: 85, y: 40, type: 'write',
    task: 'Кнопка (пин 3) обнуляет секунды.',
    starterCode: 'int seconds = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(2, INPUT_PULLUP);\n  pinMode(3, INPUT_PULLUP);\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      ...STRUCTURE_CHECKS(24),
      { pattern: /digitalRead\s*\(\s*3\s*\)/, message: 'Читай кнопку 3' },
      { pattern: /seconds\s*=\s*0/, message: 'Обнуляй seconds' }
    ] },

  { id: 25, title: 'Счёт до 60', x: 68, y: 40, type: 'write',
    task: 'Счёт до 60 и остановка. Вывод в порт.',
    starterCode: 'int seconds = 0;\n\nvoid setup() {\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      ...STRUCTURE_CHECKS(25),
      { pattern: /if\s*\(\s*\w+\s*>=\s*60\s*\)/, message: 'Проверка >= 60' },
      { pattern: /Serial\s*\.\s*println/, message: 'Serial.println' }
    ] },

  // ═══ ЭТАП 4: ФУНКЦИИ И МАССИВЫ (26–35) ═══
  { id: 26, title: 'map()', x: 55, y: 40, type: 'write',
    task: 'Переведи значение с A0 (0-1023) в 0-255 через map().',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(26),
      { pattern: /analogRead\s*\(\s*A0\s*\)/, message: 'analogRead' },
      { pattern: /map\s*\(\s*.*0\s*,\s*1023\s*,\s*0\s*,\s*255\s*\)/, message: 'map(value, 0, 1023, 0, 255)' }
    ] },

  { id: 27, title: 'Звук', x: 40, y: 39, type: 'write',
    task: 'Издай звук 440 Гц на пине 8.',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(27),
      { pattern: /tone\s*\(\s*8\s*,\s*440\s*\)/, message: 'tone(8, 440)' }
    ] },

  { id: 28, title: 'Сервопривод', x: 41, y: 30, type: 'write',
    task: 'Подключи Servo и поверни мотор на 90 градусов.',
    starterCode: '#include <Servo.h>\nServo myServo;\n\nvoid setup() {\n  // Твой код\n}\n\nvoid loop() {\n}',
    checks: [
      { pattern: /#include\s*<Servo\.h>/, message: 'Нужен #include <Servo.h>' },
      { pattern: /Servo\s+\w+;/, message: 'Нужен объект Servo' },
      { pattern: /void\s+setup\s*\(\s*\)\s*\{/, message: 'Нужна setup()' },
      { pattern: /void\s+loop\s*\(\s*\)\s*\{/, message: 'Нужна loop()' },
      { pattern: /myServo\s*\.\s*attach\s*\(\s*\d+\s*\)\s*;/, message: 'myServo.attach()' },
      { pattern: /myServo\s*\.\s*write\s*\(\s*90\s*\)\s*;/, message: 'myServo.write(90)' }
    ] },

  { id: 29, title: 'Случайность', x: 48, y: 30, type: 'write',
    task: 'Сгенерируй случайное число от 1 до 100.',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(29),
      { pattern: /randomSeed/, message: 'randomSeed' },
      { pattern: /random\s*\(\s*1\s*,\s*101\s*\)/, message: 'random(1, 101)' }
    ] },

  { id: 30, title: 'Мастер', x: 53, y: 25, type: 'write',
    task: 'Кнопка (2) включает LED (13) и звук (8).',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(30),
      { pattern: /pinMode\s*\(\s*13\s*,\s*OUTPUT\s*\)/, message: 'pinMode(13, OUTPUT)' },
      { pattern: /digitalRead\s*\(\s*2\s*\)/, message: 'digitalRead(2)' },
      { pattern: /digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/, message: 'digitalWrite(13, HIGH)' },
      { pattern: /tone\s*\(\s*8/, message: 'tone(8)' }
    ] },

  { id: 31, title: 'Массивы', x: 50, y: 30, type: 'write',
    task: 'Объяви массив из 3 чисел и настрой пины через цикл.',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(31),
      { pattern: /int\s+\w+\s*\[\s*3\s*\]\s*=\s*\{/, message: 'Массив int arr[3]' },
      { pattern: /for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*3\s*;/, message: 'Цикл for' },
      { pattern: /pinMode\s*\(\s*\w+\s*\[\s*\w+\s*\]\s*,\s*OUTPUT\s*\)/, message: 'pinMode(arr[i], OUTPUT)' }
    ] },

  { id: 32, title: 'Массив: мигание', x: 55, y: 25, type: 'write',
    task: 'По очереди включай светодиоды из массива с паузой 200 мс.',
    starterCode: 'int leds[3] = {9, 10, 11};\n\nvoid setup() {\n  for (int i = 0; i < 3; i++) {\n    pinMode(leds[i], OUTPUT);\n  }\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      ...STRUCTURE_CHECKS(32),
      { pattern: /for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*3\s*;/, message: 'Цикл for' },
      { pattern: /digitalWrite\s*\(\s*\w+\s*\[\s*\w+\s*\]\s*,\s*HIGH\s*\)/, message: 'digitalWrite(arr[i], HIGH)' },
      { pattern: /delay\s*\(\s*200\s*\)/, message: 'delay(200)' }
    ] },

  { id: 33, title: 'Своя функция', x: 60, y: 20, type: 'write',
    task: 'Создай функцию blink(), которая мигает LED (13).',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(33),
      { pattern: /void\s+blink\s*\(\s*\)\s*\{/, message: 'Функция blink()' },
      { pattern: /digitalWrite\s*\(\s*13\s*,\s*HIGH\s*\)/, message: 'digitalWrite(13, HIGH)' },
      { pattern: /delay\s*\(/, message: 'delay()' }
    ] },

  { id: 34, title: 'Функция с параметром', x: 65, y: 25, type: 'write',
    task: 'Функция blinkTimes(times, pause) мигает N раз.',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(34),
      { pattern: /void\s+blinkTimes\s*\(\s*int\s+\w+\s*,\s*int\s+\w+\s*\)/, message: 'blinkTimes(int, int)' },
      { pattern: /for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*\w+\s*;/, message: 'for' }
    ] },

  { id: 35, title: 'Функция с return', x: 70, y: 30, type: 'write',
    task: 'Функция average(a, b) возвращает среднее.',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(35),
      { pattern: /int\s+average\s*\(\s*int\s+\w+\s*,\s*int\s+\w+\s*\)/, message: 'int average(int, int)' },
      { pattern: /return\s+/, message: 'return' }
    ] },

  // ═══ ЭТАП 5: ПОДГОТОВКА К КИМ (36–50) ═══
  { id: 36, title: 'КИМ: Разряды', x: 70, y: 35, type: 'write',
    task: 'Объяви два массива: digits (4 пина) и segments (7 пинов). В setup() настрой все эти пины как OUTPUT через циклы.',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(36),
      { pattern: /byte\s+digits\s*\[\s*\]/, message: 'Массив digits' },
      { pattern: /byte\s+segments\s*\[\s*\]/, message: 'Массив segments' },
      { pattern: /for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*4\s*;/, message: 'Цикл для 4 разрядов' },
      { pattern: /pinMode\s*\(\s*digits\s*\[\s*\w+\s*\]\s*,\s*OUTPUT\s*\)/, message: 'pinMode(digits[i], OUTPUT)' },
      { pattern: /for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*7\s*;/, message: 'Цикл для 7 сегментов' },
      { pattern: /pinMode\s*\(\s*segments\s*\[\s*\w+\s*\]\s*,\s*OUTPUT\s*\)/, message: 'pinMode(segments[i], OUTPUT)' }
    ] },

  { id: 37, title: 'КИМ: Массив цифр', x: 72, y: 32, type: 'write',
    task: 'Объяви двумерный массив numbers[10][7], где каждая строка — комбинация сегментов для цифры от 0 до 9.',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(37),
      { pattern: /byte\s+numbers\s*\[\s*10\s*\]\s*\[\s*7\s*\]/, message: 'Массив byte numbers[10][7]' },
      { pattern: /\{\s*1\s*,\s*1\s*,\s*1\s*,\s*1\s*,\s*1\s*,\s*1\s*,\s*0\s*\}/, message: 'Строка для цифры 0' },
      { pattern: /\{\s*0\s*,\s*1\s*,\s*1\s*,\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\}/, message: 'Строка для цифры 1' }
    ] },

  { id: 38, title: 'КИМ: Функция вывода', x: 74, y: 28, type: 'write',
    task: 'Напиши функцию display(int dig, int num), которая гасит все разряды, зажигает сегменты по numbers[num] и включает нужный разряд dig.',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(38),
      { pattern: /void\s+display\s*\(\s*int\s+\w+\s*,\s*int\s+\w+\s*\)/, message: 'display(int dig, int num)' },
      { pattern: /for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*7\s*;/, message: 'Цикл по 7 сегментам' },
      { pattern: /digitalWrite\s*\(\s*segments\s*\[\s*\w+\s*\]\s*,\s*numbers\s*\[\s*\w+\s*\]\s*\[\s*\w+\s*\]/, message: 'Зажигай сегменты по numbers[num][i]' },
      { pattern: /digitalWrite\s*\(\s*digits\s*\[\s*\w+\s*\]\s*,\s*HIGH\s*\)/, message: 'digitalWrite(digits[dig-1], HIGH)' }
    ] },

  { id: 39, title: 'КИМ: Кнопка', x: 76, y: 24, type: 'write',
    task: 'В setup() настрой пин 1 как INPUT_PULLUP. В loop() прочитай кнопку в переменную ButtonState и переключай флаг timerState при нажатии.',
    starterCode: 'bool timerState = 0;\n\nvoid setup() {\n  // Твой код\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      ...STRUCTURE_CHECKS(39),
      { pattern: /pinMode\s*\(\s*1\s*,\s*INPUT_PULLUP\s*\)/, message: 'pinMode(1, INPUT_PULLUP)' },
      { pattern: /digitalRead\s*\(\s*1\s*\)/, message: 'digitalRead(1)' },
      { pattern: /if\s*\(\s*ButtonState\s*==\s*0\s*\)/, message: 'if (ButtonState == 0)' },
      { pattern: /timerState\s*=\s*!\s*timerState/, message: 'timerState = !timerState' }
    ] },

  { id: 40, title: 'КИМ: millis()', x: 78, y: 20, type: 'write',
    task: 'В loop() добавь условие: если прошло 1000 мс и timerState == 1, увеличь timer и обнови StartTime.',
    starterCode: 'bool timerState = 1;\nunsigned long StartTime = 0;\nint timer = 0;\n\nvoid setup() {\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      ...STRUCTURE_CHECKS(40),
      { pattern: /millis\s*\(\s*\)\s*-\s*StartTime\s*>=\s*1000/, message: 'millis() - StartTime >= 1000' },
      { pattern: /timerState\s*==\s*1/, message: 'timerState == 1' },
      { pattern: /timer\s*\+\+/, message: 'timer++' },
      { pattern: /StartTime\s*=\s*millis\s*\(\s*\)/, message: 'StartTime = millis()' }
    ] },

  { id: 41, title: 'КИМ: Минуты (десятки)', x: 80, y: 16, type: 'write',
    task: 'В loop() вызови display(1, minutes / 10), чтобы вывести десятки минут.',
    starterCode: 'int minutes = 2;\n\nvoid setup() {\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      ...STRUCTURE_CHECKS(41),
      { pattern: /display\s*\(\s*1\s*,\s*minutes\s*\/\s*10\s*\)/, message: 'display(1, minutes / 10)' }
    ] },

  { id: 42, title: 'КИМ: Минуты (единицы)', x: 82, y: 14, type: 'write',
    task: 'В loop() вызови display(2, minutes % 10), чтобы вывести единицы минут.',
    starterCode: 'int minutes = 2;\n\nvoid setup() {\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      ...STRUCTURE_CHECKS(42),
      { pattern: /display\s*\(\s*2\s*,\s*minutes\s*%\s*10\s*\)/, message: 'display(2, minutes % 10)' }
    ] },

  { id: 43, title: 'КИМ: Секунды (десятки)', x: 84, y: 12, type: 'write',
    task: 'В loop() вызови display(3, seconds / 10), чтобы вывести десятки секунд.',
    starterCode: 'int seconds = 0;\n\nvoid setup() {\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      ...STRUCTURE_CHECKS(43),
      { pattern: /display\s*\(\s*3\s*,\s*seconds\s*\/\s*10\s*\)/, message: 'display(3, seconds / 10)' }
    ] },

  { id: 44, title: 'КИМ: Секунды (единицы)', x: 86, y: 10, type: 'write',
    task: 'В loop() вызови display(4, seconds % 10), чтобы вывести единицы секунд.',
    starterCode: 'int seconds = 0;\n\nvoid setup() {\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      ...STRUCTURE_CHECKS(44),
      { pattern: /display\s*\(\s*4\s*,\s*seconds\s*%\s*10\s*\)/, message: 'display(4, seconds % 10)' }
    ] },

  { id: 45, title: 'КИМ: Точка (DP)', x: 88, y: 8, type: 'write',
    task: 'В loop() добавь мигание точки: digitalWrite(dp, !digitalRead(dp)).',
    starterCode: 'int dp = 13;\n\nvoid setup() {\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      ...STRUCTURE_CHECKS(45),
      { pattern: /digitalWrite\s*\(\s*dp\s*,\s*!\s*digitalRead\s*\(\s*dp\s*\)\s*\)/, message: 'digitalWrite(dp, !digitalRead(dp))' }
    ] },

  { id: 46, title: 'КИМ: Сборка (1)', x: 60, y: 50, type: 'write',
    task: 'Собери части: в loop() добавь обработку кнопки (пин 1) и условие millis() для timer++.',
    starterCode: 'bool timerState = 0;\nunsigned long StartTime = 0;\nint timer = 0;\n\nvoid setup() {\n  pinMode(1, INPUT_PULLUP);\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      ...STRUCTURE_CHECKS(46),
      { pattern: /digitalRead\s*\(\s*1\s*\)/, message: 'Читай кнопку' },
      { pattern: /timerState\s*=\s*!\s*timerState/, message: 'Переключай флаг' },
      { pattern: /millis\s*\(\s*\)\s*-\s*StartTime\s*>=\s*1000/, message: 'Условие millis' },
      { pattern: /timer\s*\+\+/, message: 'Увеличивай timer' }
    ] },

  { id: 47, title: 'КИМ: Сборка (2)', x: 55, y: 45, type: 'write',
    task: 'Добавь в loop() вывод четырёх разрядов: display(1, timer / 1000), display(2, timer / 100 % 10), display(3, timer % 100 / 10), display(4, timer % 10).',
    starterCode: 'int timer = 0;\n\nvoid setup() {\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      ...STRUCTURE_CHECKS(47),
      { pattern: /display\s*\(\s*1\s*,\s*timer\s*\/\s*1000\s*\)/, message: 'display(1, timer / 1000)' },
      { pattern: /display\s*\(\s*2\s*,\s*timer\s*\/\s*100\s*%\s*10\s*\)/, message: 'display(2, timer / 100 % 10)' },
      { pattern: /display\s*\(\s*3\s*,\s*timer\s*%\s*100\s*\/\s*10\s*\)/, message: 'display(3, timer % 100 / 10)' },
      { pattern: /display\s*\(\s*4\s*,\s*timer\s*%\s*10\s*\)/, message: 'display(4, timer % 10)' }
    ] },

  { id: 48, title: 'КИМ: Остановка на 60', x: 50, y: 40, type: 'write',
    task: 'Добавь в loop() проверку: если timer == 60, сбросить timer = 0 и timerState = 0.',
    starterCode: 'int timer = 0;\nbool timerState = 1;\n\nvoid setup() {\n}\n\nvoid loop() {\n  // Твой код\n}',
    checks: [
      ...STRUCTURE_CHECKS(48),
      { pattern: /if\s*\(\s*timer\s*==\s*60\s*\)/, message: 'Проверка timer == 60' },
      { pattern: /timer\s*=\s*0/, message: 'Сброс timer = 0' },
      { pattern: /timerState\s*=\s*0/, message: 'Сброс timerState = 0' }
    ] },

  { id: 49, title: 'КИМ: Функция display()', x: 45, y: 35, type: 'write',
    task: 'Напиши полную функцию display(int dig, int num): гасит все разряды, зажигает сегменты по numbers[num], включает разряд dig, ждёт 3 мс, гасит разряд.',
    starterCode: '// Твой код\n\nvoid setup() {\n}\n\nvoid loop() {\n}',
    checks: [
      ...STRUCTURE_CHECKS(49),
      { pattern: /for\s*\(\s*int\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*7\s*;/, message: 'Цикл по 7 сегментам' },
      { pattern: /digitalWrite\s*\(\s*segments\s*\[\s*\w+\s*\]\s*,\s*numbers\s*\[\s*\w+\s*\]\s*\[\s*\w+\s*\]/, message: 'Зажигай сегменты по numbers[num][i]' },
      { pattern: /digitalWrite\s*\(\s*digits\s*\[\s*\w+\s*\]\s*,\s*HIGH\s*\)/, message: 'Включай разряд' },
      { pattern: /delay\s*\(\s*3\s*\)/, message: 'delay(3)' },
      { pattern: /digitalWrite\s*\(\s*digits\s*\[\s*\w+\s*\]\s*,\s*LOW\s*\)/, message: 'Гаси разряд' }
    ] },

  { id: 50, title: 'Мастер КИМ', x: 40, y: 30, type: 'write',
    task: 'Собери полный код секундомера: массивы digits, segments, numbers[10][7], функция display(), обработка кнопки, millis(), вывод 4 разрядов.',
    starterCode: '// Твой код\n',
    checks: [
      ...STRUCTURE_CHECKS(50),
      { pattern: /byte\s+digits\s*\[\s*\]/, message: 'Массив digits' },
      { pattern: /byte\s+segments\s*\[\s*\]/, message: 'Массив segments' },
      { pattern: /byte\s+numbers\s*\[\s*10\s*\]\s*\[\s*7\s*\]/, message: 'Массив numbers' },
      { pattern: /void\s+display\s*\(\s*int\s+\w+\s*,\s*int\s+\w+\s*\)/, message: 'Функция display()' },
      { pattern: /digitalRead\s*\(\s*1\s*\)/, message: 'Чтение кнопки' },
      { pattern: /millis\s*\(\s*\)/, message: 'Использование millis()' },
      { pattern: /display\s*\(\s*1\s*,/, message: 'Вывод разряда 1' }
    ] },
];