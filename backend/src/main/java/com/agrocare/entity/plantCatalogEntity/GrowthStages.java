package com.agrocare.entity.plantCatalogEntity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table (name = "GROWTH_STAGE")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class GrowthStages {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "growth_seq")
    @SequenceGenerator(name = "growth_seq", sequenceName = "GROWTH_SEQ", allocationSize = 1)
    @Column (name = "Id_stage")
    private Integer idStage;

    @Column (name ="name")
    private String name;

    @Column (name = "description")
    private String description;

    @Builder.Default
    @Column (name = "active", nullable = false)
    private boolean active = true;
}
