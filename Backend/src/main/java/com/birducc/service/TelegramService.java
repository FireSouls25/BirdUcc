package com.birducc.service;

import com.birducc.dto.MessagePayload;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

@Service
public class TelegramService {

    private final TelegramBot telegramBot;

    public TelegramService(TelegramBot telegramBot) {
        this.telegramBot = telegramBot;
    }

    public void processIncomingMessage(MessagePayload payload) {
        SendMessage message = new SendMessage();
        message.setChatId(payload.getChatId());
        message.setText(payload.getText());

        try {
            telegramBot.execute(message);
            System.out.println("✅ Mensaje enviado a Telegram: " + payload.getText());
        } catch (TelegramApiException e) {
            System.err.println("❌ Error al enviar mensaje a Telegram: " + e.getMessage());
        }
    }

    public void sendMessage(MessagePayload payload) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'sendMessage'");
    }
}
