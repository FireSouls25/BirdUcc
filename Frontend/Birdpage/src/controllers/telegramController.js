const { TdWeb } = require('tdweb');
const { v4: uuidv4 } = require('uuid');

// Store active sessions
const sessions = new Map();

class TelegramController {
    constructor() {
        this.apiId = process.env.TELEGRAM_API_ID;
        this.apiHash = process.env.TELEGRAM_API_HASH;
    }

    createSession() {
        const sessionId = uuidv4();
        const client = new TdWeb({
            apiId: this.apiId,
            apiHash: this.apiHash,
            useTestDc: false,
            databaseDirectory: '/tmp/tdlib',
            fileDirectory: '/tmp/tdlib',
            useChatInfoDatabase: true,
            useMessageDatabase: true,
            useFileDatabase: true,
            useTestDatabase: false,
            useDatabase: true,
            verbosityLevel: 2,
        });

        sessions.set(sessionId, {
            client,
            isAuthorized: false
        });

        return sessionId;
    }

    async login(req, res) {
        try {
            const { phoneNumber } = req.body;
            const sessionId = req.headers['x-session-id'];

            if (!sessionId || !sessions.has(sessionId)) {
                const newSessionId = this.createSession();
                sessions.get(newSessionId).client.send({
                    '@type': 'setAuthenticationPhoneNumber',
                    phone_number: phoneNumber,
                });

                return res.status(200).json({ 
                    success: true, 
                    sessionId: newSessionId,
                    message: 'Verification code sent'
                });
            }

            const session = sessions.get(sessionId);
            await session.client.send({
                '@type': 'setAuthenticationPhoneNumber',
                phone_number: phoneNumber,
            });

            res.status(200).json({ 
                success: true, 
                message: 'Verification code sent'
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to send verification code' 
            });
        }
    }

    async verifyCode(req, res) {
        try {
            const { code } = req.body;
            const sessionId = req.headers['x-session-id'];

            if (!sessionId || !sessions.has(sessionId)) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Invalid session' 
                });
            }

            const session = sessions.get(sessionId);
            await session.client.send({
                '@type': 'checkAuthenticationCode',
                code: code,
            });

            session.isAuthorized = true;
            res.status(200).json({ 
                success: true, 
                message: 'Successfully verified' 
            });
        } catch (error) {
            console.error('Verification error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to verify code' 
            });
        }
    }

    async getChats(req, res) {
        try {
            const sessionId = req.headers['x-session-id'];

            if (!sessionId || !sessions.has(sessionId)) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Invalid session' 
                });
            }

            const session = sessions.get(sessionId);
            if (!session.isAuthorized) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Not authorized' 
                });
            }

            const result = await session.client.send({
                '@type': 'getChats',
                chat_list: { '@type': 'chatListMain' },
                limit: 20,
            });

            res.status(200).json({ 
                success: true, 
                chats: result.chat_ids 
            });
        } catch (error) {
            console.error('Get chats error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to get chats' 
            });
        }
    }

    async getChatHistory(req, res) {
        try {
            const { chatId } = req.params;
            const sessionId = req.headers['x-session-id'];

            if (!sessionId || !sessions.has(sessionId)) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Invalid session' 
                });
            }

            const session = sessions.get(sessionId);
            if (!session.isAuthorized) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Not authorized' 
                });
            }

            const result = await session.client.send({
                '@type': 'getChatHistory',
                chat_id: chatId,
                limit: 50,
                offset: 0,
                only_local: false,
            });

            res.status(200).json({ 
                success: true, 
                messages: result.messages 
            });
        } catch (error) {
            console.error('Get chat history error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to get chat history' 
            });
        }
    }

    async sendMessage(req, res) {
        try {
            const { chatId, text } = req.body;
            const sessionId = req.headers['x-session-id'];

            if (!sessionId || !sessions.has(sessionId)) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Invalid session' 
                });
            }

            const session = sessions.get(sessionId);
            if (!session.isAuthorized) {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Not authorized' 
                });
            }

            await session.client.send({
                '@type': 'sendMessage',
                chat_id: chatId,
                input_message_content: {
                    '@type': 'inputMessageText',
                    text: {
                        '@type': 'formattedText',
                        text: text,
                    },
                },
            });

            res.status(200).json({ 
                success: true, 
                message: 'Message sent' 
            });
        } catch (error) {
            console.error('Send message error:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Failed to send message' 
            });
        }
    }
}

module.exports = new TelegramController(); 