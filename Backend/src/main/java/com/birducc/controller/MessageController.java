package com.birducc.controller;

import com.birducc.dto.MessagePayload;
import com.birducc.service.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/platform")
@Tag(name = "Message Controller", description = "Enrutamiento de mensajes a plataformas")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @Operation(summary = "Envia un mensaje a una plataforma")
    @PostMapping("/{platform}/message")
    public ResponseEntity<String> receiveMessage(
            @PathVariable String platform,
            @Valid @RequestBody MessagePayload payload) {
        payload.setPlatform(platform);
        messageService.routeMessage(payload);
        return ResponseEntity.ok("Message routed to " + platform);
    }
}
