const app = require("express")();

const Api = require("./api");
const api = new Api();

globalThis.api = api;

const Connections = require("./models/Connections");
const Matchmaker = require("./models/Matchmaker");
const Player = require("./models/Player");
const server = require("http").createServer(app);
const Config = require("./config");
const cors = require("cors");
const cookieParser = require("cookie-parser");

globalThis.connections = new Connections();
globalThis.matchmaker = new Matchmaker(globalThis.connections);
globalThis.io = require("socket.io").listen(server);
globalThis.io.origins("*:*");

server.listen(3001);

console.log(`Up and running on port ${Config.Server.port}`);

app.use(cors({ origin: true }));
app.use(cookieParser());
app.listen(Config.WebServer.port);

io.on("connection", function (socket) {
  let uid;
  let user;
  let cookies = socket.handshake.headers.cookie
    ? socket.handshake.headers.cookie.split("")
    : [];

  for (let cookie of cookies) {
    if (cookie.startsWith("uid=")) {
      uid = cookie.split("=")[1];
      uid = uid.split(";")[0];
    }
  }

  if (uid) {
    for (let u of Object.keys(globalThis.connections.connections)) {
      if (globalThis.connections.connections[u].getId() === uid) {
        user = globalThis.connections.connections[u];
        user.socketId = socket.id;
        user.reconnect(socket);
      }
    }

    if (user && user.room) {
      user = globalThis.connections.rooms[user.room].getPlayer(user.uid);
    } else {
      user = new Player(socket);
      globalThis.connections.add(user);
      socket.emit("setCookie", user.uid);
    }
  } else {
    user = new Player(socket);
    globalThis.connections.add(user);
    socket.emit("setCookie", user.uid);
  }

  socket.emit("update", user);

  // socket.on("matched", function (roomId) {
  //   socket.join(roomId);
  // });

  socket.on("leave", function () {
    user.disconnect();
  });

  socket.on("disconnect", function () {
    // setTimeout(function () {
    //   if (globalThis.connections.hasUser(user)) {
    //     socket.broadcast.emit("user:left", {
    //       uid: user.uid,
    //     });
    //     console.log(user);
    //     user.disconnect();
    //     globalThis.connections.remove(user);
    //     user = null;
    //   }
    // }, 15000);
  });
});

/* GET home page. */
app.get("/", function (req, res, next) {
  res.send("Works");
});
