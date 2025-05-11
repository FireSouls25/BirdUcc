package com.ucc.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true)
    private String telegramChatId;

    private String sessionToken;
    private LocalDateTime lastLogin;
    private boolean isActive;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Message> messages = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        lastLogin = LocalDateTime.now();
        isActive = true;
    }
} 