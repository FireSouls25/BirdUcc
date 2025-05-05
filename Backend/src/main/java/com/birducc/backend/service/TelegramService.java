package com.birducc.backend.service;

import com.birducc.backend.model.Message;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TelegramService implements PlatformService {

    private List<Message> messages = new ArrayList<>();

    @Override
    public List<Message> getMessages() {
        return messages;
    }

    @Override
    public Message sendMessage(Message message) {
        System.out.println("Enviando mensaje...");
        System.out.println("De: " + message.getSender());
        System.out.println("Para: " + message.getReceiver());
        System.out.println("Contenido: " + message.getContent());
        
        messages.add(message);
        return message;
    }
}
