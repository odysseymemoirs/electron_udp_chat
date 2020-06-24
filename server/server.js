var server = require("dgram").createSocket("udp4").bind(4000);

var chatRooms = {};
chatRooms['room1'] = [];
chatRooms['room1_chat'] = [];

const myFunctionList = {}; 

server.on("listening", () => {
  console.log(`Listening on port ${server.address().port}`);
});

server.on("message", (data) => {
  data = JSON.parse(data.toString("utf-8"));
  var dd = JSON.parse(data.data);

  try {
    myFunctionList[data.func](dd);
  } catch (err) {
    console.log(err);
    console.log(`ERROR: The function "${data.func}" doesn't exist`);
  }
});


// sending messages to client

function UDP(func, data = null) {
  var message = Buffer.from(JSON.stringify({
    "func": func,
    "data": data
  }));

  server.send(message, 0, message.length, 4001, "localhost");
  server.send(message, 0, message.length, 4002, "localhost");
}


myFunctionList.JoinRoom = (data) => {

  chatRooms['room1'].push(data.name);
  UDP("UpdateChat", chatRooms);
}

myFunctionList.Message = (data) => {

  chatRooms['room1_chat'].push({
    name: data.name,
    message: data.message
  });

  UDP("UpdateChat",{
    name: data.name,
    message: data.message
  } );

}

