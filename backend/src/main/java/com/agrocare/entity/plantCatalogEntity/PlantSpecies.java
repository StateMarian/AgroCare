package com.agrocare.entity.plantCatalogEntity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Plant_species")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlantSpecies {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "species_seq")
    @SequenceGenerator(name = "species_seq", sequenceName = "SPECIES_SEQ", allocationSize = 1)
    @Column(name = "Id_species")
    private Integer idSpecies;

    @Column(name = "common_name")
    private String commonName;

    @Column(name = "scientific_name")
    private String scientificName;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "Id_category")
    private PlantCategory category;
}
