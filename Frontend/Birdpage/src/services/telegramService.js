import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

class TelegramService {
  constructor() {
    this.sessionId = null;
  }

  setSessionId(sessionId) {
    this.sessionId = sessionId;
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-session-id': this.sessionId
    };
  }

  async login(phoneNumber) {
    try {
      const response = await axios.post(
        `${API_URL}/telegram/login`,
        { phoneNumber },
        { headers: this.getHeaders() }
      );

      if (response.data.success && response.data.sessionId) {
        this.setSessionId(response.data.sessionId);
      }

      return response.data.success;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  async sendCode(code) {
    try {
      const response = await axios.post(
        `${API_URL}/telegram/verify`,
        { code },
        { headers: this.getHeaders() }
      );
      return response.data.success;
    } catch (error) {
      console.error('Code verification error:', error);
      return false;
    }
  }

  async getChats() {
    try {
      const response = await axios.get(
        `${API_URL}/telegram/chats`,
        { headers: this.getHeaders() }
      );
      return response.data.success ? response.data.chats : [];
    } catch (error) {
      console.error('Get chats error:', error);
      return [];
    }
  }

  async getChatHistory(chatId) {
    try {
      const response = await axios.get(
        `${API_URL}/telegram/chats/${chatId}/history`,
        { headers: this.getHeaders() }
      );
      return response.data.success ? response.data.messages : [];
    } catch (error) {
      console.error('Get chat history error:', error);
      return [];
    }
  }

  async sendMessage(chatId, text) {
    try {
      const response = await axios.post(
        `${API_URL}/telegram/chats/${chatId}/messages`,
        { text },
        { headers: this.getHeaders() }
      );
      return response.data.success;
    } catch (error) {
      console.error('Send message error:', error);
      return false;
    }
  }
}

export const telegramService = new TelegramService(); 