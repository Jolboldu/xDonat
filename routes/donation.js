module.exports = function (io) {

  var router = require('express').Router();
  var models = require('../models');
  const textToSpeech = require('@google-cloud/text-to-speech')

  router.get('/tts', function(req, res){

    const file = __dirname + '/output.mp3';
    fs.exists(file, (exists) => {
        if (exists) {
            const rstream = fs.createReadStream(file);
            rstream.pipe(res);
        } else {
            res.send('Error - 404');
            res.end();
        }
    });

  });

  router.get('/text_donate', (req, res) => {
    res.render('donation/text');
    
    
    var isDonation = true

    if(isDonation)
    {
    // таймАут стоит временно, чтобы проверить работу Сокетов
    setTimeout(function() {     

      // userid это рум
    room = "abc123";
    // хочу отправить сообщение в данный рум
    var data = '{"donater": "akunMata", "text": "привет Аниме, как твои дела, покажи сиськи", "amount": 149}'
    io.to(room).emit('message', data) 

    // Function to Work with sounds
      async function main() {
       // Creates a client
       const client = new textToSpeech.TextToSpeechClient();
       // The text to synthesize
       // const text = req.body.text
       const text = 'Привет мир'
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





    }, 5000);

    }

  });

  




  // НЕ РАБОТАЕТ, НЕТ views
  router.get('/slot_donate', (req, res) => {
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
  router.get('/wheel_donate', (req, res) => {
    res.render('donation/wheel_of_fortune');

    setTimeout(function() {     

      // userid это рум
    room = "abc123";
    // хочу отправить сообщение в данный рум
    // 'hello world' заменю на переменную текста
    io.to(room).emit('message') 

    }, 4000);

    // works fine
    // setTimeout(function()
    // {
    //   io.to(room).emit('message', 'hello world2')
    // }, 18000);

  });  

  router.post('/ttsc', function(req, res){
  
  console.log('zashel')
  async function main() {
     // Creates a client
     const client = new textToSpeech.TextToSpeechClient();
     // The text to synthesize
     const text = req.body.text
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
     res.sendStatus(200);
   }
   main();

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



module.exports.textDonate = function(data) {
    var isDonation = true
    console.log('hello suka')
    if(isDonation)
    {
    // таймАут стоит временно, чтобы проверить работу Сокетов
    setTimeout(function() {     

      // userid это рум
    room = "abc123";
    // хочу отправить сообщение в данный рум
    var data = '{"donater": "akunMata", "text": "привет Аниме, как твои дела, покажи сиськи", "amount": 149}'
    io.to(room).emit('message', data) 

    // Function to Work with sounds
      async function main() {
       // Creates a client
       const client = new textToSpeech.TextToSpeechClient();
       // The text to synthesize
       // const text = req.body.text
       const text = 'Привет'
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





    }, 5000);

    }

  };
