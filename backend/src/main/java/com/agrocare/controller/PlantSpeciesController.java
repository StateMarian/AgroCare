package com.agrocare.controller;

import com.agrocare.dto.plantSpecies.PlantSpeciesRequest;
import com.agrocare.dto.plantSpecies.PlantSpeciesResponse;
import com.agrocare.service.plantCatalog.PlantSpeciesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/plant-species")
@RequiredArgsConstructor
public class PlantSpeciesController {

    private final PlantSpeciesService plantSpeciesService;

    @PostMapping
    public ResponseEntity<PlantSpeciesResponse> createSpecies(@Valid @RequestBody PlantSpeciesRequest req){
        PlantSpeciesResponse response = plantSpeciesService.createSpecies(req);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public  ResponseEntity<List<PlantSpeciesResponse>> getAllSpecies(){
        return ResponseEntity.ok(plantSpeciesService.getAllSpecies());
    }

    @PutMapping("/{idSpecies}")
    public ResponseEntity<PlantSpeciesResponse> updateSpecies(@PathVariable Integer idSpecies, @Valid @RequestBody PlantSpeciesRequest req){
        PlantSpeciesResponse response = plantSpeciesService.updateSpecies(idSpecies, req);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{idSpecies}")
    public ResponseEntity<Void> deleteSpecies(@PathVariable Integer idSpecies){
        plantSpeciesService.deleteSpecies(idSpecies);

        return ResponseEntity.noContent().build();
    }
}
