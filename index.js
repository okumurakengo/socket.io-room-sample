const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(3000);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  socket.on("chat message", ({ msg, room }) => {
    socket.join(room); // 指定のチャンネルに追加
    io.to(room).emit("chat message", msg);
  });
});
