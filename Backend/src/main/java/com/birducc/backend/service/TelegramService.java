package com.birducc.backend.service;

import com.birducc.backend.config.TelegramBotConfig;
import com.birducc.backend.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Service
public class TelegramService implements PlatformService {

    private final TelegramBotConfig config;
    private final WebClient webClient;
    private final List<Message> messageHistory = new ArrayList<>();

    @Autowired
    public TelegramService(TelegramBotConfig config) {
        this.config = config;
        this.webClient = WebClient.builder().baseUrl(config.getApiUrl()).build();
    }

    @Override
    public List<Message> getMessages() {
        return messageHistory;
    }

    @Override
    public Message sendMessage(Message message) {
        String url = config.getSendMessageUrl();

        webClient.post()
                .uri(url)
                .bodyValue(buildPayload(message))
                .retrieve()
                .bodyToMono(String.class)
                .doOnError(error -> System.err.println("Error al enviar mensaje a Telegram: " + error.getMessage()))
                .subscribe(response -> System.out.println("Respuesta de Telegram: " + response));

        messageHistory.add(message);
        return message;
    }

    private TelegramSendMessagePayload buildPayload(Message message) {
        return new TelegramSendMessagePayload(message.getReceiver(), message.getContent());
    }

    // Clase interna para el JSON esperado por Telegram
    private static class TelegramSendMessagePayload {
        private final String chat_id;
        private final String text;

        public TelegramSendMessagePayload(String chat_id, String text) {
            this.chat_id = chat_id;
            this.text = text;
        }

        public String getChat_id() {
            return chat_id;
        }

        public String getText() {
            return text;
        }
    }
}
