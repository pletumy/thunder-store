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
@Table(name="c_size")
public class CProductSize {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id",columnDefinition = "VARCHAR(36)")
    private String id;

    @Column(name="size",nullable = false)
    private String size;

    @JsonIgnore
    @ManyToMany(mappedBy = "sizes",cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    private Set<CProduct> products = new LinkedHashSet<>();

}
