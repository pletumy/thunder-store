package com.ueh.thunderstoreadmin.order.model;

import com.ueh.thunderstoreadmin.common.model.BaseEntity;
import com.ueh.thunderstoreadmin.user.model.CUser;
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
@Entity
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="c_order")
public class COrder extends BaseEntity {
    @ManyToOne
    @JoinColumn(name="user_id")
    private CUser user;

    @OneToOne(cascade = {CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REMOVE})
    @JoinColumn(name="order_details_id",nullable = false,unique = true)
    private COrderDetails orderDetails;

    @Enumerated(EnumType.STRING)
    @Column(name="status")
    private COrderStatus status;
}
