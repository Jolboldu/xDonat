  var router = require('express').Router();
  var models = require('../models');
  const textToSpeech = require('@google-cloud/text-to-speech')
  var fs = require('fs')
  var util = require('util')
  var socketLib = require('../socketApi.js')

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
    // socketLib.textDonate();
  });

  // НЕ РАБОТАЕТ, НЕТ views
  router.get('/slot_donate', (req, res) => {
  res.render('donation/slot');

  // setTimeout(function() {     

  //   // userid это рум
  // room = "abc123";
  // // хочу отправить сообщение в данный рум
  // // 'hello world' заменю на переменную текста
  // io.to(room).emit('message', 'hello world') 

  // }, 4000);

  });

  // РАБОТАЕТ
  router.get('/wheel_donate', (req, res) => {
    res.render('donation/wheel_of_fortune');

    // setTimeout(function() {     

    //   // userid это рум
    // room = "abc123";
    // // хочу отправить сообщение в данный рум
    // // 'hello world' заменю на переменную текста
    // io.to(room).emit('message') 

    // }, 4000);

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


module.exports = router;