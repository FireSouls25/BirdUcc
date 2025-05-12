import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TelegramClient.css';

const TelegramClient = () => {
    const [sessionId, setSessionId] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [error, setError] = useState(null);

    const API_BASE_URL = 'http://localhost:3000/api/telegram';

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, 
                { phoneNumber },
                { headers: { 'x-session-id': sessionId || '' } }
            );
            
            if (response.data.success) {
                if (response.data.sessionId) {
                    setSessionId(response.data.sessionId);
                }
                setError(null);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send verification code');
        }
    };

    const handleVerificationSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/verify`, 
                { code: verificationCode },
                { headers: { 'x-session-id': sessionId } }
            );
            
            if (response.data.success) {
                setIsAuthenticated(true);
                setError(null);
                loadChats();
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to verify code');
        }
    };

    const loadChats = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/chats`, {
                headers: { 'x-session-id': sessionId }
            });
            
            if (response.data.success) {
                setChats(response.data.chats);
                setError(null);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load chats');
        }
    };

    const loadChatHistory = async (chatId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/chats/${chatId}/history`, {
                headers: { 'x-session-id': sessionId }
            });
            
            if (response.data.success) {
                setMessages(response.data.messages);
                setError(null);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load chat history');
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedChat) return;

        try {
            const response = await axios.post(
                `${API_BASE_URL}/chats/${selectedChat}/messages`,
                { text: newMessage },
                { headers: { 'x-session-id': sessionId } }
            );
            
            if (response.data.success) {
                setNewMessage('');
                loadChatHistory(selectedChat);
                setError(null);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send message');
        }
    };

    useEffect(() => {
        if (selectedChat) {
            loadChatHistory(selectedChat);
        }
    }, [selectedChat]);

    if (!isAuthenticated) {
        return (
            <div className="telegram-auth">
                {!sessionId ? (
                    <form onSubmit={handlePhoneSubmit}>
                        <h2>Enter Phone Number</h2>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Phone Number"
                            required
                        />
                        <button type="submit">Send Code</button>
                    </form>
                ) : (
                    <form onSubmit={handleVerificationSubmit}>
                        <h2>Enter Verification Code</h2>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="Verification Code"
                            required
                        />
                        <button type="submit">Verify</button>
                    </form>
                )}
                {error && <div className="error">{error}</div>}
            </div>
        );
    }

    return (
        <div className="telegram-client">
            <div className="chats-list">
                <h2>Chats</h2>
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        className={`chat-item ${selectedChat === chat.id ? 'selected' : ''}`}
                        onClick={() => setSelectedChat(chat.id)}
                    >
                        {chat.title}
                    </div>
                ))}
            </div>
            <div className="chat-window">
                {selectedChat ? (
                    <>
                        <div className="messages">
                            {messages.map((message) => (
                                <div key={message.id} className="message">
                                    <div className="message-content">{message.content}</div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendMessage} className="message-input">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                            />
                            <button type="submit">Send</button>
                        </form>
                    </>
                ) : (
                    <div className="no-chat-selected">Select a chat to start messaging</div>
                )}
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    );
};

export default TelegramClient; 