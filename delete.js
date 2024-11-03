const fs = require('fs');

const filesToDelete = ['balance.txt', 'smblfull.txt', 'order.txt'];

function deleteFiles() {
  try {
    filesToDelete.forEach((fileName) => {
      if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName);
        console.log(`Файл ${fileName} успешно удален.`);
      } else {
        console.log(`Файл ${fileName} не найден.`);
      }
    });

    console.log('Все необходимые файлы успешно удалены.');
  } catch (error) {
    console.error('Произошла ошибка при удалении файлов:', error);
  }
}

deleteFiles();

