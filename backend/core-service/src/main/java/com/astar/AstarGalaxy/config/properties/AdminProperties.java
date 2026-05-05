package com.astar.AstarGalaxy.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@ConfigurationProperties(prefix = "admin")
@Getter
@Setter
public class AdminProperties {
    private String username;
    private String password;
    private String fullName;
    private String role;
    private String status;
    private String email;
}
