package com.agrocare.dto.plantVariety;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlantVarietyRequest {

    @NotBlank(message = "Name of the variety is required!")
    @Size(max = 100, message = "The name of the variety cannot exceed 100 characters1")
    private String name;

    @NotBlank(message = "Description of the variety is required!")
    @Size(max = 200, message = "The description of the variety cannot exceed 200 characters1")
    private String description;

    @NotBlank(message = "Selecting an species is mandatory!")
    private String species;
}
