module.exports = function (io) {

  var router = require('express').Router();
  var models = require('../models');



  // НЕ РАБОТАЕТ нет views
  router.get('/text', (req, res) => {
    res.render('donation/text');

    setTimeout(function() {     

      // userid это рум
    room = "abc123";
    // хочу отправить сообщение в данный рум
    // 'hello world' заменю на переменную текста
    io.to(room).emit('message', 'hello world') 

    }, 4000);

  });

  // НЕ РАБОТАЕТ, НЕТ views
  router.get('/slot', (req, res) => {
  res.render('donation/slot');

  setTimeout(function() {     

    // userid это рум
  room = "abc123";
  // хочу отправить сообщение в данный рум
  // 'hello world' заменю на переменную текста
  io.to(room).emit('message', 'hello world') 

  }, 4000);

  });

  // РАБОТАЕТ
  router.get('/wheel_of_fortune', (req, res) => {
    res.render('donation/wheel_of_fortune');

    setTimeout(function() {     

      // userid это рум
    room = "abc123";
    // хочу отправить сообщение в данный рум
    // 'hello world' заменю на переменную текста
    io.to(room).emit('message', 'hello world') 

    }, 4000);

  });  




  io.on('connection', (socket) => {
    console.log('user connected')

    socket.on('room', (room) => {
      socket.join(room);
      console.log('joined room' + room);
    });

    socket.on("disconnect", () => console.log("сlient disconnected"));
  });

  return router;
}

