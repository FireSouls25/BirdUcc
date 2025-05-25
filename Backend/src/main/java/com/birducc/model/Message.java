package com.birducc.model;

public class Message {
    private Long id;
    private String content;
    private String platform;

    public Message() {}

    public Message(Long id, String content, String platform) {
        this.id = id;
        this.content = content;
        this.platform = platform;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }
}
