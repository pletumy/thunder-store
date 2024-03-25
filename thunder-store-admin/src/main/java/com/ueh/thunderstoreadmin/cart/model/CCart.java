package com.ueh.thunderstoreadmin.cart.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ueh.thunderstoreadmin.user.model.CUser;
import jakarta.persistence.*;
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
@SuperBuilder
@Entity
@NoArgsConstructor
@Table(name = "c_cart")
public class CCart {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id",columnDefinition = "VARCHAR(36)")
    private String id;

    @JsonIgnore
    @OneToOne(mappedBy = "cart",fetch = FetchType.LAZY)
    private CUser user;

    @Column(name = "num_of_product")
    private int numOfProduct;

    @Column(name = "total")
    private BigDecimal total;

    @OneToMany(mappedBy="cart",cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REMOVE})
    private Set<CCartItem> items = new LinkedHashSet<>();

    public void buildTotalAndNumOfProduct() {
        setTotal();
        setNumOfProduct();
    }

    public void setTotal() {
        this.total = items.stream()
                .map(CCartItem::finalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    public void setNumOfProduct() {
        this.numOfProduct = items.stream()
                .mapToInt(CCartItem::getQuantity)
                .sum();
    }

    public void addCartItem(CCartItem item) {
        items.add(item);
        item.setCart(this);
    }

    public void removeCartItem(CCartItem item){
        items.remove(item);
    }
}
