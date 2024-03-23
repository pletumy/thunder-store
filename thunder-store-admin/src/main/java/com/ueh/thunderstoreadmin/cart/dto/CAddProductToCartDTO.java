package com.ueh.thunderstoreadmin.cart.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * @author TuMy
 */
@Setter
@Getter
@NoArgsConstructor
@SuperBuilder
public class CAddProductToCartDTO {
    private String cartId;
    private String productId;
    private int quantity;
    private String colorId;
    private String sizeId;
}
