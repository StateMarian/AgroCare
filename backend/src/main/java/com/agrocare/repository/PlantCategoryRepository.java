package com.agrocare.repository;

import com.agrocare.entity.PlantCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantCategoryRepository extends JpaRepository<PlantCategory, Integer> {

    boolean existsByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCaseAndIdCategoryNot(String name,Integer idCategory);

}
