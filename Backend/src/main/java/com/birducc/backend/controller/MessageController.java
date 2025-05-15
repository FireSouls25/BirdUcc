package com.birducc.backend.controller;

import com.birducc.backend.factory.PlatformServiceFactory;
import com.birducc.backend.model.Message;
import com.birducc.backend.service.TelegramService;
import com.birducc.backend.service.DiscordService;
import com.birducc.backend.service.PlatformService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessageController {

    private final PlatformServiceFactory platformServiceFactory;

    @Autowired
    public MessageController(PlatformServiceFactory platformServiceFactory) {
        this.platformServiceFactory = platformServiceFactory;
    }

    @PostMapping
    public Message postMessage(@RequestBody Message message) {
        PlatformService platformService = platformServiceFactory.getService(message.getPlatform());

        if (platformService == null) {
            throw new IllegalArgumentException("Plataforma no soportada: " + message.getPlatform());
        }

        System.out.println("Mensaje recibido:");
        System.out.println("De: " + message.getSender());
        System.out.println("Para: " + message.getReceiver());
        System.out.println("Contenido: " + message.getContent());
        System.out.println("Plataforma: " + message.getPlatform());

        return platformService.sendMessage(message);
    }

    @GetMapping
    public List<Message> getMessages(@RequestParam String platform) {
        PlatformService platformService = platformServiceFactory.getService(platform);

        if (platformService == null) {
            throw new IllegalArgumentException("Plataforma no soportada: " + platform);
        }

        return platformService.getMessages();
    }
}

