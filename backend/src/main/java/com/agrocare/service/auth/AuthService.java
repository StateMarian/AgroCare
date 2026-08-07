package com.agrocare.service.auth;

import com.agrocare.dto.auth.AuthResponseDto;
import com.agrocare.dto.auth.LoginRequestDto;
import com.agrocare.dto.auth.RegisterRequestDto;

public interface AuthService {
    AuthResponseDto register(RegisterRequestDto dto);

    AuthResponseDto login(LoginRequestDto dto);
}
