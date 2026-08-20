package com.agrocare.repository;


import com.agrocare.entity.plantCatalogEntity.GrowthStages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlantGrowthStagesRepository extends JpaRepository<GrowthStages, Integer> {

    boolean existsByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCaseAndIdStageNot(String name, Integer idStage);
}
