module.exports = {
  ipcRenderer: {
    on(channel) {
      console.log(`ipcRenderer: subscribed to ${channel}`)
    },
    send(channel, data) {
      console.log(`ipcRenderer: send to ${channel}`, data)
    },
    invoke(channel, data) {
      console.log(`ipcRenderer: invoke ${channel}`, data)
    },
  },
}
