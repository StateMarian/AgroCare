import apiClient from "../api/apiClient";
import type { PlantCategoryRequest, PlantCategoryResponse } from "../types/PlantCategory";

const PLANT_CATEGORIES_URL = "/api/admin/plant-categories";


export const plantCategoryService = {

    async getAllCategories() : Promise<PlantCategoryResponse[]>{
        const response = await apiClient.get<PlantCategoryResponse[]>(PLANT_CATEGORIES_URL);

        return response.data;
    },

    async createCategory(category : PlantCategoryRequest) : Promise<PlantCategoryResponse>{
        const response = await apiClient.post<PlantCategoryResponse>(
            PLANT_CATEGORIES_URL,
            category
        );

        return response.data;
    },

    async updateCategory(idCategory: number, category: PlantCategoryRequest) : Promise<PlantCategoryResponse>{
        const response = await apiClient.put<PlantCategoryResponse>(`${PLANT_CATEGORIES_URL}/${idCategory}`,category);

        return response.data;
    },

    async deleteCategory(idCategory : number) : Promise<void>{
        await apiClient.delete(`${PLANT_CATEGORIES_URL}/${idCategory}`);
    } 
};