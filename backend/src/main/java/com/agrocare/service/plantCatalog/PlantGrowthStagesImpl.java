package com.agrocare.service.plantCatalog;


import com.agrocare.dto.plantCatalog.plantGrowthStages.PlantGrowthStagesRequest;
import com.agrocare.dto.plantCatalog.plantGrowthStages.PlantGrowthStagesResponse;
import com.agrocare.entity.plantCatalogEntity.GrowthStages;
import com.agrocare.exception.ResourceAlreadyExistsException;
import com.agrocare.exception.ResourceNotFoundException;
import com.agrocare.repository.PlantGrowthStagesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PlantGrowthStagesImpl implements PlantGrowthStagesService{

    private final PlantGrowthStagesRepository plantGrowthStagesRepository;

    private PlantGrowthStagesResponse createResponse(GrowthStages stages){
         return  PlantGrowthStagesResponse
                .builder()
                 .idStage(stages.getIdStage())
                .name(stages.getName())
                .description(stages.getDescription())
                .active(stages.isActive())
                .build();
    }

    @Override
    public PlantGrowthStagesResponse createGrowthStage(PlantGrowthStagesRequest request){
        if(plantGrowthStagesRepository.existsByNameIgnoreCase(request.getName())){
            throw new ResourceAlreadyExistsException("This stage already exists!");
        }

        GrowthStages growthStages = GrowthStages.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();

        plantGrowthStagesRepository.save(growthStages);

        return createResponse(growthStages);
    }

    @Override
    public List<PlantGrowthStagesResponse> getAllStages(){
        return plantGrowthStagesRepository.findAll(Sort.by(Sort.Direction.DESC, "idStage"))
                .stream()
                .map(this::createResponse)
                .toList();
    }

    @Override
    public PlantGrowthStagesResponse updateStages(Integer idStage, PlantGrowthStagesRequest request){
        GrowthStages stages = plantGrowthStagesRepository.findById(idStage).orElseThrow(() -> new ResourceNotFoundException("Stage not found"));

        boolean stageExists = plantGrowthStagesRepository.existsByNameIgnoreCaseAndIdStageNot(request.getName(),idStage);

        if(stageExists){
            throw new ResourceAlreadyExistsException("This stage already exists!");
        }

        stages.setName(request.getName());
        stages.setDescription(request.getDescription());

        GrowthStages updateStage = plantGrowthStagesRepository.save(stages);

        return createResponse(updateStage);
    }

    @Override
    public PlantGrowthStagesResponse updateStatusStage(Integer idStage, boolean active){
        GrowthStages stage = plantGrowthStagesRepository.findById(idStage).orElseThrow(() -> new ResourceNotFoundException("Stage not found!"));

        stage.setActive(active);

        GrowthStages updatedStatus = plantGrowthStagesRepository.save(stage);

        return createResponse(updatedStatus);
    }

}
