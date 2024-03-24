package com.ueh.thunderstoreadmin.product.dto;

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
public class CProductSearchFilterDTO {
    private Set<String> colorIds;
    private Set<String> categoryIds;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
}
