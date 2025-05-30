package com.ucc.birducc.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/whatsapp")
@CrossOrigin(origins = "*")
public class WhatsAppController {

    @GetMapping("/url")
    public ResponseEntity<Object> getWebAppUrl() {
        return ResponseEntity.ok(Map.of("url", "https://web.whatsapp.com"));
    }
} 