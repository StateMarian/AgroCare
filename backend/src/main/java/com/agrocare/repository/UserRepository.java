package com.agrocare.repository;

import com.agrocare.entity.usersEntity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Integer> {

    Optional<Users> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByCnp(String cnp);
}
