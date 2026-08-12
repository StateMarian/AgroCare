import apiClient from "../api/apiClient"
import type {PlantSpeciesRequest, PlantSpeciesResponse} from "../types/PlantSpecies"

const PLANT_SPECIES_URL = "/api/admin/plant-species"

export const plantSpeciesService = {

    async createSpecies(species: PlantSpeciesRequest): Promise<PlantSpeciesResponse>{

        const response = await apiClient.post<PlantSpeciesResponse>(
            PLANT_SPECIES_URL, species
        );

        return response.data;
    },

    async getAllSpecies(): Promise<PlantSpeciesResponse[]>{
        const response = await apiClient.get<PlantSpeciesResponse[]>(
            PLANT_SPECIES_URL
        );

        return response.data;
    },

    async updateSpecies(idSpecies: number, species: PlantSpeciesRequest): Promise<PlantSpeciesResponse>{

        const response = await apiClient.put<PlantSpeciesResponse>(
            `${PLANT_SPECIES_URL}/${idSpecies}`, species
        );

        return response.data;
    },

    async deleteSpecies(idSpecies: number): Promise<void>{

        const response = await apiClient.delete(`${PLANT_SPECIES_URL}/${idSpecies}`);
    }

}