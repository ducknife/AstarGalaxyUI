package com.astar.AstarGalaxy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.mongock.runner.springboot.EnableMongock;

@EnableMongock
@SpringBootApplication
public class AstarGalaxyApplication {

	public static void main(String[] args) {
		SpringApplication.run(AstarGalaxyApplication.class, args);
	}

}
