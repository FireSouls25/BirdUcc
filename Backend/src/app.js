const express = require('express');
const cors = require('cors');
const telegramRoutes = require('./routes/telegramRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Telegram routes
app.use('/api/telegram', telegramRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!'
    });
});

module.exports = app; 