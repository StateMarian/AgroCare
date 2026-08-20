package com.agrocare.dto.plantCatalog.plantVariety;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PlantVarietyResponse {
    private Integer idVariety;
    private String name;
    private String description;
    private String species;
    private boolean active;
}
