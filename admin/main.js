const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { exec } = require('child_process');
const fs = require('fs');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'assets/img/link.ico'), // Ruta al icono
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, 'build', 'index.html'),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.loadURL(startUrl);

  // Opcional: abre DevTools automáticamente
  //mainWindow.webContents.openDevTools();

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorDescription);
  });

  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Finished loading');
  });
}

app.on('ready', () => {

  const mysqlInstallDir = 'C:/Program Files/MySQL';

  // Obtener la ruta del directorio de instalación de la aplicación Electron
  const appInstallDir = app.getAppPath();
    
  // Construir la ruta completa al directorio de la aplicación Laravel
  const laravelAppDir = path.join(appInstallDir, '..', 'api');

  //Verificar si MySQL esta instalado
  if (fs.existsSync(mysqlInstallDir)) {
    console.log('MySQL ya está instalado en el sistema.');
    // Arrancar Laravel antes de crear la ventana principal de Electron
    exec('php artisan serve', { cwd: laravelAppDir }, (error, stdout, stderr) => {
      if (error) {
        console.error('Error al iniciar el servidor de Laravel:', error);
        return;
      }
      console.log('Servidor de Laravel iniciado correctamente:', stdout);
      // Después de arrancar Laravel, crear la ventana principal de Electron
      createWindow();
    });
    return;
  }

  // MySQL no está instalado, proceder con la instalación
  const mysqlInstallerPath = path.join(__dirname, 'resources/mysql/mysql-installer.msi');
  const installCommand = `msiexec /i "${mysqlInstallerPath}" /quiet`;

  exec(installCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('Error al instalar MySQL:', error);
      return;
    }
    console.log('MySQL instalado correctamente:', stdout);

    // Arrancar Laravel después de instalar MySQL
    exec('php artisan serve', { cwd: laravelAppDir }, (error, stdout, stderr) => {
      if (error) {
        console.error('Error al iniciar el servidor de Laravel:', error);
        return;
      }
      console.log('Servidor de Laravel iniciado correctamente:', stdout);
      // Después de arrancar Laravel, crear la ventana principal de Electron
      createWindow();
    });
  });
});

app.on('before-quit', () => {
  // Detener el servidor de Laravel
  exec('pkill -f "php artisan serve"', (error, stdout, stderr) => {
    if (error) {
      console.error('Error al detener el servidor de Laravel:', error);
      return;
    }
    console.log('Servidor de Laravel detenido correctamente.');
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});