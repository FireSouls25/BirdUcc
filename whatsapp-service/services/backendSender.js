const axios = require('axios');

async function sendMessageToBackend(payload) {
    try {
        await axios.post('http://localhost:3000/platform/whatsapp/message', payload);
        console.log("✅ Sent to backend:", payload);
    } catch (err) {
        console.error("❌ Failed to send to backend:", err.message);
    }
}

module.exports = { sendMessageToBackend };
