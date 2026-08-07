package com.agrocare.dto.plantCategory;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PlantCategoryRequest {

    @NotBlank(message = "Category name is required")
    @Size(max = 50, message = "Category cannot exceed 50 characters!")
    private String name;

    @NotBlank(message = "Description is required")
    @Size(max = 200, message = "Description cannot exceed 200 characters!")
    private String description;
}
