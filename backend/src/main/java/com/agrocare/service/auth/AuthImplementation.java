package com.agrocare.service.auth;

import com.agrocare.dto.auth.AuthResponseDto;
import com.agrocare.dto.auth.LoginRequestDto;
import com.agrocare.dto.auth.RegisterRequestDto;
import com.agrocare.entity.Role;
import com.agrocare.entity.Users;
import com.agrocare.exception.InvalidCredentialsException;
import com.agrocare.exception.ResourceAlreadyExistsException;
import com.agrocare.repository.RoleRepository;
import com.agrocare.repository.UserRepository;
import com.agrocare.service.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthImplementation implements AuthService{

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public AuthResponseDto register(RegisterRequestDto dto) {
        if(userRepository.existsByEmail(dto.getEmail())){
            throw new ResourceAlreadyExistsException("Email already exists");
        }

        if(userRepository.existsByCnp(dto.getCnp())){
            throw new ResourceAlreadyExistsException("CNP already exists!");
        }

        Role userRole = roleRepository.findByRoleName("User").orElseThrow(() -> new RuntimeException("Role user not found"));

        Users user = Users.builder()
                .cnp(dto.getCnp())
                .nume(dto.getNume())
                .prenume(dto.getPrenume())
                .email((dto.getEmail()))
                .password(passwordEncoder.encode(dto.getPassword()))
                .phoneNumber(dto.getPhoneNumber())
                .createdAt(LocalDateTime.now())
                .status("ACTIVE")
                .role(userRole)
                .build();

        userRepository.save(user);

        return AuthResponseDto.builder()
                .message("User registered successfully")
                .email(user.getEmail())
                .role(user.getRole().getRoleName())
                .build();
    }

    @Override
    public AuthResponseDto login(LoginRequestDto dto){
        Users user  = userRepository.findByEmail(dto.getEmail()).orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if(!passwordEncoder.matches(dto.getPassword(), user.getPassword())){
            throw  new InvalidCredentialsException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());
        return AuthResponseDto.builder()
                .message("Login successfully")
                .token(token)
                .email(user.getEmail())
                .role(user.getRole().getRoleName())
                .build();
    }
}
