const { exec } = require('child_process');
const path = require('path');

function runScript(scriptPath, callback) {
  const absolutePath = path.join(__dirname, scriptPath);
  exec(`node ${absolutePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script ${scriptPath}: ${error.message}`);
      return;
    }
    console.log(`Script ${scriptPath} executed successfully: ${stdout}`);
    callback();
  });
}

exports.default = async function(context) {
  return new Promise((resolve, reject) => {
    // Ejecutar install-mysql.js
    runScript('install-mysql.js', () => {
      // Ejecutar install-laravel.js
      runScript('install-laravel.js', () => {
        console.log('All post-install scripts executed successfully.');
        resolve();
      });
    });
  });
};