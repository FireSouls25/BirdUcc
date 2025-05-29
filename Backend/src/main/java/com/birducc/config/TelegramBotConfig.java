package com.birducc.config;

import com.birducc.service.TelegramBot;
import org.springframework.context.annotation.Configuration;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

import jakarta.annotation.PostConstruct;

@Configuration
public class TelegramBotConfig {

    private final TelegramBot telegramBot;

    public TelegramBotConfig(TelegramBot telegramBot) {
        this.telegramBot = telegramBot;
    }

    @PostConstruct
    public void registerBot() {
        try {
            TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
            botsApi.registerBot(telegramBot);
            System.out.println("✅ Bot de Telegram registrado correctamente");
        } catch (Exception e) {
            System.err.println("❌ Error registrando el bot de Telegram: " + e.getMessage());
        }
    }
}
