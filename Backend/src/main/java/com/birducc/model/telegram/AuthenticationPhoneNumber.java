package com.birducc.model.telegram;

public class AuthenticationPhoneNumber {
    private final String type = "setAuthenticationPhoneNumber";
    private final String phone_number;

    public AuthenticationPhoneNumber(String phoneNumber) {
        this.phone_number = phoneNumber;
    }

    public String getType() {
        return type;
    }

    public String getPhoneNumber() {
        return phone_number;
    }
} 