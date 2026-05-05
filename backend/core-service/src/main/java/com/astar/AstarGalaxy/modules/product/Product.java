package com.astar.AstarGalaxy.modules.product;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import io.mongock.utils.field.Field;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    private String id;
    private String name;
    @Indexed(unique = true)
    private String slug;
    private Double price;
    private Integer stock;
    private String description;
    private String categoryId;
    private String supplierId;
    @Field("model_3d_url")
    private String model3dUrl;
    private List<String> images;
    private Map<String, Object> attributes;
    private Double ratingsAverage;
    @CreatedDate
    private Instant createdAt;
    @LastModifiedDate
    private Instant updatedAt;
}