package com.ucc.birducc.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ucc.birducc.model.Message;
import com.ucc.birducc.model.User;
import com.ucc.birducc.service.TelegramService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/telegram")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TelegramController {

    private final TelegramService telegramService;

    @GetMapping("/auth-url")
    public ResponseEntity<String> getAuthUrl() {
        return ResponseEntity.ok(telegramService.generateAuthUrl());
    }

    @PostMapping("/callback")
    public ResponseEntity<Void> handleCallback(@RequestParam String code, @RequestBody User user) {
        telegramService.handleAuthCallback(code, user);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/disconnect")
    public ResponseEntity<Void> disconnect(@RequestBody User user) {
        telegramService.disconnectTelegram(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Boolean>> getStatus(@RequestParam String userId) {
        return ResponseEntity.ok(Map.of("connected", telegramService.getBotToken() != null));
    }

    @GetMapping("/messages")
    public ResponseEntity<List<Message>> getMessages(@RequestParam String userId) {
        return ResponseEntity.ok(telegramService.getMessages(userId));
    }

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody Map<String, String> request) {
        String text = request.get("text");
        String userId = request.get("userId");
        String chatId = request.get("chatId");
        
        Message message = telegramService.sendMessage(text, userId, chatId);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/url")
    public ResponseEntity<Object> getWebAppUrl() {
        return ResponseEntity.ok(Map.of("url", "https://web.telegram.org"));
    }
} 