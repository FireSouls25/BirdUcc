package com.ucc.birducc.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ucc.birducc.model.Message;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByChatIdOrderByTimestampDesc(String chatId);
    List<Message> findByUserIdOrderByTimestampDesc(String userId);
} 