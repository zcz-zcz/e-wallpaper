import { app, protocol, BrowserWindow, screen, Tray, nativeImage } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
// const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`

async function createWindow() {
  let { width, height } = screen.getPrimaryDisplay().bounds
  let win = new BrowserWindow({
    width,
    height,
    transparent: false,
    titleBarStyle: 'hidden',
    titleBarOverlay: false,
    frame: true,
    alwaysOnTop: false,
    fullscreen: true,
    webPreferences: {
      preload: './preload.js',
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  // 设置托盘图标
  const iconPath = require('path').join(__dirname, 'favicon.ico')
  const trayIconUrl = nativeImage.createFromPath(iconPath)
  let tray = new Tray(trayIconUrl)
  tray.setToolTip('小鸡桌面')

  // win.setAlwaysOnTop(true, 'floating', 0)
  // win.loadURL(winURL)
  win.on('closed', () => {
    win = null
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
