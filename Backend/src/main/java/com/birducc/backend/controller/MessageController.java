package com.birducc.backend.controller;

import com.birducc.backend.model.Message;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessageController {

    private List<Message> messages = new ArrayList<>();

    @GetMapping
    public List<Message> getMessages() {
        return messages;
    }

    @PostMapping
    public Message postMessage(@RequestBody Message message) {
        messages.add(message);
        return message;
    }
}
