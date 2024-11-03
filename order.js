const fs = require('fs');
const Binance = require('binance-api-node').default;

const APIKEY = 'APIKEY'
const SECRET = 'SECRET'



const client = Binance({
    apiKey: APIKEY,
    apiSecret: SECRET
  });


// Чтение переменных из файла order.txt
const orderData = fs.readFileSync('order.txt', 'utf-8');

// Разбиваем строки на массив
const orderLines = orderData.split('\n');

// Парсим значения переменных
let SYMBOL, QUANTITY, LEVERANGE, fRate;
for (const line of orderLines) {
  const [key, value] = line.split(':').map((item) => item.trim());
  if (key === 'SYMBOL') SYMBOL = value;
  else if (key === 'QUANTITY') QUANTITY = value;
  else if (key === 'LEVERANGE') LEVERANGE = value;
  else if (key === 'fRate') fRate = parseFloat(value);
}

// Преобразуем QUANTITY и LEVERANGE в строку
const quantityString = QUANTITY.toString();
const leverangeString = LEVERANGE.toString();

let OSIDE, CSIDE;

// Определяем OSIDE и CSIDE в зависимости от значения fRate
if (fRate < 0) {
    OSIDE = 'BUY';
    CSIDE = 'SELL';
} else {
    OSIDE = 'SELL';
    CSIDE = 'BUY';
}


async function placeOrder() {
    try {
        const response = await client.futuresOrder({
            symbol: SYMBOL,
            type: 'MARKET',
            marginType: 'ISOLATED',
            side: OSIDE,
            quantity: QUANTITY,
            leverange: LEVERANGE,
        });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

setTimeout(async () => {
    await placeOrder();
setTimeout(
        async () => {
            try {
                const response = await client.futuresOrder({
                    symbol: SYMBOL,
                    type: 'MARKET',
                    marginType: 'ISOLATED',
                    side: CSIDE,
                    quantity: (Number(QUANTITY) * 2).toString(),
                    leverange: LEVERANGE,
                });
                console.log(response);

                setTimeout(async () => {
                    await placeOrder();
                }, 7000);

            } catch (error) {
                console.error(error);
            }
    }, 7000);
}, 55000);