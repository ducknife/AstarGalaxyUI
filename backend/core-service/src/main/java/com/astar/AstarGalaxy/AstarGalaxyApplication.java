package com.astar.AstarGalaxy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import io.mongock.runner.springboot.EnableMongock;

@EnableMongock
@EnableMongoAuditing
@SpringBootApplication
public class AstarGalaxyApplication {

	public static void main(String[] args) {
		SpringApplication.run(AstarGalaxyApplication.class, args);
	}

}
