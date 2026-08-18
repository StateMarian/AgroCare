export interface PlantCategoryRequest{
    name : string;
    description : string;
}

export interface PlantCategoryResponse{
    idCategory : number;
    name : string;
    description : string;
}

export interface PlantCategoryErrors{
    name: string;
    description: string;
}