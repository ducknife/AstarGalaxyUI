package com.astar.AstarGalaxy.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
public class ApiResponse<T> {
    private int status;
    private String message;
    private T data;

    public static <T> ResponseEntity<ApiResponse<T>> ok(T data) {
        return ResponseEntity.ok(
                ApiResponse.<T>builder()
                        .status(HttpStatus.OK.value())
                        .message("Success")
                        .data(data)
                        .build());
    }

    public static <T> ResponseEntity<ApiResponse<T>> created(T data) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<T>builder()
                        .status(HttpStatus.CREATED.value()) // 201
                        .message("Created")
                        .data(data)
                        .build());
    }

    public static ResponseEntity<ApiResponse<?>> error(int status, String message) {
        return ResponseEntity.status(status)
                .body(ApiResponse.builder()
                        .status(status)
                        .message(message)
                        .data(null)
                        .build());
    }
}
