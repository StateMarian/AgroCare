package com.agrocare.repository;

import com.agrocare.entity.PlantCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlantCategoryRepository extends JpaRepository<PlantCategory, Integer> {

    boolean existsByNameIgnoreCase(String name);

    Optional<PlantCategory> findByName(String category);

    boolean existsByNameIgnoreCaseAndIdCategoryNot(String name, Integer idCategory);


}
