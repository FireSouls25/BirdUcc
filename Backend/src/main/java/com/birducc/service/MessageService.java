package com.birducc.service;

import com.birducc.dto.MessagePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private final DiscordService discordService;
    private final TelegramService telegramService;

    @Autowired
    public MessageService(DiscordService discordService, TelegramService telegramService) {
        this.discordService = discordService;
        this.telegramService = telegramService;
    }

    public void routeMessage(MessagePayload payload) {
        String platform = payload.getPlatform().toLowerCase();

        switch (platform) {
            case "telegram":
                telegramService.sendMessage(payload);
                break;

            case "discord":
                discordService.sendMessageToDiscord(payload.getText());
                break;

            case "whatsapp":
                // Por implementar cuando tengas el microservicio WhatsApp listo
                break;

            default:
                throw new IllegalArgumentException("Unsupported platform: " + platform);
        }
    }
}
