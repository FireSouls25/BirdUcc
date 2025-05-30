package com.birducc.messaging.factory;

import com.birducc.messaging.bridge.MessageBridge;
import com.birducc.messaging.adapter.MessageAdapter;

public interface MessagePlatformFactory {
    MessageBridge createBridge();
    MessageAdapter createAdapter();
} 