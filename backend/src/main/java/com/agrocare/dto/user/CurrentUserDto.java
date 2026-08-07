package com.agrocare.dto.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CurrentUserDto {
    private Integer idUser;
    private String nume;
    private String prenume;
    private String email;
    private String role;
}
