package com.ueh.thunderstoreadmin.order.dto;

import com.ueh.thunderstoreadmin.order.model.CPaymentMethod;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author TuMy
 */
@Setter
@Getter
@NoArgsConstructor
@SuperBuilder
public class COrderRequestDTO {
    private String userId;
    private List<String> cartItemId;
    private BigDecimal shippingCost;
    private CPaymentMethod paymentMethod;
}
