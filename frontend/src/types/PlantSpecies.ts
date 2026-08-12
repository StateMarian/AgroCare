export interface PlantSpeciesRequest{
    commonName: string;
    scientificName: string;
    description: string;
    category: string;
}

export interface PlantSpeciesResponse{
    idSpecies: number;
    commonName: string;
    scientificName: string;
    description: string;
    category: string;
}

export interface PlantSpeciesErrors{
    commonName: string;
    scientificName: string;
    description: string;
    category: string;
}