import 'electron'
window.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('clickThroughElement')
  const win = require('electron').remote.getCurrentWindow()
  el && el.addEventListener('pointerover', () => {
    win.setIgnoreMouseEvents(true, { forward: true })
  })
  el && el.addEventListener('pointerout', () => {
    win.setIgnoreMouseEvents(false)
  })
})