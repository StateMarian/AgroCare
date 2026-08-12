package com.agrocare.dto.plantSpecies;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder

public class PlantSpeciesResponse {
    private Integer idSpecies;
    private String commonName;
    private String scientificName;
    private String description;
    private String category;
}
