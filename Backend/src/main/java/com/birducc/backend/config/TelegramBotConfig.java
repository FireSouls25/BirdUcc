package com.birducc.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TelegramBotConfig {

    @Value("${telegram.bot.token}")
    private String telegramToken;

    @Value("${telegram.api.url}")
    private String telegramApiUrl;

    public String getBotToken() {
        return telegramToken;
    }

    public String getApiUrl() {
        return telegramApiUrl;
    }

    public String getSendMessageUrl() {
        return telegramApiUrl + telegramToken + "/sendMessage";
    }
}
