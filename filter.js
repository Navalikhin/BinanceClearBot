const fs = require('fs');

async function filter() {
  // Чтение переменной balanceFl из файла balance.txt
  const balanceFl = parseFloat(fs.readFileSync('balance.txt', 'utf-8').trim());

  // Чтение данных из файла smblfull.txt
  const rawData = fs.readFileSync('smblfull.txt', 'utf-8');
  const symbolData = JSON.parse(rawData);

  // Объект для хранения символов с наименьшим значением r:
  let symbolsWithMinR = {};

  // Инициализация минимального значения r
  let minR = -0.002;

  // Перебор данных и поиск символов с наименьшим значением r:
  for (const symbol in symbolData) {
    if (symbolData.hasOwnProperty(symbol)) {
      const rValue = parseFloat(symbolData[symbol].r);
      if (!isNaN(rValue)) {
        const absRValue = Math.abs(rValue);
        if (absRValue > Math.abs(minR)) {
          minR = rValue;
          symbolsWithMinR = {};
          symbolsWithMinR[symbol] = symbolData[symbol];
        } else if (absRValue === Math.abs(minR)) {
          symbolsWithMinR[symbol] = symbolData[symbol];
        }
      }
    }
  }

  // Выбрать один символ с наименьшим значением r
  const selectedSymbol = Object.keys(symbolsWithMinR)[0];
  const selectedSymbolData = symbolsWithMinR[selectedSymbol];

  // Записать выбранные значения в переменные
  const SYMBOL = selectedSymbol;
  const price = selectedSymbolData.i;
  const fRate = selectedSymbolData.r;

  // Вывести информацию о выбранном символе
  console.log('Выбранный символ с наименьшим значением r:');
  console.log(SYMBOL);
  console.log('Price:', price);
  console.log('fRate:', fRate);

  let LEVERANGE = '20';
  const priceFl = parseFloat(price);
  const leverangeFl = parseFloat(LEVERANGE);
  let QUANTITY = Math.round(balanceFl * 0.9 * leverangeFl / priceFl).toString();

  // Создание файла order.txt и запись переменных SYMBOL, price, fRate, LEVERANGE, QUANTITY
  fs.writeFileSync('order.txt', `SYMBOL: ${SYMBOL}\nPrice: ${price}\nfRate: ${fRate}\nLEVERANGE: ${LEVERANGE}\nQUANTITY: ${QUANTITY}`, 'utf-8');

  // Путь к файлу smblfull.txt
  const filePath = 'smblfull.txt';

}

// Запускаем функцию filter
filter();
