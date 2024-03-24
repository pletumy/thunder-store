package com.ueh.thunderstoreadmin.product.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * @author TuMy
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name="c_product_images")
public class CProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id",columnDefinition = "VARCHAR(36)")
    private String id;

    @Column(name="url",nullable = false,unique = true)
    private String url;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="product_id",nullable = false)
    private CProduct product;
}
