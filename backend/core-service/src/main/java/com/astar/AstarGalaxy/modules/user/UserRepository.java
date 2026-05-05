package com.astar.AstarGalaxy.modules.user;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String>{
    Boolean existsByRole(String role);
    Boolean existsByUsername(String username);
    Optional<User> findByUsername(String username); 
}
