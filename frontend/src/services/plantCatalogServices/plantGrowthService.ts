import type { PlantGrowthRequest, PlantGrowthResponse } from "../../types/plantCatalog/plantGrowth"
import apiClient from "../../api/apiClient"


const PLANT_GROWTH_URL = "/api/admin/plant-growthStages"

export const plantGrowthService = {
    async createStages (growthStage: PlantGrowthRequest): Promise<PlantGrowthResponse> {
        const response = await apiClient.post<PlantGrowthResponse>(
            PLANT_GROWTH_URL, growthStage
        )

        return response.data
    },

    async getAllStages(): Promise<PlantGrowthResponse[]>{
        const response = await apiClient.get<PlantGrowthResponse[]>(
            PLANT_GROWTH_URL
        )

        return response.data;
    },

    async updateStages (idStage: number, growthStage: PlantGrowthRequest): Promise<PlantGrowthResponse>{
        const response = await apiClient.put<PlantGrowthResponse>(
            `${PLANT_GROWTH_URL}/${idStage}`,
            growthStage,
        )

        return response.data;
    },

    async updateStatus (idStage: number, active: boolean): Promise<PlantGrowthResponse>{
        const response = await apiClient.patch<PlantGrowthResponse>(
            `${PLANT_GROWTH_URL}/${idStage}/status`,
            null,
            {
                params: {active},
            },
        );

        return response.data;
    }
}