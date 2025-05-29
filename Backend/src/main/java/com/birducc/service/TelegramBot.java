package com.birducc.service;

import com.birducc.dto.MessagePayload;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.objects.Update;

@Component
public class TelegramBot extends TelegramLongPollingBot {

    @Value("${telegram.bot.username}")
    private String botUsername;

    @Value("${telegram.bot.token}")
    private String botToken;

    @Value("${telegram.bot.id}")
    private String botId;

    private final RestTemplate restTemplate = new RestTemplate();

    public TelegramBot() {
        // Llamamos al constructor deprecated porque es el recomendado por la librería
        super();
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            String msg = update.getMessage().getText();
            String chatId = update.getMessage().getChatId().toString();

            MessagePayload payload = new MessagePayload();
            payload.setChatId(chatId);
            payload.setText(msg);

            restTemplate.postForObject("http://localhost:3000/telegram/message", payload, String.class);
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
