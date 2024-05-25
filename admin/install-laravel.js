const { exec } = require('child_process');
const path = require('path');

const laravelPath = path.join(__dirname, 'resources/laravel');
const composerPath = path.join(__dirname, 'resources/composer/composer.phar');
const installDepsCommand = `php "${composerPath}" install --no-dev --working-dir="${laravelPath}"`;
const migrateCommand = `php "${path.join(laravelPath, 'artisan')}" migrate --force`;
const serveCommand = `php "${path.join(laravelPath, 'artisan')}" serve --host=127.0.0.1 --port=8000`;

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

runCommand(installDepsCommand, () => {
  runCommand(migrateCommand, () => {
    runCommand(serveCommand, () => {
      console.log('Laravel API is up and running!');
    });
  });
});