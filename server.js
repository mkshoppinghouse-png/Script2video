
const express = require('express');
const bodyParser = require('body-parser');
const { generateVideo } = require('./ffmpeg-utils');
const { generateImage, generateVoice } = require('./ai-services');
const path = require('path');
const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname,'client')));

app.post('/generate', async (req,res)=>{
    const { lines } = req.body;
    try {
        for(let line of lines){
            line.image = await generateImage(line.text);
            line.voice = line.userVoice || await generateVoice(line.text, line.lang);
        }
        const videoPath = await generateVideo(lines);
        res.json({ success:true, videoUrl: `/videos/${videoPath}` });
    } catch(err){
        console.error(err);
        res.status(500).json({ success:false, error:err.message });
    }
});

app.listen(3000, ()=>console.log('Server running on port 3000'));
