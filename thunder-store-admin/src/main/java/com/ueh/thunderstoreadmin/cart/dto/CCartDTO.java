package com.ueh.thunderstoreadmin.cart.dto;

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
public class CCartDTO {
    private Set<CCartItemDTO> items;
    private int numOfProduct;
    private BigDecimal total;
}
