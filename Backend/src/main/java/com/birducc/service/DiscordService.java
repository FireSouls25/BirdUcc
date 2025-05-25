package com.birducc.service;

import com.birducc.dto.MessagePayload;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class DiscordService {

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendToDiscordWebhook(String webhookUrl, MessagePayload payload) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("content", formatMessage(payload));

        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);
        restTemplate.postForObject(webhookUrl, request, String.class);
    }

    public void sendMessageToDiscord(String message) {
    // Usa un webhook por defecto si quieres, o haz que venga de application.properties
    String defaultWebhook = "https://discord.com/api/webhooks/1370024199434932295/fjm8iz_MC8920ojyWFQ8NMOnexRfYL9YpCz1MP2wCbMwsrcp7NQD5wozPkPn6AttHQ1D";

    MessagePayload payload = new MessagePayload();
    payload.setText(message);
    payload.setChatId("N/A");
    payload.setPlatform("Discord");

    sendToDiscordWebhook(defaultWebhook, payload);
}
    private String formatMessage(MessagePayload payload) {
        return "**[" + payload.getPlatform() + "]** " + payload.getChatId() + ": " + payload.getText();
    }
}
