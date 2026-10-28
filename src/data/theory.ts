// src/data/theory.ts
export interface Theory {
  title: string;
  content: string;
}

export const THEORY: Record<number, Theory> = {
  // ═══ ЭТАП 1: ОСНОВЫ (1–10) ═══
  1: { title: 'Переменные', content: 'Переменная — коробка с именем и типом.\n\nint — целые, float — дробные, char — символ, bool — true/false.\n\nИмя не начинается с цифры, регистр важен.' },
  2: { title: 'Serial.begin', content: 'Открывает «рацию» для связи с компьютером.\n\nСтандартная скорость — 9600. Вызывается один раз в setup().' },
  3: { title: 'Serial.println', content: 'Крик в рацию с переводом строки.\n\nSerial.print — без перевода.' },
  4: { title: 'Несколько переменных', content: 'Можно объявить сколько угодно переменных, каждой дать своё имя.' },
  5: { title: 'Арифметика', content: '+ — плюс, - — минус, * — умножить, / — делить, % — остаток.\n\nint / int = int (дробь отбрасывается).' },
  6: { title: 'if', content: '«Если» — проверка условия.\n\nОператоры: >, <, >=, <=, ==, !=.\n\nДля составных: && (И), || (ИЛИ), ! (НЕ).' },
  7: { title: 'else', content: '«Иначе» — если условие ложно.\n\nelse if — цепочка проверок.' },
  8: { title: 'for', content: 'Цикл со счётчиком.\n\nfor (старт; условие; шаг) { ... }' },
  9: { title: 'while', content: 'Цикл, пока условие истинно.\n\nНе забудь менять переменную, иначе цикл бесконечный.' },
  10: { title: 'Вложенные циклы', content: 'Цикл внутри цикла. Внешний делает шаг — внутренний проходит полностью.' },

  // ═══ ЭТАП 2: ОБРЫВ (11–15) ═══
  11: { title: 'Ошибка: ;', content: 'Каждая инструкция заканчивается `;`.\n\nЕсли компилятор ругается — проверь предыдущую строку.' },
  12: { title: 'Ошибка: переменная', content: 'Переменная должна быть объявлена до использования.\n\nОшибка: "not declared in this scope".' },
  13: { title: 'Ошибка: условие', content: 'Проверь знак: >, <, ==, !=.\n\n= — присваивание, == — сравнение.' },
  14: { title: 'Ошибка: цикл', content: 'Если условие всегда истинно — цикл бесконечный.\n\nПроверь шаг и границу.' },
  15: { title: 'Ошибка: вызов функции', content: 'Функция вызывается со скобками: имя();\n\nБез скобок — это не вызов.' },

  // ═══ ЭТАП 3: ПИНЫ (16–25) ═══
  16: { title: 'pinMode/digitalWrite', content: 'pinMode — назначаем роль пину (вход/выход).\ndigitalWrite — включаем/выключаем.' },
  17: { title: 'digitalRead/INPUT_PULLUP', content: 'digitalRead — читаем сигнал.\nINPUT_PULLUP — подтяжка к питанию, кнопка на GND.' },
  18: { title: 'Кнопка + LED', content: 'Если кнопка нажата (LOW с INPUT_PULLUP) — включи светодиод.' },
  19: { title: 'analogWrite (ШИМ)', content: 'Плавная регулировка 0..255.\n\nТолько на пинах с ~.' },
  20: { title: 'analogRead', content: 'Чтение аналогового сигнала 0..1023.\n\n0 — 0В, 1023 — 5В.' },
  21: { title: 'millis()', content: 'Время с момента запуска (мс).\n\nНе блокирует программу, в отличие от delay().' },
  22: { title: 'Счётчик секунд', content: 'Комбинация millis() и переменной.\n\nРаз в секунду — увеличиваем счётчик.' },
  23: { title: 'Кнопка Старт/Стоп', content: 'Флаг (bool) переключается при нажатии кнопки.' },
  24: { title: 'Кнопка Сброс', content: 'Вторая кнопка обнуляет счётчик.' },
  25: { title: 'Остановка на 60', content: 'if (seconds >= 60) { seconds = 60; running = false; }' },

  // ═══ ЭТАП 4: ФУНКЦИИ И МАССИВЫ (26–35) ═══
  26: { title: 'map()', content: 'Перевод из одного диапазона в другой.\n\nmap(value, fromLow, fromHigh, toLow, toHigh).' },
  27: { title: 'tone()', content: 'Генерация звука.\n\ntone(пин, частота); noTone(пин) — выключить.' },
  28: { title: 'Servo', content: '#include <Servo.h>\nServo myServo;\nmyServo.attach(9);\nmyServo.write(90);' },
  29: { title: 'random()', content: 'Случайное число.\nrandom(max) или random(min, max).\nrandomSeed(analogRead(0)) — запуск.' },
  30: { title: 'Мини-проект', content: 'Кнопка + светодиод + звук. Всё вместе.' },
  31: { title: 'Массивы', content: 'Много значений под одним именем.\n\nИндексы начинаются с 0.' },
  32: { title: 'Перебор массива', content: 'Цикл for по индексам от 0 до размера-1.' },
  33: { title: 'Свои функции', content: 'Именованный блок кода.\n\nvoid — ничего не возвращает.' },
  34: { title: 'Функции с параметрами', content: 'Параметры задают гибкость: blinkTimes(3, 200).' },
  35: { title: 'Возврат значения', content: 'return возвращает результат.\nint average(int a, int b) { return (a+b)/2; }' },

  // ═══ ЭТАП 5: КИМ (36–50) ═══
  36: { title: 'Разряды и сегменты', content: '4 разряда, 7 сегментов, 1 точка.\n\nПо очереди зажигаем — глаз видит все.' },
  37: { title: 'Массив цифр', content: 'numbers[10][7] — шаблоны цифр 0..9.\n1 — горит, 0 — не горит.' },
  38: { title: 'Функция display', content: 'display(dig, num) — вывести цифру num в разряд dig.' },
  39: { title: 'Кнопка в КИМ', content: 'Пин 1, INPUT_PULLUP.\nПри нажатии переключаем timerState.' },
  40: { title: 'millis() в КИМ', content: 'Раз в секунду: timer++, StartTime = millis().' },
  41: { title: 'Десятки минут', content: 'display(1, minutes / 10)' },
  42: { title: 'Единицы минут', content: 'display(2, minutes % 10)' },
  43: { title: 'Десятки секунд', content: 'display(3, seconds / 10)' },
  44: { title: 'Единицы секунд', content: 'display(4, seconds % 10)' },
  45: { title: 'Точка (DP)', content: 'digitalWrite(dp, !digitalRead(dp)) — мигание.' },
  46: { title: 'Сборка: кнопка + millis', content: 'Кнопка управляет timerState, millis() — счёт.' },
  47: { title: 'Сборка: вывод 4 разрядов', content: '4 вызова display() для минут и секунд.' },
  48: { title: 'Остановка на 60', content: 'timer == 60 → сброс и остановка.' },
  49: { title: 'Функция display() полностью', content: 'Погасить разряды, зажечь сегменты, включить разряд, delay(3), погасить.' },
  50: { title: 'Полный код', content: 'Секундомер: массивы + display() + кнопка + millis().' },
};