require('dotenv').config()
const express = require('express')
const router = express.Router()
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();
const fs = require('fs');

router.post('/speech', (req, res) => {
    
    // url from front end
    let recievedUrl = req.body.blobURL.replace('blob:', '')

    async function main() {
      
        // Reads a local audio file and converts it to base64
        // const file = fs.readFileSync(recievedUrl);
        // const audioBytes = file.toString('base64');
      
        // The audio file's encoding, sample rate in hertz, and BCP-47 language code
        const audio = {
          content: recievedUrl,
        };
        const config = {
          encoding: 'LINEAR16',
          sampleRateHertz: 16000,
          languageCode: 'en-US',
        };

        const request = {
          audio: audio,
          config: config,
        };
      
        // Detects speech in the audio file
        const [response] = await client.recognize(request);
        const transcription = response.results
          .map(result => result.alternatives[0].transcript)
          .join('\n');
        console.log(`Transcription: ${transcription}`);
      }
      main().catch(console.error);
})

module.exports = router