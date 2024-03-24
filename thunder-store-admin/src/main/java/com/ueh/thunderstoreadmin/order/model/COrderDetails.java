package com.ueh.thunderstoreadmin.order.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ueh.thunderstoreadmin.common.model.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * @author TuMy
 */
@Setter
@Getter
@Entity
@SuperBuilder
@NoArgsConstructor
@Table(name="c_order_details")
public class COrderDetails extends BaseEntity {
    @JsonIgnore
    @OneToOne(mappedBy = "orderDetails")
    private COrder order;

    @CreatedDate
    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name="num_of_product")
    private int numOfProduct;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private COrderDetailsStatus orderDetailsStatus;

    @Column(name = "address",nullable = false)
    private String address;

    @Column(name = "phone",nullable = false)
    private String phone;


    @Column(name = "shipping_cost")
    private BigDecimal shippingCost;

    @Column(name = "surcharge")
    private BigDecimal surcharge;

    @Column(name = "total",nullable = false)
    private BigDecimal total;

    @Column(name = "final_total",nullable = false)
    private BigDecimal finalTotal;
    @Enumerated(EnumType.STRING)

    @Column(name = "payment_status")
    private CPaymentStatus paymentStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    private CPaymentMethod paymentMethod;

    @OneToMany(mappedBy = "orderDetails",cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REMOVE})
    private Set<COrderDetailsItem> orderItems = new LinkedHashSet<>();

    public void addOrderDetailsItem(COrderDetailsItem item) {
        orderItems.add(item);
        item.setOrderDetails(this);
    }
}
