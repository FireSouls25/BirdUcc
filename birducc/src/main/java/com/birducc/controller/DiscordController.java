package com.birducc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.birducc.messaging.discord.DiscordAdapter;
import com.birducc.model.Message;

@RestController
@RequestMapping("/api/discord")
@CrossOrigin(origins = "*")
public class DiscordController {
    private final DiscordAdapter discordAdapter;

    @Autowired
    public DiscordController(DiscordAdapter discordAdapter) {
        this.discordAdapter = discordAdapter;
    }

    @PostMapping("/connect")
    public ResponseEntity<String> connect() {
        try {
            discordAdapter.handleConnection();
            return ResponseEntity.ok("Connected to Discord");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to connect: " + e.getMessage());
        }
    }

    @PostMapping("/disconnect")
    public ResponseEntity<String> disconnect() {
        try {
            discordAdapter.handleDisconnection();
            return ResponseEntity.ok("Disconnected from Discord");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to disconnect: " + e.getMessage());
        }
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody Message message) {
        try {
            discordAdapter.sendMessage(message.getText());
            return ResponseEntity.ok("Message sent successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send message: " + e.getMessage());
        }
    }
} 