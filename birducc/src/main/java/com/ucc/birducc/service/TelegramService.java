package com.ucc.birducc.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import com.ucc.birducc.config.TelegramConfig;
import com.ucc.birducc.model.Message;
import com.ucc.birducc.model.User;
import com.ucc.birducc.repository.MessageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TelegramService extends TelegramLongPollingBot {
    
    private final TelegramConfig telegramConfig;
    private final MessageRepository messageRepository;

    @Value("${telegram.bot.token}")
    private String botToken;

    @Value("${telegram.bot.username}")
    private String botUsername;

    @Value("${frontend.url}")
    private String frontendUrl;
    
    public String generateAuthUrl() {
        return String.format("https://oauth.telegram.org/auth?bot_id=%s&origin=%s&return_to=%s/auth/telegram/callback",
                telegramConfig.getApiId(), frontendUrl, frontendUrl);
    }
    
    public void handleAuthCallback(String code, User user) {
        user.setTelegramConnected(true);
        user.setTelegramSession(code);
    }
    
    public void disconnectTelegram(User user) {
        user.setTelegramConnected(false);
        user.setTelegramSession(null);
    }

    public List<Message> getMessages(String userId) {
        return messageRepository.findByUserIdOrderByTimestampDesc(userId);
    }

    public Message sendMessage(String text, String userId, String chatId) {
        Message message = new Message();
        message.setText(text);
        message.setSender("me");
        message.setTimestamp(new Date());
        message.setUserId(userId);
        message.setChatId(chatId);

        SendMessage sendMessage = new SendMessage();
        sendMessage.setChatId(chatId);
        sendMessage.setText(text);
        
        try {
            execute(sendMessage);
            return messageRepository.save(message);
        } catch (TelegramApiException e) {
            throw new RuntimeException("Error sending message to Telegram", e);
        }
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            String chatId = update.getMessage().getChatId().toString();
            String text = update.getMessage().getText();
            String userId = update.getMessage().getFrom().getId().toString();

            Message message = new Message();
            message.setText(text);
            message.setSender("them");
            message.setTimestamp(new Date());
            message.setUserId(userId);
            message.setChatId(chatId);

            messageRepository.save(message);
        }
    }

    @Override
    public String getBotUsername() {
        return botUsername;
    }

    @Override
    public String getBotToken() {
        return botToken;
    }
} 