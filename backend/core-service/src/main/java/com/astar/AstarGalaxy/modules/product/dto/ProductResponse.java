package com.astar.AstarGalaxy.modules.product.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {
    private String name;
    private String slug;
    private Double price;
    private Integer stock;
    private String description;
    private String categoryId;
    private String supplierId;
    private String model3dUrl;
    private List<String> images;
    private Map<String, Object> attributes;
    private Double ratingsAverage;
}
