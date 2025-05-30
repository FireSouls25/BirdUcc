package com.birducc.messaging.bridge;

public interface MessageBridge {
    void connect();
    void disconnect();
    void sendMessage(String message);
    void receiveMessage(String message);
    boolean isConnected();
} 