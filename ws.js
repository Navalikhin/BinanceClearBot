const Binance = require('binance-api-node').default;
const fs = require('fs');
const axios = require('axios');
const WebSocket = require('ws');

const APIKEY = 'APIKEY'
const SECRET = 'SECRET'

const client = Binance({
    apiKey: APIKEY,
    apiSecret: SECRET
  });

async function getFundingRate() {
    const symbols = fs.readFileSync('smbl.txt', 'utf-8').split('\n').map((symbol) => symbol.trim()).filter((symbol) => symbol !== '');
    const latestUpdates = {};
    const wsConnections = [];
  
    function connectToWebSocket(symbol) {
      const ws = new WebSocket(`wss://fstream.binance.com/ws/${symbol.toLowerCase()}@markPrice`);
  
      wsConnections.push(ws);
  
      ws.on('open', () => {
        console.log(`Подключено к WebSocket для символа ${symbol}`);
      });
  
      ws.on('message', (data) => {
        const message = JSON.parse(data);
        console.log(`Обновление данных для символа ${symbol}:`, message);
  
        latestUpdates[symbol] = message;
      });
  
      ws.on('close', () => {
        console.log(`Соединение с WebSocket для символа ${symbol} закрыто`);
      });
  
      ws.on('error', (error) => {
        console.error(`Произошла ошибка WebSocket для символа ${symbol}:`, error);
      });
    }
  
    symbols.forEach((symbol) => {
      if (symbol.trim() !== '') {
        connectToWebSocket(symbol.trim());
      }
    });

      //Обновление файла smblfull.txt
    function updateFullSymbolFile() {
        fs.writeFileSync('smblfull.txt', JSON.stringify(latestUpdates, null, 2), 'utf-8');
        console.log('Файл smblfull.txt обновлен.');    
    }
  
    // Обновление файла smblfull.txt через 60 секунд
    setTimeout(updateFullSymbolFile, 60000);
  
    // Таймер на отключение через 2 минуты
    setTimeout(() => {
      wsConnections.forEach((ws) => {
        ws.close();
      });
      console.log('Отключено от всех WebSocket-потоков.');
    }, 2 * 60 * 1000);
  }
  getFundingRate()