package com.birducc.messaging.discord;

import org.springframework.stereotype.Component;

import com.birducc.messaging.bridge.MessageBridge;

@Component
public class DiscordBridge implements MessageBridge {
    private boolean connected = false;

    @Override
    public void connect() {
        connected = true;
    }

    @Override
    public void disconnect() {
        connected = false;
    }

    @Override
    public void sendMessage(String message) {
        // Not needed for web app integration
    }

    @Override
    public void receiveMessage(String message) {
        // Not needed for web app integration
    }

    @Override
    public boolean isConnected() {
        return connected;
    }
} 