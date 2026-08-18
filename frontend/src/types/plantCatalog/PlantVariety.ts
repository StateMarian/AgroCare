export interface PlantVarietyRequest{
    name: string,
    description: string,
    species: string,
}

export interface PlantVarietyResponse{
    idVariety: number,
    name: string,
    description: string,
    species: string,
    active: boolean,
}

export interface PlantVarietyErrors{
    name:string,
    description: string,
    species: string,   
}