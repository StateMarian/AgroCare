package com.agrocare.service.plantCategory;

import com.agrocare.dto.plantCategory.PlantCategoryRequest;
import com.agrocare.dto.plantCategory.PlantCategoryResponse;

import java.util.List;

public interface PlantCategoryService {
    PlantCategoryResponse createCategory (PlantCategoryRequest request);

    List<PlantCategoryResponse> getAllCategories ();

    PlantCategoryResponse updateCategory (Integer idCategory, PlantCategoryRequest req);

    void deleteCategory(Integer idCategory);


}
