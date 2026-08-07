package com.agrocare.controller;

import com.agrocare.dto.user.CurrentUserDto;
import com.agrocare.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<CurrentUserDto> getCurrentUser(){
        return ResponseEntity.ok(userService.getCurrentUser());
    }
}
