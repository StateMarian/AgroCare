package com.agrocare.controller;

import com.agrocare.dto.plantCatalog.plantGrowthStages.PlantGrowthStagesRequest;
import com.agrocare.dto.plantCatalog.plantGrowthStages.PlantGrowthStagesResponse;
import com.agrocare.service.plantCatalog.PlantGrowthStagesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/admin/plant-growthStages")
@RequiredArgsConstructor
public class PlantGrowthStagesController {

    private final PlantGrowthStagesService plantGrowthStagesService;

    @PostMapping
    public ResponseEntity<PlantGrowthStagesResponse> createGrowthStage(@Valid @RequestBody PlantGrowthStagesRequest request){
        PlantGrowthStagesResponse response = plantGrowthStagesService.createGrowthStage(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<PlantGrowthStagesResponse>> getAllStages(){
        return ResponseEntity.ok(plantGrowthStagesService.getAllStages());
    }

    @PutMapping("/{idStage}")
    public ResponseEntity<PlantGrowthStagesResponse> updateStages (@PathVariable Integer idStage, @Valid @RequestBody PlantGrowthStagesRequest req){
        PlantGrowthStagesResponse response = plantGrowthStagesService.updateStages(idStage, req);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{idStage}/status")
    public ResponseEntity<PlantGrowthStagesResponse> updateStatus(@PathVariable Integer idStage, @RequestParam boolean active){
        PlantGrowthStagesResponse response = plantGrowthStagesService.updateStatusStage(idStage, active);

        return ResponseEntity.ok(response);
    }
}
