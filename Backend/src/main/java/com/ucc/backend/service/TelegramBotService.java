package com.ucc.backend.service;

import com.ucc.backend.model.Message;
import com.ucc.backend.model.MessagePlatform;
import com.ucc.backend.model.User;
import com.ucc.backend.repository.MessageRepository;
import com.ucc.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

@Service
@RequiredArgsConstructor
public class TelegramBotService extends TelegramLongPollingBot {

    private final UserRepository userRepository;
    private final MessageRepository messageRepository;

    @Value("${telegram.bot.token}")
    private String botToken;

    @Value("${telegram.bot.username}")
    private String botUsername;

    @Override
    public String getBotUsername() {
        return botUsername;
    }

    @Override
    public String getBotToken() {
        return botToken;
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            String chatId = update.getMessage().getChatId().toString();
            String text = update.getMessage().getText();
            String senderId = update.getMessage().getFrom().getId().toString();

            // Find or create user
            User user = userRepository.findByTelegramChatId(chatId)
                    .orElseGet(() -> {
                        User newUser = new User();
                        newUser.setTelegramChatId(chatId);
                        newUser.setUsername("telegram_" + senderId);
                        return userRepository.save(newUser);
                    });

            // Save message
            Message message = new Message();
            message.setContent(text);
            message.setPlatform(MessagePlatform.TELEGRAM);
            message.setUser(user);
            message.setSenderId(senderId);
            message.setReceiverId(botUsername);
            messageRepository.save(message);

            // Send response
            SendMessage response = new SendMessage();
            response.setChatId(chatId);
            response.setText("Message received: " + text);
            try {
                execute(response);
            } catch (TelegramApiException e) {
                e.printStackTrace();
            }
        }
    }

    public void sendMessage(String chatId, String text) {
        SendMessage message = new SendMessage();
        message.setChatId(chatId);
        message.setText(text);
        try {
            execute(message);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }
} 