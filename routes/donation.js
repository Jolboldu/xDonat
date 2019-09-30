module.exports = function(io) {

	var router = require('express').Router();
	var models = require('../models');


	router.get('/', (req, res) => {
    // res.send('hello');
    res.render('donation/text');
    // res.render('dashboard', { data: req.user });
    room = "abc123";
  	// хочу отправить сообщение в данный рум
  	io.in(room).emit('message', 'what is going on, party people?');
});


    io.on('connection', function(socket) { 
    	console.log('user connected')

  	socket.on('room', function (room) {
    	socket.join(room);
  	});


    });



    return router;
}

