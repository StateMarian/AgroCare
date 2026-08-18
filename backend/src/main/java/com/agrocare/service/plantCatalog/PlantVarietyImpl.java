package com.agrocare.service.plantCatalog;

import com.agrocare.dto.plantVariety.PlantVarietyRequest;
import com.agrocare.dto.plantVariety.PlantVarietyResponse;
import com.agrocare.entity.PlantSpecies;
import com.agrocare.entity.PlantVariety;
import com.agrocare.exception.ResourceAlreadyExistsException;
import com.agrocare.exception.ResourceNotFoundException;
import com.agrocare.repository.PlantSpeciesRepository;
import com.agrocare.repository.PlantVarietiesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlantVarietyImpl implements PlantVarietyService{

    private final PlantVarietiesRepository plantVarietiesRepository;
    private final PlantSpeciesRepository plantSpeciesRepository;

    private PlantVarietyResponse createResponse (PlantVariety variety){
        return PlantVarietyResponse.builder()
                .idVariety(variety.getIdVariety())
                .name(variety.getName())
                .description(variety.getDescription())
                .species(variety.getSpecies().getCommonName())
                .active(variety.isActive())
                .build();
    }

    public PlantVarietyResponse createVariety(PlantVarietyRequest request){
        PlantSpecies species = plantSpeciesRepository.findByCommonName(request.getSpecies()).orElseThrow(
                ()  -> new ResourceNotFoundException("Species not found!"));

        boolean varietyExists =
                plantVarietiesRepository
                        .existsByNameIgnoreCaseAndSpecies_IdSpecies(
                                request.getName(),
                                species.getIdSpecies()
                        );

        if (varietyExists) {
            throw new ResourceAlreadyExistsException(
                    "The variety already exists for this species!"
            );
        }

        PlantVariety plantVariety = PlantVariety.builder()
                .name(request.getName())
                .description(request.getDescription())
                .species(species)
                .build();

        PlantVariety savedVariety = plantVarietiesRepository.save(plantVariety);

        return createResponse(savedVariety);
    }

    @Override
    public List<PlantVarietyResponse> getAllVarieties(){
        return plantVarietiesRepository.findAll(Sort.by(Sort.Order.desc("idVariety")))
                .stream()
                .map(this::createResponse)
                .toList();
    }

    @Override
    public PlantVarietyResponse updateVariety(
            Integer idVariety,
            PlantVarietyRequest req
    ) {

        PlantVariety variety = plantVarietiesRepository
                .findById(idVariety)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Variety not found!"
                        )
                );

        PlantSpecies species = plantSpeciesRepository
                .findByCommonName(req.getSpecies())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Species not found!"
                        )
                );

        boolean varietyExists =
                plantVarietiesRepository
                        .existsByNameIgnoreCaseAndSpecies_IdSpeciesAndIdVarietyNot(
                                req.getName(),
                                species.getIdSpecies(),
                                idVariety
                        );

        if (varietyExists) {
            throw new ResourceAlreadyExistsException(
                    "The variety already exists for this species!"
            );
        }

        variety.setName(req.getName());
        variety.setDescription(req.getDescription());
        variety.setSpecies(species);

        PlantVariety updatedVariety =
                plantVarietiesRepository.save(variety);

        return createResponse(updatedVariety);
    }

    @Override
    public PlantVarietyResponse updateStatus(Integer idVariety, boolean active) {

        PlantVariety variety = plantVarietiesRepository
                .findById(idVariety)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Variety not found!"
                        )
                );

        variety.setActive(active);

        PlantVariety updatedVariety =
                plantVarietiesRepository.save(variety);

        return createResponse(updatedVariety);
    }
}
