package com.astar.AstarGalaxy.modules.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.astar.AstarGalaxy.common.ApiResponse;
import com.astar.AstarGalaxy.modules.auth.dto.AuthResponse;
import com.astar.AstarGalaxy.modules.auth.dto.LoginRequest;

import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest request) {
        return ApiResponse.ok(authService.checkLogin(request));
    }
}
