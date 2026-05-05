package com.astar.AstarGalaxy.security;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.astar.AstarGalaxy.config.properties.JwtProperties;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService {
    
    private final JwtProperties jwtProps;
    private final JwtEncoder jwtEncoder;        
    
    public String generateAccessToken(CustomUserDetails userDetails) {
        Instant now = Instant.now();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(r -> r.getAuthority())
                .collect(Collectors.toList());
        
        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
        JwtClaimsSet.Builder builder = JwtClaimsSet.builder()
            .issuer(jwtProps.getIssuer())
            .issuedAt(now)
            .subject(userDetails.getUsername())
            .id(UUID.randomUUID().toString())
            .claim("roles", roles)
            .expiresAt(now.plusSeconds(jwtProps.getAccessTokenExpiration()))
            .claim("userId", userDetails.getId())
            .claim("type", "access");

        JwtClaimsSet claims = builder.build();
        return jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }

    public String generateRefreshToken(CustomUserDetails userDetails) {
        Instant now = Instant.now();
        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
        JwtClaimsSet.Builder builder = JwtClaimsSet.builder()
            .issuer(jwtProps.getIssuer())
            .issuedAt(now)
            .subject(userDetails.getUsername())
            .id(UUID.randomUUID().toString())
            .expiresAt(now.plusSeconds(jwtProps.getRefreshTokenExpiration()))
            .claim("userId", userDetails.getId())
            .claim("type", "refresh");

        JwtClaimsSet claims = builder.build();
        return jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }
}
