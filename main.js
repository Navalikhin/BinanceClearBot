const { exec } = require('child_process');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const fs = require('fs');

function logTime(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync('data.txt', `${timestamp}: ${message}\n`, 'utf-8');
}

async function runScript(command) {
  return new Promise((resolve, reject) => {
    // Установка параметра maxBuffer на 1 мегабайт
    exec(`node ${command}`, { maxBuffer: 20 * 1024 * 1024 }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error running script ${command}: ${stderr}`);
        reject(error);
      } else {
        console.log(`Script ${command} executed successfully.`);
        resolve(stdout);
      }
    });
  });
}

async function delayUntilTime(targetTime) {
  const now = new Date();
  const target = new Date(now);

  const [hours, minutes] = targetTime.split(':');
  target.setHours(parseInt(hours), parseInt(minutes), 0);

  let delayMillis = target - now;
  if (delayMillis < 0) {
    // Если указанное время уже прошло, установим для следующего дня
    delayMillis +=  24 * 60 * 60 * 1000;
  }

  await delay(delayMillis);
}

async function runDailyScripts() {
  const scriptList = [
    { name: 'sync', time: '07:30' },
    { name: 'balance', time: '07:40' },
    { name: 'ws', time: '07:42' },
    { name: 'filter', time: '07:50' },
    { name: 'order', time: '07:59' },
    { name: 'delete', time: '08:10' },
    { name: 'sync', time: '15:30' },
    { name: 'balance', time: '15:40' },
    { name: 'ws', time: '15:42' },
    { name: 'filter', time: '15:50' },
    { name: 'order', time: '15:59' },
    { name: 'delete', time: '16:10' },
    { name: 'sync', time: '23:30' },
    { name: 'balance', time: '23:40' },
    { name: 'ws', time: '23:42' },
    { name: 'filter', time: '23:50' },
    { name: 'order', time: '23:59' },
    { name: 'delete', time: '00:10' },
  ];

  while (true) {
    try {
      for (const { name, time } of scriptList) {
        logTime(`Running script ${name} at ${time}`);
        await delayUntilTime(time);
        console.log(`Running script ${name} at ${time}`);

        try {
          await runScript(name);
          console.log(`Waiting for the next run at ${time}`);
        } catch (err) {
          logTime(`Error running script ${name}: ${err.message}`);
          console.error(`Error running script ${name}: ${err.message}`);
          console.log(`Waiting for the next run at ${time}`);
          // Подождем 5 минут перед запуском следующего скрипта
          await delay(5 * 60 * 1000);
        }
      }
    } catch (err) {
      console.error('An error occurred:', err);
    }
  }
}

runDailyScripts();
