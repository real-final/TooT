const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");


const app = express();
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://too-t.com"
    ]
}));

app.use(bodyParser.json());

// app.post("/api/voice", async (req, res) => {
//     try {
//         const webmData = req.body.audioData;
//         const response = await axios.post(voiceUrl,{
//             "image": mp3Buffer,
//         }, {
//             headers: {
//                 "X-NCP-APIGW-API-KEY-ID": clientId,
//                 "X-NCP-APIGW-API-KEY": voiceSecretKey,
//                 "Content-Type": "application/octet-stream",
//             }
//         });
//         res.json({voiceResponse: response.data});
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: error.message });
//     }
// })

app.post("/express/chatbot", async (req, res) => {
    const sendData = req.body.sendData;
    try {
        const response = await axios.post("https://clovachatbot.ncloud.com/api/chatbot/messenger/v1/11717/4341b324382837bdd4e3484b0ba438beb6f358968d0a6d09cfcacd9396c11ce6/message", sendData);
        res.json({ chatResponse: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});