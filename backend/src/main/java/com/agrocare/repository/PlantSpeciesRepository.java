package com.agrocare.repository;

import com.agrocare.entity.PlantSpecies;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantSpeciesRepository extends JpaRepository<PlantSpecies, Integer> {

    boolean existsByCommonNameIgnoreCase(String common_name);

    boolean existsByCommonNameIgnoreCaseAndIdSpeciesNot(String common_name,Integer Id_species);
}
