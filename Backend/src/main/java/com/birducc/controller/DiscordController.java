package com.birducc.controller;

import com.birducc.dto.MessagePayload;
import com.birducc.service.DiscordService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/discord")
public class DiscordController {

    @Value("${discord.webhook.url}")
    private String discordWebhookUrl;

    private final DiscordService discordService;

    public DiscordController(DiscordService discordMessageService) {
        this.discordService = discordMessageService;
    }

    @PostMapping("/message")
    public ResponseEntity<String> postMessageToDiscord(@RequestBody MessagePayload payload) {
        discordService.sendToDiscordWebhook(discordWebhookUrl, payload);
        return ResponseEntity.ok("Mensaje enviado a Discord");
    }
}
