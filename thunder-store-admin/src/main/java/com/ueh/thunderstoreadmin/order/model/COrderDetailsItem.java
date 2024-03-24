package com.ueh.thunderstoreadmin.order.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

/**
 * @author TuMy
 */
@Setter
@Getter
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name="c_order_details_item")
public class COrderDetailsItem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name="id",columnDefinition = "VARCHAR(36)")
    private String id;

    @ManyToOne
    @JoinColumn(name="product_id")
    private CProduct product;

    @Column(name="quantity",nullable = false)
    private int quantity;


    @Column(name="color")
    private String color;


    @Column(name="size")
    private String size;

    @Column(name="total",nullable=false)
    private BigDecimal total;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="order_detail_id")
    private COrderDetails orderDetails;

}
