package com.birducc.model.telegram;

public class GetChatHistory {
    private final String type = "getChatHistory";
    private final String chat_id;
    private final int limit;
    private final int offset = 0;
    private final boolean only_local = false;

    public GetChatHistory(String chatId, int limit) {
        this.chat_id = chatId;
        this.limit = limit;
    }

    public String getType() {
        return type;
    }

    public String getChatId() {
        return chat_id;
    }

    public int getLimit() {
        return limit;
    }

    public int getOffset() {
        return offset;
    }

    public boolean isOnlyLocal() {
        return only_local;
    }
} 