package com.agrocare.service.plantCatalog;

import com.agrocare.dto.plantCategory.PlantCategoryRequest;
import com.agrocare.dto.plantCategory.PlantCategoryResponse;
import com.agrocare.entity.PlantCategory;
import com.agrocare.exception.ResourceAlreadyExistsException;
import com.agrocare.exception.ResourceNotFoundException;
import com.agrocare.repository.PlantCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlantCategoryImpl implements PlantCategoryService {

    private final PlantCategoryRepository plantCategoryRepository;

    private PlantCategoryResponse buildResponse(PlantCategory category){
        return PlantCategoryResponse.builder()
                .idCategory(category.getIdCategory())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }
    @Override
    public PlantCategoryResponse createCategory(PlantCategoryRequest request){

        if(plantCategoryRepository.existsByNameIgnoreCase(request.getName())){
            throw new ResourceAlreadyExistsException("The plant category already exists!");
        }

        PlantCategory category = PlantCategory.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();

        PlantCategory savedCategory = plantCategoryRepository.save(category);

        return buildResponse(savedCategory);
    }

    @Override
    public List<PlantCategoryResponse> getAllCategories(){

        return plantCategoryRepository.findAll(Sort.by(Sort.Direction.DESC,"idCategory"))
                .stream()
                .map(this::buildResponse)
                .toList();
    }

    @Override
    public PlantCategoryResponse updateCategory(Integer idCategory, PlantCategoryRequest req){

        PlantCategory category = plantCategoryRepository.findById(idCategory)
                .orElseThrow(() -> new ResourceNotFoundException("Plant category not found."));


        boolean nameAlreadyExists = plantCategoryRepository.existsByNameIgnoreCaseAndIdCategoryNot(req.getName(), idCategory);

        if(nameAlreadyExists){
            throw new ResourceAlreadyExistsException("The category already exists!");
        }

        category.setName(req.getName());
        category.setDescription(req.getDescription());

        PlantCategory updatedCategory = plantCategoryRepository.save(category);

        return buildResponse(updatedCategory);

    }

    @Override
    public void deleteCategory(Integer idCategory){
        PlantCategory category = plantCategoryRepository.findById(idCategory)
                .orElseThrow(() -> new ResourceNotFoundException("Plant category not found!"));

        plantCategoryRepository.delete(category);
    }
}
