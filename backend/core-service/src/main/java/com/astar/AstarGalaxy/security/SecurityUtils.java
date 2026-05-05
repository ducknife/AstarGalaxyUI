package com.astar.AstarGalaxy.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import com.astar.AstarGalaxy.common.exception.UnauthorizedException;

public class SecurityUtils {

    public static Jwt getCurrentJwt() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || !(auth instanceof JwtAuthenticationToken jwtAuth)) {
            throw new UnauthorizedException("Unauthorized");
        }
        return jwtAuth.getToken();
    }
    public static String getCurrentUserId() {
        return getCurrentJwt().getClaimAsString("userId");
    }

    public static String getCurrentUsername() {
        return getCurrentJwt().getSubject();
    }
}
