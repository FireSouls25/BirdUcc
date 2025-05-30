package com.birducc.messaging.telegram;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.birducc.messaging.adapter.MessageAdapter;

@Component
public class TelegramAdapter implements MessageAdapter {
    private final TelegramBridge bridge;
    private final List<Consumer<String>> messageListeners;

    @Autowired
    public TelegramAdapter(TelegramBridge bridge) {
        this.bridge = bridge;
        this.messageListeners = new ArrayList<>();
    }

    @Override
    public void initialize() {
        // Initialize any necessary resources
    }

    @Override
    public void sendMessage(String message) {
        bridge.sendMessage(message);
    }

    @Override
    public void receiveMessage(String message) {
        // Notify all listeners about the received message
        messageListeners.forEach(listener -> listener.accept(message));
    }

    @Override
    public void handleConnection() {
        bridge.connect();
    }

    @Override
    public void handleDisconnection() {
        bridge.disconnect();
    }

    public void addMessageListener(Consumer<String> listener) {
        messageListeners.add(listener);
    }

    public void removeMessageListener(Consumer<String> listener) {
        messageListeners.remove(listener);
    }
} 