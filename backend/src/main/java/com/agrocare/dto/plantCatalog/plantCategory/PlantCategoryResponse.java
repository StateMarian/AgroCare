package com.agrocare.dto.plantCatalog.plantCategory;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class PlantCategoryResponse {

    private Integer idCategory;
    private String name;
    private String description;
}
