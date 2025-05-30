package com.birducc.messaging.adapter;

public interface MessageAdapter {
    void initialize();
    void sendMessage(String message);
    void receiveMessage(String message);
    void handleConnection();
    void handleDisconnection();
} 