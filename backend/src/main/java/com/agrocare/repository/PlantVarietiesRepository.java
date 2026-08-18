package com.agrocare.repository;

import com.agrocare.entity.PlantVariety;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantVarietiesRepository extends JpaRepository <PlantVariety, Integer> {

    boolean existsByNameIgnoreCaseAndSpecies_IdSpecies(
            String name,
            Integer idSpecies
    );

    boolean existsByNameIgnoreCaseAndSpecies_IdSpeciesAndIdVarietyNot(
            String name,
            Integer idSpecies,
            Integer idVariety
    );

    boolean existsBySpecies_IdSpecies(Integer idSpecies);
}
