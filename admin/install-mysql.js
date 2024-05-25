const { exec } = require('child_process');
const path = require('path');

const mysqlPath = path.join(__dirname, 'resources/mysql/bin');
const initDbScript = path.join(mysqlPath, 'mysqld --initialize-insecure');
const startMysqlScript = path.join(mysqlPath, 'mysqld');

exec(initDbScript, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error initializing MySQL: ${error.message}`);
    return;
  }
  console.log(`MySQL initialized successfully: ${stdout}`);
  exec(startMysqlScript, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting MySQL: ${error.message}`);
      return;
    }
    console.log(`MySQL started successfully: ${stdout}`);
  });
});