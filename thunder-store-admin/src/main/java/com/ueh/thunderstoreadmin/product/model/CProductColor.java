package com.ueh.thunderstoreadmin.product.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.LinkedHashSet;
import java.util.Set;

/**
 * @author TuMy
 */
@Setter
@Getter
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name="c_color")
public class CProductColor {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id",columnDefinition = "VARCHAR(36)")
    private String id;

    @Column(name="name",nullable = false)
    private String name;

    @Column(name="color",nullable = false)
    private String color;

    @JsonIgnore
    @ManyToMany(mappedBy = "colors",cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    private Set<CProduct> products = new LinkedHashSet<>();

}
