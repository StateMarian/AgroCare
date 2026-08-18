package com.agrocare.service.plantCatalog;

import com.agrocare.dto.plantVariety.PlantVarietyRequest;
import com.agrocare.dto.plantVariety.PlantVarietyResponse;

import java.util.List;

public interface PlantVarietyService {

    PlantVarietyResponse createVariety(PlantVarietyRequest variety);

    List<PlantVarietyResponse> getAllVarieties();

    PlantVarietyResponse updateVariety(Integer idVariety, PlantVarietyRequest req);

    PlantVarietyResponse updateStatus(Integer idVariety, boolean active);

}
