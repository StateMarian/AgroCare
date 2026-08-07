package com.agrocare.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AuthResponseDto {
    private String message;
    private String token;
    private String email;
    private String role;
}
