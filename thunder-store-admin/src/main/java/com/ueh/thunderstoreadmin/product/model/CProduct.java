package com.ueh.thunderstoreadmin.product.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ueh.thunderstoreadmin.common.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * @author TuMy
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name="c_product")
public class CProduct extends BaseEntity {
    @Column(name="name",nullable=false,unique=true)
    private String name;

    @Column(name="price",nullable=false)
    private BigDecimal price;

    @Column(name="quantity",nullable=false)
    private int quantity;

    @Column(name="sold")
    private int sold;

    @Lob
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name="rate")
    private float rate;

    @Column(name="likes")
    private int likes;

    @Column(name="discount")
    private BigDecimal discount;

    @OneToMany(mappedBy = "product",cascade = {CascadeType.ALL},orphanRemoval = true)
    private Set<CProductImage> images = new LinkedHashSet<>();

    @ManyToMany(cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    @JoinTable(	name="c_product_color",
            joinColumns = @JoinColumn(name="product_id"),
            inverseJoinColumns = @JoinColumn(name="color_id"))
    private Set<CProductColor> colors = new LinkedHashSet<>();

    @ManyToMany(cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    @JoinTable(	name="c_product_size",
            joinColumns = @JoinColumn(name="product_id"),
            inverseJoinColumns = @JoinColumn(name="size_id"))
    private Set<CProductSize> sizes = new LinkedHashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "products",cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    private Set<CCategory> categories = new LinkedHashSet<>();


    public void addSize(CProductSize size) {
        sizes.add(size);
        size.getProducts().add(this);
    }
    public void removeSize(CProductSize size){
        sizes.remove(size);
        size.getProducts().remove(this);
    }

    public void addColor(CProductColor color) {
        colors.add(color);
        color.getProducts().add(this);
    }

    public void removeColor(CProductColor color){
        colors.remove(color);
        color.getProducts().remove(this);
    }

    public void addImage(CProductImage image) {
        images.add(image);
        image.setProduct(this);
    }

    public void removeImage(CProductImage image) {
        images.remove(image);
    }

    @PreRemove
    private void clearField() {
        images.clear();
        categories.stream().forEach(category -> category.getProducts().remove(this));
        categories.clear();
        colors.stream().forEach(color -> color.getProducts().remove(this));
        colors.clear();
        sizes.stream().forEach(size -> size.getProducts().remove(this));
        sizes.clear();
    }


    public BigDecimal priceDiscounted() {
        if(discount == null)
            return price;

        BigDecimal discountPercent = this.getDiscount().divide(BigDecimal.valueOf(100));

        return this.getPrice().multiply(BigDecimal.ONE.subtract(discountPercent));
    }

    public void addCategories(CCategory category){
        categories.add(category);
        category.getProducts().add(this);
    }
    public void removeCategory(CCategory category){
        categories.remove(category);
        category.getProducts().remove(this);
    }
}
