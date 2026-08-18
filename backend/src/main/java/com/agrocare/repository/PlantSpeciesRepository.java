package com.agrocare.repository;

import com.agrocare.entity.PlantSpecies;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlantSpeciesRepository extends JpaRepository<PlantSpecies, Integer> {

    boolean existsByCommonNameIgnoreCase(String common_name);

    Optional<PlantSpecies> findByCommonName(String name);

    boolean existsByCommonNameIgnoreCaseAndIdSpeciesNot(String common_name,Integer Id_species);

    boolean existsByCategory_IdCategory(Integer idCategory);
}
