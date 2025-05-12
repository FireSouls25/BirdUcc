package com.birducc.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TelegramService {
    @Value("${telegram.api.id}")
    private String apiId;

    @Value("${telegram.api.hash}")
    private String apiHash;

    private final Map<String, TelegramSession> sessions = new ConcurrentHashMap<>();

    public String createSession() {
        String sessionId = UUID.randomUUID().toString();
        TelegramSession session = new TelegramSession(apiId, apiHash);
        sessions.put(sessionId, session);
        return sessionId;
    }

    public void login(String sessionId, String phoneNumber) {
        TelegramSession session = getSession(sessionId);
        try {
            session.getClient().send(new AuthenticationPhoneNumber(phoneNumber));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send verification code");
        }
    }

    public void verifyCode(String sessionId, String code) {
        TelegramSession session = getSession(sessionId);
        try {
            session.getClient().send(new AuthenticationCode(code));
            session.setAuthorized(true);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to verify code");
        }
    }

    public Object getChats(String sessionId) {
        TelegramSession session = getAuthorizedSession(sessionId);
        try {
            return session.getClient().send(new GetChats(20));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get chats");
        }
    }

    public Object getChatHistory(String sessionId, String chatId) {
        TelegramSession session = getAuthorizedSession(sessionId);
        try {
            return session.getClient().send(new GetChatHistory(chatId, 50));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get chat history");
        }
    }

    public void sendMessage(String sessionId, String chatId, String text) {
        TelegramSession session = getAuthorizedSession(sessionId);
        try {
            session.getClient().send(new SendMessage(chatId, text));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send message");
        }
    }

    private TelegramSession getSession(String sessionId) {
        TelegramSession session = sessions.get(sessionId);
        if (session == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid session");
        }
        return session;
    }

    private TelegramSession getAuthorizedSession(String sessionId) {
        TelegramSession session = getSession(sessionId);
        if (!session.isAuthorized()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authorized");
        }
        return session;
    }
} 