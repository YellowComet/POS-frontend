const { exec } = require('child_process');
const path = require('path');

// Función para ejecutar un comando de shell
function runCommand(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${command}`);
      console.error(error.message);
      return;
    }
    console.log(`Command executed successfully: ${command}`);
    console.log(stdout);
    callback();
  });
}

// Ejecutar un script de Node.js
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

// Configurar MySQL
runScript('install-mysql.js', () => {
  // Configurar Laravel
  const laravelPath = path.join(__dirname, 'resources/laravel');
  const composerPath = path.join(__dirname, 'composer.phar');
  const installDepsCommand = `php "${composerPath}" install --no-dev --working-dir="${laravelPath}"`;
  const migrateCommand = `php "${path.join(laravelPath, 'artisan')}" migrate --force`;
  const serveCommand = `php "${path.join(laravelPath, 'artisan')}" serve --host=127.0.0.1 --port=8000`;

  runCommand(installDepsCommand, () => {
    runCommand(migrateCommand, () => {
      runCommand(serveCommand, () => {
        console.log('Laravel API is up and running!');
      });
    });
  });
});