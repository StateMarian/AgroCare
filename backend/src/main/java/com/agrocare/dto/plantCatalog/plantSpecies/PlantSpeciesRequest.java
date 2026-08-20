package com.agrocare.dto.plantCatalog.plantSpecies;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlantSpeciesRequest {

    @NotBlank(message = "Name of the species is required!")
    @Size( max = 50, message = "The species name cannot exceed 50 characters!")
    private String commonName;

    @NotBlank(message = "Scientific name of the species is required!")
    @Size( max = 100, message = "The species scientific name cannot exceed 50 characters!")
    private String scientificName;

    @NotBlank(message = "Description of the species is required!")
    @Size(max = 200, message = "Description must not exceed 200 characters!")
    private String description;

    @NotBlank(message = "Category of the species is required")
    private String category;
}
