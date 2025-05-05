package com.birducc.backend.service;

import com.birducc.backend.model.Message;
import java.util.List;

public interface PlatformService {
    List<Message> getMessages();
    Message sendMessage(Message message);
}
