import apiClient from "../../api/apiClient";
import type { PlantVarietyRequest, PlantVarietyResponse } from "../../types/plantCatalog/PlantVariety";

const PLANT_VARIETY_URL = "/api/admin/plant-varieties"

export const plantVarietyService = {
    async createVariety (variety:PlantVarietyRequest): Promise<PlantVarietyResponse>{
    
        const response = await apiClient.post<PlantVarietyResponse>(
            PLANT_VARIETY_URL, variety
        );
        return response.data;
    },

    async getAllVarieties(): Promise<PlantVarietyResponse[]>{
        const response = await apiClient.get<PlantVarietyResponse[]>(
            PLANT_VARIETY_URL,
        );

        return response.data;
    },

    async updateVariety(idVariety: number, variety: PlantVarietyRequest): Promise<PlantVarietyResponse>{
        const response = await apiClient.put<PlantVarietyResponse>(
            `${PLANT_VARIETY_URL}/${idVariety}`,
            variety
        );

        return response.data;
    },

    async updateStatus(idVariety: number, active: boolean): Promise<PlantVarietyResponse>{
        const response = await apiClient.patch<PlantVarietyResponse>(
            `${PLANT_VARIETY_URL}/${idVariety}/status`,
            null,
            {
                params: {active},
            },
        );

        return response.data;
    }
}