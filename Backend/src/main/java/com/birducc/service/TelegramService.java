package com.birducc.service;

import com.birducc.dto.MessagePayload;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TelegramService {

    @Value("${telegram.api.url}")
    private String telegramApiUrl;

    @Value("${telegram.bot.token}")
    private String botToken;

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendMessage(MessagePayload payload) {
        String chatId = payload.getChatId();
        String text = payload.getText();

        String url = String.format("%s%s/sendMessage?chat_id=%s&text=%s", telegramApiUrl, botToken, chatId, text);

        restTemplate.postForObject(url, null, String.class);
    }
}
