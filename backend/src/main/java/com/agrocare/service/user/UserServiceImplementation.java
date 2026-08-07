package com.agrocare.service.user;

import com.agrocare.dto.user.CurrentUserDto;
import com.agrocare.entity.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImplementation implements UserService {

    @Override
    public CurrentUserDto getCurrentUser(){
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Users user = (Users) authentication.getPrincipal();

        return CurrentUserDto.builder()
                .idUser(user.getIdUser())
                .nume(user.getNume())
                .prenume(user.getPrenume())
                .email(user.getEmail())
                .role(user.getRole().getRoleName())
                .build();
    }
}
