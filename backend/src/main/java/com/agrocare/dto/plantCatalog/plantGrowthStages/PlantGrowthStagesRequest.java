package com.agrocare.dto.plantCatalog.plantGrowthStages;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlantGrowthStagesRequest {

    @NotBlank(message = "Name of the growth stage is required")
    @Size(max = 50, message = "Name of the growth stage must be between 5 and 50 characters!")
    private String name;

    @NotBlank(message = "Description of the growth stage is required!")
    @Size(max = 200, message = "Description of the growth stage must be between 50 and 200 characters!")
    private String description;
}
