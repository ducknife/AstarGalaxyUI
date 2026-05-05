package com.astar.AstarGalaxy.modules.user.dto;

import java.util.List;

import com.astar.AstarGalaxy.modules.user.Address;
import com.astar.AstarGalaxy.modules.user.User;

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
public class UserResponse {
    private String username;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String avatarUrl;
    private String role;
    private String status;
    private List<Address> addresses;
    private List<String> wishlist;

    public static UserResponse from(User user) {
        return UserResponse.builder()
                .username(user.getUsername())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .avatarUrl(user.getAvatarUrl())
                .role(user.getRole())
                .status(user.getStatus())
                .addresses(user.getAddresses())
                .wishlist(user.getWishlist())
                .build();
    }
}
