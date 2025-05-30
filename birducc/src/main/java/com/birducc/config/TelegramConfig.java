package com.birducc.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
public class TelegramConfig {
    @Value("${telegram.api.id}")
    private String apiId;

    @Value("${telegram.bot.token}")
    private String botToken;

    @Value("${telegram.bot.username}")
    private String botUsername;

    @Value("${telegram.webapp.url}")
    private String webappUrl;

    public String getApiId() {
        return apiId;
    }

    public String getBotToken() {
        return botToken;
    }

    public String getBotUsername() {
        return botUsername;
    }

    public String getWebappUrl() {
        return webappUrl;
    }
} 