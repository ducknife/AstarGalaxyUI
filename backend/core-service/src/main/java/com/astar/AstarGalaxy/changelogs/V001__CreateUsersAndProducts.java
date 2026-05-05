package com.astar.AstarGalaxy.changelogs;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.astar.AstarGalaxy.config.properties.AdminProperties;
import com.astar.AstarGalaxy.modules.product.Product;
import com.astar.AstarGalaxy.modules.user.User;

import io.mongock.api.annotations.ChangeUnit;
import io.mongock.api.annotations.Execution;
import io.mongock.api.annotations.RollbackExecution;

@ChangeUnit(id = "v001-create-users-products", order = "001", author = "astar")
public class V001__CreateUsersAndProducts {

	@Execution
	public void execute(
			MongoTemplate mongoTemplate,
			AdminProperties adminProperties,
			PasswordEncoder passwordEncoder
	) {
		if (!mongoTemplate.collectionExists(User.class)) {
			mongoTemplate.createCollection(User.class);
		}

		Criteria adminCriteria = new Criteria().orOperator(
				Criteria.where("role").is("ROLE_ADMIN"),
				Criteria.where("username").is("admin"),
				Criteria.where("username").is(adminProperties.getUsername())
		);
		Query adminQuery = Query.query(adminCriteria);
		if (!mongoTemplate.exists(adminQuery, User.class)) {
			User admin = User.builder()
					.username(adminProperties.getUsername())
					.password(passwordEncoder.encode(adminProperties.getPassword()))
					.fullName(adminProperties.getFullName())
					.email(adminProperties.getEmail())
					.role(adminProperties.getRole())
					.status(adminProperties.getStatus())
					.createdAt(Instant.now())
					.updatedAt(Instant.now())
					.build()
					;

			mongoTemplate.insert(admin);
		}

		if (!mongoTemplate.collectionExists(Product.class)) {
			mongoTemplate.createCollection(Product.class);
		}

		Query productQuery = Query.query(Criteria.where("slug").is("phantom-drone-v2"));
		if (!mongoTemplate.exists(productQuery, Product.class)) {
			Product product = Product.builder()
					.name("Phantom Drone V2")
					.slug("phantom-drone-v2")
					.price(1299.0)
					.stock(10)
					.description("High-end stealth drone with stabilized 4K optics and extended range.")
					.model3dUrl("/models/phantom-drone-v2.glb")
					.images(List.of("/images/phantom-drone-v2.png"))
					.attributes(Map.of(
							"color", "graphite",
							"range_km", 18,
							"max_speed_kmh", 72
					))
					.ratingsAverage(4.7)
					.createdAt(Instant.now())
					.updatedAt(Instant.now())
					.build();

			mongoTemplate.insert(product);
		}
	}

	@RollbackExecution
	public void rollback() {
		// No rollback needed for initial seed data
	}
}
