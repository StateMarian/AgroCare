package com.agrocare.service.plantCatalog;

import com.agrocare.dto.plantCatalog.plantGrowthStages.PlantGrowthStagesRequest;
import com.agrocare.dto.plantCatalog.plantGrowthStages.PlantGrowthStagesResponse;

import java.util.List;

public interface PlantGrowthStagesService {

    PlantGrowthStagesResponse createGrowthStage(PlantGrowthStagesRequest request);

    List<PlantGrowthStagesResponse> getAllStages();

    PlantGrowthStagesResponse updateStages(Integer idStage, PlantGrowthStagesRequest request);

    PlantGrowthStagesResponse updateStatusStage (Integer idStage, boolean active);
}
