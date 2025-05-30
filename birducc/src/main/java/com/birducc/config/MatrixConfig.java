package com.birducc.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
public class MatrixConfig {
    @Value("${matrix.homeserver.url}")
    private String homeserverUrl;

    @Value("${matrix.user.id}")
    private String userId;

    @Value("${matrix.access.token}")
    private String accessToken;

    public String getHomeserverUrl() {
        return homeserverUrl;
    }

    public String getUserId() {
        return userId;
    }

    public String getAccessToken() {
        return accessToken;
    }
} 