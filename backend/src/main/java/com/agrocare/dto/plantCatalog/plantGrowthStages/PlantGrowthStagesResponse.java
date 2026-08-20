package com.agrocare.dto.plantCatalog.plantGrowthStages;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PlantGrowthStagesResponse {

    private Integer idStage;
    private String name;
    private String description;
    private boolean active;
}
