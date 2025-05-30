import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/telegram';

const TelegramChat: React.FC = () => {
    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    const connect = async () => {
        try {
            await axios.post(`${API_BASE_URL}/connect`);
            setConnected(true);
        } catch (error) {
            console.error('Failed to connect:', error);
        }
    };

    const disconnect = async () => {
        try {
            await axios.post(`${API_BASE_URL}/disconnect`);
            setConnected(false);
        } catch (error) {
            console.error('Failed to disconnect:', error);
        }
    };

    const sendMessage = async () => {
        if (!message.trim()) return;
        
        try {
            await axios.post(`${API_BASE_URL}/send`, message);
            setMessages([...messages, `You: ${message}`]);
            setMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <div className="telegram-chat">
            <div className="chat-header">
                <h2>Telegram Chat</h2>
                <button 
                    onClick={connected ? disconnect : connect}
                    className={connected ? 'disconnect-btn' : 'connect-btn'}
                >
                    {connected ? 'Disconnect' : 'Connect'}
                </button>
            </div>
            
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        {msg}
                    </div>
                ))}
            </div>
            
            <div className="message-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    disabled={!connected}
                />
                <button 
                    onClick={sendMessage}
                    disabled={!connected}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default TelegramChat; 