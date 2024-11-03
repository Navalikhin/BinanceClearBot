const ntpClient = require('ntp-client');

ntpClient.getNetworkTime("pool.ntp.org", 123, (err, date) => {
  if (err) {
    console.error(err);
    return;
  }

  const localTime = new Date();
  console.log("Серверное время: " + date);
  console.log("Локальное время: " + localTime);

  // Разница между локальным и серверным временем
  const timeDifference = date - localTime;
  console.log("Разница во времени: " + timeDifference + " мс");

  // Теперь можно использовать `timeDifference` для коррекции локального времени
  const synchronizedTime = new Date(localTime.getTime() + timeDifference);
  console.log("Синхронизированное локальное время: " + synchronizedTime);
});
