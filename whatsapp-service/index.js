const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const backendSender = require('./services/backendSender');

const app = express();
app.use(express.json());

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp client is ready!');
});

client.on('message', async message => {
    if (message.body) {
        await backendSender.sendMessageToBackend({
            platform: "whatsapp",
            chatId: message.from,
            text: message.body
        });
    }
});

client.initialize();

// Optional: Endpoint to send messages FROM backend TO WhatsApp
app.post('/send', async (req, res) => {
    const { chatId, text } = req.body;
    try {
        await client.sendMessage(chatId, text);
        res.send({ status: "sent" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Failed to send message" });
    }
});

app.listen(4000, () => {
    console.log('🚀 WhatsApp microservice running on http://localhost:4000');
});
