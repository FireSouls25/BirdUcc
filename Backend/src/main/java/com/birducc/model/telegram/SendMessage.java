package com.birducc.model.telegram;

public class SendMessage {
    private final String type = "sendMessage";
    private final String chat_id;
    private final Object input_message_content;

    public SendMessage(String chatId, String messageText) {
        this.chat_id = chatId;
        this.input_message_content = new Object() {
            public final String type = "inputMessageText";
            public final Object text = new Object() {
                public final String type = "formattedText";
                public final String text = messageText;
            };
        };
    }

    public String getType() {
        return type;
    }

    public String getChatId() {
        return chat_id;
    }

    public Object getInputMessageContent() {
        return input_message_content;
    }
} 