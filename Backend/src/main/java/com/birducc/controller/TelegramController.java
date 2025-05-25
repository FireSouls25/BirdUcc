package com.birducc.controller;

import com.birducc.dto.MessagePayload;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/telegram")
public class TelegramController {

    @PostMapping("/message")
    public ResponseEntity<String> receiveMessage(@RequestBody MessagePayload payload) {
        System.out.println("Mensaje recibido desde Telegram:");
        System.out.println("Chat ID: " + payload.getChatId());
        System.out.println("Texto: " + payload.getText());

        // Aquí puedes integrar estructuras de datos o redireccionar a otros servicios
        return ResponseEntity.ok("Mensaje recibido");
    }
}
