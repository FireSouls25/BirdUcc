package com.birducc.controller;

import com.birducc.service.TelegramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/telegram")
@CrossOrigin(origins = "*")
public class TelegramController {

    @Autowired
    private TelegramService telegramService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request, @RequestHeader("x-session-id") String sessionId) {
        try {
            String phoneNumber = request.get("phoneNumber");
            if (sessionId == null || sessionId.isEmpty()) {
                String newSessionId = telegramService.createSession();
                telegramService.login(newSessionId, phoneNumber);
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "sessionId", newSessionId,
                    "message", "Verification code sent"
                ));
            }

            telegramService.login(sessionId, phoneNumber);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Verification code sent"
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Failed to send verification code"
            ));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String, String> request, @RequestHeader("x-session-id") String sessionId) {
        try {
            String code = request.get("code");
            telegramService.verifyCode(sessionId, code);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Successfully verified"
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Failed to verify code"
            ));
        }
    }

    @GetMapping("/chats")
    public ResponseEntity<?> getChats(@RequestHeader("x-session-id") String sessionId) {
        try {
            Object chats = telegramService.getChats(sessionId);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "chats", chats
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Failed to get chats"
            ));
        }
    }

    @GetMapping("/chats/{chatId}/history")
    public ResponseEntity<?> getChatHistory(@PathVariable String chatId, @RequestHeader("x-session-id") String sessionId) {
        try {
            Object messages = telegramService.getChatHistory(sessionId, chatId);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "messages", messages
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Failed to get chat history"
            ));
        }
    }

    @PostMapping("/chats/{chatId}/messages")
    public ResponseEntity<?> sendMessage(@PathVariable String chatId, @RequestBody Map<String, String> request, @RequestHeader("x-session-id") String sessionId) {
        try {
            String text = request.get("text");
            telegramService.sendMessage(sessionId, chatId, text);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Message sent"
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Failed to send message"
            ));
        }
    }
} 