package com.ueh.thunderstoreadmin.order.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.Set;

/**
 * @author TuMy
 */
@Setter
@Getter
@NoArgsConstructor
@SuperBuilder
public class CCheckoutDTO {
    @NotBlank
    private String phone;
    @NotBlank
    private String address;
    @NotNull
    private Set<CCartItemDTO> items;
    @NotNull
    private int numOfProduct;
    @NotNull
    private BigDecimal shippingCost;
    @NotNull
    private BigDecimal surcharge;
    @NotNull
    private BigDecimal total;
    @NotNull
    private BigDecimal finalTotal;
    @NotNull
    private CPaymentMethod paymentMethod;

    private CPaymentStatus paymentStatus;
}
