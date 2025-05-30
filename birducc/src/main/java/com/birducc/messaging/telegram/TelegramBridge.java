package com.birducc.messaging.telegram;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

import com.birducc.config.TelegramConfig;
import com.birducc.messaging.bridge.MessageBridge;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

@Component
public class TelegramBridge extends TelegramLongPollingBot implements MessageBridge {
    private boolean connected = false;
    private final TelegramConfig config;
    private String currentChatId;
    private final List<Consumer<String>> messageListeners;

    @Autowired
    public TelegramBridge(TelegramConfig config) {
        super(config.getBotToken());
        this.config = config;
        this.messageListeners = new ArrayList<>();
    }

    @Override
    public void connect() {
        try {
            TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
            botsApi.registerBot(this);
            connected = true;
        } catch (TelegramApiException e) {
            throw new RuntimeException("Failed to connect to Telegram: " + e.getMessage(), e);
        }
    }

    @Override
    public void disconnect() {
        connected = false;
    }

    @Override
    public void sendMessage(String message) {
        if (!connected) {
            throw new IllegalStateException("Bridge is not connected");
        }
        
        if (currentChatId == null) {
            throw new IllegalStateException("No active chat");
        }
        
        try {
            SendMessage sendMessage = new SendMessage();
            sendMessage.setChatId(currentChatId);
            sendMessage.setText(message);
            execute(sendMessage);
        } catch (TelegramApiException e) {
            throw new RuntimeException("Failed to send message: " + e.getMessage(), e);
        }
    }

    @Override
    public void receiveMessage(String message) {
        // This will be handled by onUpdateReceived
    }

    @Override
    public boolean isConnected() {
        return connected;
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            currentChatId = update.getMessage().getChatId().toString();
            String receivedMessage = update.getMessage().getText();
            
            // Notify all listeners about the received message
            messageListeners.forEach(listener -> listener.accept(receivedMessage));
        }
    }

    @Override
    public String getBotUsername() {
        return config.getBotUsername();
    }

    public void addMessageListener(Consumer<String> listener) {
        messageListeners.add(listener);
    }

    public void removeMessageListener(Consumer<String> listener) {
        messageListeners.remove(listener);
    }
} 