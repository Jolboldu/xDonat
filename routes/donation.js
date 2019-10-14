  var router = require('express').Router();
  var models = require('../models');
  const textToSpeech = require('@google-cloud/text-to-speech')
  var fs = require('fs')
  var util = require('util')
  var socketLib = require('../socketApi.js')


  var appDir = process.cwd();

  router.get('/tts', function(req, res){
    console.log(appDir);
    const file = appDir + '/output.mp3';
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

  // Text donate route
  router.get('/text_donate', (req, res) => {
    // var data = '{"donater": "akunMata", "text": "привет Аниме, как твои дела, покажи сиськи", "amount": 149}'

    let user_token = req.query.token
    res.render('donation/text', {user_token: user_token});
    // socketLib.text_donate(data);
  });

  // НЕ РАБОТАЕТ, НЕТ views
  router.get('/slot_donate', (req, res) => {
    let user_token = req.query.token
    res.render('donation/slot', {user_token: user_token});
  });

  // Wheel donate route
  router.get('/wheel_donate', (req, res) => {
    // var data = '{"donater": "akunMata", "text": "привет Аниме, как твои дела, покажи сиськи", "amount": 149}'

    let user_token = req.query.token
    res.render('donation/wheel_of_fortune', {user_token: user_token});
    // socketLib.wheel_donate(data);
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

     // сделать path для сервера
     await writeFile('/xdonat/public/output.mp3', response.audioContent, 'binary');

     console.log('Audio content written to file: output.mp3');
     res.sendStatus(200);
   }
   main();

});


module.exports = router;
