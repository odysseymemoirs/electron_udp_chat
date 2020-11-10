const { ipcRenderer } = require('electron')

// var EmitMessage = require("electron").remote.app.emit;

function SendMessage(func, data = null) {
  // EmitMessage("message", {
  //   "func": func,
  //   "data": data
  // });

  ipcRenderer.send('Message', {
    "func": func,
    "data": data
  });

}

const myFunctionList = {};

ipcRenderer.on("message", (event, data) => {
  try {
    myFunctionList[data.func](data.data);
  } catch (err) {
  }
});



myFunctionList.UpdateChat = (data) => {

  document.querySelector('#messageInput').value = ''

  console.log(data)

  let chatList = document.querySelector('#chat-list')


  const message = data.message;
  const user = data.name
  let insertUserName = document.createElement('span')
  insertUserName.textContent = user + " пишет: "
  insertUserName.style = 'color: skyblue'
  let insertMessage = document.createElement('p').textContent = message

  chatList.append(insertUserName)
  chatList.append(insertMessage)
  chatList.append(document.createElement('br'))
}


function runSearch(e) {

  if (e.keyCode == 13) {

    SendMessage("Message", {
      'name': document.querySelector("#name").value,
      "message": document.querySelector("#messageInput").value
    });
  }
}
