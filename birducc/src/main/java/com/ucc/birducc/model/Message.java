package com.ucc.birducc.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "messages")
public class Message {
    @Id
    private String id;
    private String text;
    private String sender;
    private Date timestamp;
    private String chatId;
    private String userId;
} 