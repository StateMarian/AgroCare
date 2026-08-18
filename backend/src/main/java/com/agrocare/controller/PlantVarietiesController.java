package com.agrocare.controller;

import com.agrocare.dto.plantVariety.PlantVarietyRequest;
import com.agrocare.dto.plantVariety.PlantVarietyResponse;
import com.agrocare.service.plantCatalog.PlantVarietyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/plant-varieties")
@RequiredArgsConstructor
public class PlantVarietiesController {

    private final PlantVarietyService plantVarietyService;

    @PostMapping
    public ResponseEntity<PlantVarietyResponse> createVariety(@Valid @RequestBody PlantVarietyRequest req){
        PlantVarietyResponse response = plantVarietyService.createVariety(req);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<PlantVarietyResponse>> getAllVarieties(){
        List<PlantVarietyResponse> response = plantVarietyService.getAllVarieties();

        return  ResponseEntity.ok(response);
    }

    @PutMapping("/{idVariety}")
    public  ResponseEntity<PlantVarietyResponse> updateVarieties(@PathVariable Integer idVariety, @Valid @RequestBody PlantVarietyRequest req){
        PlantVarietyResponse response = plantVarietyService.updateVariety(idVariety, req);

        return  ResponseEntity.ok(response);
    }

    @PatchMapping("/{idVariety}/status")
    public  ResponseEntity<PlantVarietyResponse> updateStatus(
            @PathVariable Integer idVariety,
            @RequestParam boolean active
    ){
        PlantVarietyResponse response = plantVarietyService.updateStatus(idVariety,active);

        return ResponseEntity.ok(response);
    }

}
