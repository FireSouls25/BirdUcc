package com.birducc.controller;

import com.birducc.dto.MessagePayload;
import com.birducc.service.TelegramService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/telegram")
public class TelegramController {

    private final TelegramService telegramService;

    public TelegramController(TelegramService telegramService) {
        this.telegramService = telegramService;
    }

    @PostMapping("/message")
    public ResponseEntity<String> receiveMessage(@RequestBody MessagePayload payload) {
        telegramService.processIncomingMessage(payload);
        return ResponseEntity.ok("✅ Mensaje recibido y procesado");
    }
}
