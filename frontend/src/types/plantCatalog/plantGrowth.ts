export interface PlantGrowthRequest{
    name: string;
    description: string;
}

export interface PlantGrowthResponse{
    idStage: number,
    name: string,
    description: string,
    active: boolean
}

export interface PlantGrowthErrors{
    name: string,
    description: string
}
