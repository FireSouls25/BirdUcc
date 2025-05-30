package com.birducc.model;

import java.util.Date;

import lombok.Data;

@Data
public class Message {
    private String id;
    private String text;
    private String sender;
    private String timestamp;
    private String chatId;
} 