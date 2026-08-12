package com.agrocare.service.plantCatalog;

import com.agrocare.dto.plantSpecies.PlantSpeciesRequest;
import com.agrocare.dto.plantSpecies.PlantSpeciesResponse;
import com.agrocare.entity.PlantCategory;
import com.agrocare.entity.PlantSpecies;
import com.agrocare.exception.ResourceAlreadyExistsException;
import com.agrocare.exception.ResourceNotFoundException;
import com.agrocare.repository.PlantCategoryRepository;
import com.agrocare.repository.PlantSpeciesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlantSpeciesImpl implements PlantSpeciesService{

    private final PlantSpeciesRepository plantSpeciesRepository;
    private final PlantCategoryRepository plantCategoryRepository;


    private PlantSpeciesResponse createResponse(PlantSpecies species){
        return PlantSpeciesResponse.builder()
                .idSpecies(species.getIdSpecies())
                .commonName(species.getCommonName())
                .scientificName(species.getScientificName())
                .description(species.getDescription())
                .category(species.getCategory().getName())
                .build();
    }

    @Override
    public PlantSpeciesResponse createSpecies(PlantSpeciesRequest request){
        if(plantSpeciesRepository.existsByCommonNameIgnoreCase((request.getCommonName()))){
            throw  new ResourceAlreadyExistsException("The species already exists!");
        }

        PlantCategory category = plantCategoryRepository.findByName(request.getCategory())
        .orElseThrow(() -> new RuntimeException("Category not found!"));

        PlantSpecies species = PlantSpecies.builder()
                .commonName(request.getCommonName())
                .scientificName(request.getScientificName())
                .description(request.getDescription())
                .category(category)
                .build();

        plantSpeciesRepository.save(species);

        return createResponse(species);
    }

    @Override
    public List<PlantSpeciesResponse> getAllSpecies(){
        return plantSpeciesRepository.findAll(Sort.by(Sort.Order.desc("idSpecies")))
                .stream()
                .map(this::createResponse)
                .toList();
    }

    @Override
    public PlantSpeciesResponse updateSpecies(Integer idSpecies, PlantSpeciesRequest request){

        PlantSpecies species = plantSpeciesRepository.findById(idSpecies)
                .orElseThrow(() -> new ResourceNotFoundException("Species not found!"));

        boolean speciesNameAlreadyExists = plantSpeciesRepository.existsByCommonNameIgnoreCaseAndIdSpeciesNot(request.getCommonName(), idSpecies);

        if(speciesNameAlreadyExists){
            throw new ResourceAlreadyExistsException("The species already exists!");
        }

        PlantCategory category = plantCategoryRepository.findByName(request.getCategory())
                .orElseThrow(() -> new RuntimeException("Category not found!"));

        species.setCommonName(request.getCommonName());
        species.setScientificName(request.getScientificName());
        species.setDescription(request.getDescription());
        species.setCategory(category);

        PlantSpecies plantSpecies = plantSpeciesRepository.save(species);

        return createResponse(plantSpecies);
    }

    @Override
    public void deleteSpecies(Integer idSpecies){

        PlantSpecies species = plantSpeciesRepository.findById(idSpecies)
                .orElseThrow(() -> new ResourceNotFoundException("Species not found!"));

        plantSpeciesRepository.delete(species);
    }
}
