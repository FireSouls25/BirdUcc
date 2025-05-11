package com.ucc.backend.repository;

import com.ucc.backend.model.Message;
import com.ucc.backend.model.MessagePlatform;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByUser_IdAndPlatform(Long userId, MessagePlatform platform);
    List<Message> findBySenderIdAndReceiverId(String senderId, String receiverId);
} 