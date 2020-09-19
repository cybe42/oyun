var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var oyuncular = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
  oyuncular[socket.id] = {
    name: "oyuncu"+Math.floor(Math.random()*400),
    x: Math.floor(Math.random()*200),
    y: Math.floor(Math.random()*200)
  };
  console.log("bir oyuncu katıldı.");
  io.emit("yenioyuncu",JSON.stringify(oyuncular));
  socket.on("hareket", (msg) => {
    oyuncular[socket.id] = JSON.parse(msg);
    var paket = oyuncular[socket.id];
    paket["id"] = socket.id;
    io.emit("hareket",JSON.stringify(paket));
  });
  socket.on("disconnect", () => {
    io.emit("oyuncucikti", socket.id);
    console.log("bir oyuncu çıktı.");
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
