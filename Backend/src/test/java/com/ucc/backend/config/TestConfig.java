package com.ucc.backend.config;

import org.mockito.Mockito;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.telegram.telegrambots.meta.TelegramBotsApi;

@TestConfiguration
public class TestConfig {
    
    @Bean
    @Primary
    public TelegramBotsApi telegramBotsApi() {
        return Mockito.mock(TelegramBotsApi.class);
    }
} 