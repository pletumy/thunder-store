package com.ueh.thunderstoreadmin.product.model;

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
@Table(name="c_category")
public class CCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id",columnDefinition = "VARCHAR(36)")
    private String id;

    @Column(name="name",unique=true,nullable=false)
    private String name;

    @Column(name="tag",unique=true,nullable=false)
    private String tag;

    @Column(name="description")
    private String description;

    @ManyToMany(cascade = {CascadeType.MERGE,CascadeType.PERSIST},fetch = FetchType.LAZY)
    @JoinTable(	name="c_category_product",
            joinColumns = @JoinColumn(name="category_id"),
            inverseJoinColumns = @JoinColumn(name="product_id"))
    private Set<CProduct> products = new LinkedHashSet<>();

    @PreRemove
    private void clearField() {
        products.stream().forEach(product -> product.getCategories().remove(this));
        products.clear();
    }

    public void addProduct(CProduct product) {
        products.add(product);
        product.getCategories().add(this);
    }
    public void removeProduct(CProduct product) {
        products.remove(product);
        product.getCategories().remove(this);
    }
    public void clear() {
        products.clear();
    }
}
