package com.astar.AstarGalaxy.modules.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.astar.AstarGalaxy.config.properties.JwtProperties;
import com.astar.AstarGalaxy.modules.auth.dto.AuthResponse;
import com.astar.AstarGalaxy.modules.auth.dto.LoginRequest;
import com.astar.AstarGalaxy.security.CustomUserDetails;
import com.astar.AstarGalaxy.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final JwtProperties jwtProps;

    public AuthResponse checkLogin(LoginRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();
        
        Authentication auth = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(username, password)
        );

        CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        
        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenType("Bearer")
                .expiresIn(jwtProps.getAccessTokenExpiration())
                .build();
        
    }
}

