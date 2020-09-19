<html>
  <head>
    <title>oyun</title>
  </head>
  <body>
    <canvas style="width:100%;height:100%;" width="600" height="300">tarayıcın eski yada desteklemiyo chrome kullan.</canvas>
    <script src="/socket.io/socket.io.js"></script>
    <script>
      var socket = io();
      var oyuncular = {};
      var c = document.querySelector("canvas");
        var ctx = c.getContext("2d");
      socket.on('yenioyuncu', function(msg){
        oyuncular = JSON.parse(msg);
      });
      socket.on('oyuncucikti', function(msg){
        delete oyuncular[msg];
      });
      socket.on('hareket', function(msg){
        var gelenpaket = JSON.parse(msg);
        var id = gelenpaket.id;
        delete gelenpaket["id"];
        oyuncular[id] = gelenpaket;
      });
      var fps = 50;
      document.addEventListener('keypress', (e)=>{
        var moyuncu = oyuncular[socket.io.engine.id];
        if(e.code == "KeyW") {
          moyuncu.y-=5;
        }
        if(e.code == "KeyA") {
          moyuncu.x-=5;
        }
        if(e.code == "KeyS") {
          moyuncu.y+=5;
        }
        if(e.code == "KeyD") {
          moyuncu.x+=5;
        }
        socket.emit('hareket',JSON.stringify(moyuncu));
      });
      setInterval(()=>{
        ctx.fillStyle="black";
        ctx.fillRect(0,0,c.width,c.height);
        var royuncular = Object.values(oyuncular);
        for(var z=0;z<royuncular.length;z++) {
          var royuncu = royuncular[z];
          ctx.fillStyle="red";
          ctx.font = "10px Arial";
          ctx.textAlign = "center";
          ctx.fillText(royuncu.name, royuncu.x+15/3, royuncu.y-5);
          ctx.fillRect(royuncu.x,royuncu.y,15,15);
        }
      },1000/fps);
    </script>
  </body>
</html>
