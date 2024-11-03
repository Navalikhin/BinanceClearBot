const Binance = require('binance-api-node').default;
const fs = require('fs');

const APIKEY = 'APIKEY'
const SECRET = 'SECRET'

const client = Binance({
    apiKey: APIKEY,
    apiSecret: SECRET
  });
  
  // Получаем баланс на фьючах
  async function getFuturesAccountBalance() {
    try {
      const balances = await client.futuresAccountBalance();
      const usdtBalance = balances.find((balance) => balance.asset === 'USDT');
  
      if (usdtBalance) {
        console.log('Баланс USDT:', usdtBalance.balance);
        const balanceFl = parseFloat(usdtBalance.balance); // Преобразуем balance в число
        console.log('Баланс USDT в числовом формате:', balanceFl);
  
        // Записываем значение balanceFl в файл balance.txt
        fs.writeFileSync('balance.txt', balanceFl.toString(), 'utf-8');
      } else {
        console.log('Баланс USDT не найден.');
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
getFuturesAccountBalance()