package com.agrocare.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Plant_category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlantCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_seq")
    @SequenceGenerator(name = "category_seq", sequenceName = "CATEGORY_SEQ", allocationSize = 1)
    @Column(name = "Id_category")
    private Integer idCategory;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;
}
