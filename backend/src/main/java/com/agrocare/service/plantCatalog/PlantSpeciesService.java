package com.agrocare.service.plantCatalog;

import com.agrocare.dto.plantSpecies.PlantSpeciesRequest;
import com.agrocare.dto.plantSpecies.PlantSpeciesResponse;

import java.util.List;

public interface PlantSpeciesService {
    PlantSpeciesResponse createSpecies(PlantSpeciesRequest species);

    List<PlantSpeciesResponse> getAllSpecies();

    PlantSpeciesResponse updateSpecies(Integer idSpecies, PlantSpeciesRequest request);

    void deleteSpecies(Integer idSpecies);
}
