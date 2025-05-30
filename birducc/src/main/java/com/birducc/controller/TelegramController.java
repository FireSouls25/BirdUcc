package com.birducc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.birducc.messaging.telegram.TelegramAdapter;
import com.birducc.model.Message;

@RestController
@RequestMapping("/api/telegram")
@CrossOrigin(origins = "*")
public class TelegramController {
    private final TelegramAdapter telegramAdapter;

    @Autowired
    public TelegramController(TelegramAdapter telegramAdapter) {
        this.telegramAdapter = telegramAdapter;
    }

    @PostMapping("/connect")
    public ResponseEntity<String> connect() {
        try {
            telegramAdapter.handleConnection();
            return ResponseEntity.ok("Connected to Telegram");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to connect: " + e.getMessage());
        }
    }

    @PostMapping("/disconnect")
    public ResponseEntity<String> disconnect() {
        try {
            telegramAdapter.handleDisconnection();
            return ResponseEntity.ok("Disconnected from Telegram");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to disconnect: " + e.getMessage());
        }
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody Message message) {
        try {
            telegramAdapter.sendMessage(message.getText());
            return ResponseEntity.ok("Message sent successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send message: " + e.getMessage());
        }
    }
} 