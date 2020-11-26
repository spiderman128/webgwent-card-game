const express = require("express");
const app = express();

const api = require("./api");

globalThis.api = api;

const Connections = require("./models/Connections");
const Matchmaker = require("./models/Matchmaker");
const Player = require("./models/Player");
const server = require("http").createServer(app);
const Config = require("./config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const socketioJwt = require("socketio-jwt");

const userRoutes = require("./auth/routes/user");
const matchesRoutes = require("./matches/routes/match");

globalThis.connections = new Connections();
globalThis.matchmaker = new Matchmaker(globalThis.connections);

app.use(cors({ origin: true }));
app.use(cookieParser());
app.use(express.json());

app.get("/", function (req, res, next) {
  res.send("Works");
});

app.use("/users", userRoutes);
app.use("/matches", matchesRoutes);

globalThis.io = require("socket.io").listen(server);
globalThis.io.origins("*:*");

io.use(
  socketioJwt.authorize({
    secret: Config.ACCESS_TOKEN_SECRET,
    handshake: true,
  })
);

io.on("connection", async function (socket) {
  console.log(`hello! ${JSON.stringify(socket.decoded_token)}`);
  console.log(globalThis.matchmaker.connections.connections);
  let user, room;
  let username = socket.decoded_token.username;

  let userInfo = username ? await api.getUser(username) : {};

  if (globalThis.connections.hasUser(username)) {
    user = globalThis.connections.getUser(username);
    globalThis.connections.connections[username].socketId = socket.id;
    globalThis.connections.connections[username].reconnect(socket);

    room = globalThis.connections.connections[username].room;
    console.log("ROOM: ", room);
    if (room) {
      globalThis.connections.rooms[room].board.events();
      if (
        globalThis.connections.rooms[room].board.side1.player.getName() ===
        username
      ) {
        globalThis.connections.rooms[room].board.side1.events();
      } else {
        globalThis.connections.rooms[room].board.side2.events();
      }
    }
  } else {
    user = new Player(socket, userInfo);
    globalThis.connections.add(user);
  }

  socket.emit("update", user);

  socket.on("disconnect", function () {
    user.disconnect();
  });
});

server.listen(Config.WebServer.port);

console.log(`Up and running on port ${Config.WebServer.port}`);
