package com.birducc.model.telegram;

public class GetChats {
    private final String type = "getChats";
    private final Object chat_list = new Object() {
        public final String type = "chatListMain";
    };
    private final int limit;

    public GetChats(int limit) {
        this.limit = limit;
    }

    public String getType() {
        return type;
    }

    public Object getChatList() {
        return chat_list;
    }

    public int getLimit() {
        return limit;
    }
} 