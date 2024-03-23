package com.ueh.thunderstoreadmin.cart.service;

import com.ueh.thunderstoreadmin.cart.dto.CAddProductToCartDTO;
import com.ueh.thunderstoreadmin.cart.dto.CCartDTO;

/**
 * @author TuMy
 */
public interface CCartService {
    CCartDTO findCartById(String cartId);
    CCartDTO addProductToCart(CAddProductToCartDTO dto);
    boolean removeProduct(String cartId,String cartItemId);
}
