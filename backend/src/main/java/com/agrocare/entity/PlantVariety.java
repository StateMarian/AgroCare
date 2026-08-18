package com.agrocare.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Plant_Variety")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlantVariety {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "varieties_seq")
    @SequenceGenerator(name = "varieties_seq", sequenceName = "VARIETY_SEQ", allocationSize = 1)
    private Integer idVariety;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Builder.Default
    @Column(name = "active", nullable = false)
    private boolean active = true;

    @ManyToOne
    @JoinColumn(name = "Id_species")
    private PlantSpecies species;
}
