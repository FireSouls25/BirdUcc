package com.birducc.model;

import org.tdweb.TdWeb;

public class TelegramSession {
    private final TdWeb client;
    private boolean authorized;

    public TelegramSession(String apiId, String apiHash) {
        this.client = new TdWeb(apiId, apiHash);
        this.authorized = false;
    }

    public TdWeb getClient() {
        return client;
    }

    public boolean isAuthorized() {
        return authorized;
    }

    public void setAuthorized(boolean authorized) {
        this.authorized = authorized;
    }
} 