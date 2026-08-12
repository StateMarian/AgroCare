package com.agrocare.controller;

import com.agrocare.dto.plantCategory.PlantCategoryRequest;
import com.agrocare.dto.plantCategory.PlantCategoryResponse;
import com.agrocare.service.plantCatalog.PlantCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/plant-categories")
@RequiredArgsConstructor
public class PlantCategoryController {

    private final PlantCategoryService plantCategoryService;
    @PostMapping
    public ResponseEntity<PlantCategoryResponse> createCategory(@Valid @RequestBody PlantCategoryRequest request){
        PlantCategoryResponse response = plantCategoryService.createCategory(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<PlantCategoryResponse>> getAllCategories(){
        return  ResponseEntity.ok(plantCategoryService.getAllCategories());
    }

    @PutMapping("/{idCategory}")
    public ResponseEntity<PlantCategoryResponse> updateCategory(@PathVariable Integer idCategory, @Valid @RequestBody PlantCategoryRequest request ){
        PlantCategoryResponse response = plantCategoryService.updateCategory(idCategory, request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{idCategory}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Integer idCategory){

        plantCategoryService.deleteCategory(idCategory);

        return ResponseEntity.noContent().build();
    }

}
