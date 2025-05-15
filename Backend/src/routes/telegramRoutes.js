const express = require('express');
const router = express.Router();
const telegramController = require('../controllers/telegramController');

// Telegram authentication routes
router.post('/login', telegramController.login);
router.post('/verify', telegramController.verifyCode);

// Telegram chat routes
router.get('/chats', telegramController.getChats);
router.get('/chats/:chatId/history', telegramController.getChatHistory);
router.post('/chats/:chatId/messages', telegramController.sendMessage);

module.exports = router; 