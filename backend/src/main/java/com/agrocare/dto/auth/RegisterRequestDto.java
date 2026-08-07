package com.agrocare.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDto{

    @NotBlank(message = "Last name is required")
    private String nume;

    @NotBlank(message = "First Name is required")
    private String prenume;

    @NotBlank(message = "CNP is required")
    @Size(min = 13, max = 13, message = "CNP must have exactly 13 characters")
    private String cnp;

    @NotBlank(message = "Email is required")
    @Email(message = "Email is invalid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must have at least 8 characters")
    private String password;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;
}
