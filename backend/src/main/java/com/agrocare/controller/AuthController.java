package com.agrocare.controller;

import com.agrocare.dto.auth.AuthResponseDto;
import com.agrocare.dto.auth.LoginRequestDto;
import com.agrocare.dto.auth.RegisterRequestDto;
import com.agrocare.service.auth.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(@Valid @RequestBody RegisterRequestDto dto){
        AuthResponseDto response = authService.register(dto);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody LoginRequestDto dto){
        AuthResponseDto responseDto = authService.login(dto);

        return ResponseEntity.ok(responseDto);
    }
}
