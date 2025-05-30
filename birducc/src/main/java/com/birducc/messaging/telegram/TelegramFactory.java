package com.birducc.messaging.telegram;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.birducc.messaging.factory.MessagePlatformFactory;
import com.birducc.messaging.bridge.MessageBridge;
import com.birducc.messaging.adapter.MessageAdapter;

@Component
public class TelegramFactory implements MessagePlatformFactory {
    private final TelegramBridge bridge;

    @Autowired
    public TelegramFactory(TelegramBridge bridge) {
        this.bridge = bridge;
    }

    @Override
    public MessageBridge createBridge() {
        return bridge;
    }

    @Override
    public MessageAdapter createAdapter() {
        return new TelegramAdapter(bridge);
    }
} 