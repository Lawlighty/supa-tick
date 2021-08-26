import { app, BrowserWindow, ipcMain, Notification } from "electron";
import "../renderer/store";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}

let mainWindow;
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
  // 隐藏菜单栏
  const { Menu } = require("electron");
  Menu.setApplicationMenu(null);
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: "../../build/icons/tomato.ico",
    height: 600,
    useContentSize: true,
    width: 1050,
    //不允许用户调整窗口大小
    resizable: false,
    webPreferences: {
      webSecurity: false, // 允许跨域
      nodeIntegration: true, // 浏览器使用node 模块
    },
  });

  mainWindow.loadURL(winURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  //   监听渲染进程通讯
  handleIPC();
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function handleIPC() {
  ipcMain.on("work-notification", () => {
    let notification = new Notification({
      title: "当前番茄任务结束",
      body: "请前往选择下一步",
    });
    notification.show();
  });
}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
