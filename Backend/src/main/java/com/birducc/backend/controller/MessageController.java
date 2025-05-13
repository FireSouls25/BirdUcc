package com.birducc.backend.controller;

import com.birducc.backend.model.Message;
import com.birducc.backend.service.PlatformService;
import com.birducc.backend.service.TelegramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessageController {

    private final PlatformService platformService;

    @Autowired
    public MessageController(TelegramService telegramService) {
        this.platformService = telegramService;
    }

    @GetMapping
    public List<Message> getMessages() {
        return platformService.getMessages();
    }

    @PostMapping
    public Message postMessage(@RequestBody Message message) {
        System.out.println("Mensaje recibido:");
        System.out.println("De: " + message.getSender());
        System.out.println("Para: " + message.getReceiver());
        System.out.println("Contenido: " + message.getContent());
        System.out.println("Plataforma " +message.getPlatform());
        
        return platformService.sendMessage(message);
    }
}
