package com.birducc.model.telegram;

public class AuthenticationCode {
    private final String type = "checkAuthenticationCode";
    private final String code;

    public AuthenticationCode(String code) {
        this.code = code;
    }

    public String getType() {
        return type;
    }

    public String getCode() {
        return code;
    }
} 