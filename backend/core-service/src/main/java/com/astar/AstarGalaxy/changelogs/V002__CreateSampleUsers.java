package com.astar.AstarGalaxy.changelogs;

import java.time.Instant;
import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.astar.AstarGalaxy.modules.user.User;

import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;

@ChangeUnit(id = "v002-create-sample-users", order = "002", author = "astar")
public class V002__CreateSampleUsers {

    @Execution
    public void execute(MongoTemplate mongoTemplate, PasswordEncoder passwordEncoder) {
        List<User> sampleUsers = List.of(
                User.builder()
                        .username("user1")
                        .password(passwordEncoder.encode("user1"))
                        .fullName("John Smith")
                        .email("user1@alandas.site")
                        .role("ROLE_USER")
                        .status("ACTIVE")
                        .createdAt(Instant.now())
                        .updatedAt(Instant.now())
                        .build(),
                User.builder()
                        .username("user2")
                        .password(passwordEncoder.encode("user2"))
                        .fullName("Emily Johnson")
                        .email("user2@alandas.site")
                        .role("ROLE_USER")
                        .status("ACTIVE")
                        .createdAt(Instant.now())
                        .updatedAt(Instant.now())
                        .build(),
                User.builder()
                        .username("user3")
                        .password(passwordEncoder.encode("user3"))
                        .fullName("Michael Davis")
                        .email("user3@alandas.site")
                        .role("ROLE_USER")
                        .status("ACTIVE")
                        .createdAt(Instant.now())
                        .updatedAt(Instant.now())
                        .build()
        );

        for (User user : sampleUsers) {
            Query query = Query.query(Criteria.where("username").is(user.getUsername()));
            if (!mongoTemplate.exists(query, User.class)) {
                mongoTemplate.insert(user);
            }
        }
    }

    @RollbackExecution
    public void rollback() {
        // No rollback needed for seed data
    }
}
