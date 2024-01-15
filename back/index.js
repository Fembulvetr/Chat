const ws = require("ws");

const wss = new ws.Server(
  {
    port: 12000,
  },
  console.log("Server started on 12000")
);

wss.on("connection", function connection(ws) {
  ws.on("message", function connection(message) {
    message = JSON.parse(message);
    switch (message.event) {
      case "message":
        broadcastMessage(message);
        break;
      case "connection":
        broadcastMessage(message);
        break;
    }
  });
});

function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}
