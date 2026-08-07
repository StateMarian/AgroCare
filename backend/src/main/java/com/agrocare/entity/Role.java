package com.agrocare.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Role")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {

    @Id
    @Column(name = "Id_role")
    private Integer idRole;

    @Column(name = "Role_name")
    private String roleName;
}
