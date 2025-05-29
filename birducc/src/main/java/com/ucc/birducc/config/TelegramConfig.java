package com.ucc.birducc.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;

@Configuration
@Getter
public class TelegramConfig {
    
    @Value("${telegram.api.id}")
    private String apiId;
} 