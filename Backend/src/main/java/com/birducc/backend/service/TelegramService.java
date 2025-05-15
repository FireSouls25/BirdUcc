package com.birducc.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.birducc.backend.model.Message;

import reactor.core.publisher.Mono;

@Service
public class TelegramService implements PlatformService {

    @Value("${telegram.bot.token}")
    private String botToken;

    private final WebClient webClient;

    public TelegramService(@Value("${telegram.bot.token}") String botToken) {
        this.botToken = botToken;
        this.webClient = WebClient.create("https://api.telegram.org");
    }

    public Mono<String> sendMessage(String chatId, String text) {
        String url = String.format("/bot%s/sendMessage", botToken);

        return webClient.post()
                .uri(url)
                .bodyValue(new TelegramMessage(chatId, text))
                .retrieve()
                .bodyToMono(String.class)
                .doOnError(err -> System.err.println("❌ Error enviando a Telegram: " + err.getMessage()));
    }

    // Clase interna para el payload JSON que Telegram espera
    private static class TelegramMessage {
        private final String chat_id;
        private final String text;

        public TelegramMessage(String chat_id, String text) {
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

    @Override
    public Message sendMessage(Message message) {
        // Extrae el chatId y el contenido del objeto Message
        String chatId = message.getReceiver(); // Asume que el receptor es el chatId de Telegram
        String text = message.getContent();

    // Usa el método ya implementado para enviar el mensaje
        this.sendMessage(chatId, text)
            .subscribe(response -> {
                System.out.println("✅ Mensaje enviado a Telegram: " + response);
            }, error -> {
                System.err.println("❌ Error al enviar a Telegram: " + error.getMessage());
            });

        // Marca el mensaje como enviado y lo retorna
        return message;
    }

    @Override
    public List<Message> getMessages() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getMessages'");
    }
}
