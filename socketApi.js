var socket_io = require('socket.io');
const textToSpeech = require('@google-cloud/text-to-speech')
var fs = require('fs')
var util = require('util')

var io = socket_io();
var socketApi = {};

socketApi.io = io;


// Connection
io.on('connection', (socket) => {
  console.log('User connected')

  socket.on('room', (room) => {
    socket.join(room);
    console.log('joined room ' + room);
  });

  socket.on("disconnect", () => console.log("User disconnected"));
});


// Functions for donations
socketApi.sendNotification = function() {
    io.sockets.emit('hello', {msg: 'Hello World!'});
}

socketApi.hello = function() {
	console.log('hello');
}

socketApi.text_donate = function() {
	 var isDonation = true

    if(isDonation)
    {
    // таймАут стоит временно, чтобы проверить работу Сокетов
    setTimeout(function() {     

      // userid это рум
    room = "abc123";
    // хочу отправить сообщение в данный рум
    var data = '{"donater": "akunMata", "text": "привет Аниме, как твои дела, покажи сиськи", "amount": 149}'



    // function to Work with sounds
      async function main() {
       // Creates a client
       const client = new textToSpeech.TextToSpeechClient();
       // The text to synthesize
       // const text = req.body.text
       const text = 'Привет Твич Мир'
       //Construct the request
       const request = {
         input: {text: text},
         // Select the language and SSML Voice Gender (optional)
         voice: {languageCode: 'ru-RU', ssmlGender: 'MALE'},
         // Select the type of audio encoding
         audioConfig: {audioEncoding: 'MP3'},
       };
       // // Performs the Text-to-Speech request
       const [response] = await client.synthesizeSpeech(request);
       // Write the binary audio content to a local file
       const writeFile = util.promisify(fs.writeFile);
       await writeFile('output.mp3', response.audioContent, 'binary');

       console.log('Audio content written to file: output.mp3');
       // res.sendStatus(200);
      }
      main();


      io.to(room).emit('message', data) 




    }, 5000);

    }
}

module.exports = socketApi;