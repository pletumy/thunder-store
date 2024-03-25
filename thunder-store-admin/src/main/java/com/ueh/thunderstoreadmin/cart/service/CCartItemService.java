package com.ueh.thunderstoreadmin.cart.service;

import com.ueh.thunderstoreadmin.cart.dto.CCartItemDTO;
import com.ueh.thunderstoreadmin.cart.dto.CCartItemUpdateDTO;

/**
 * @author TuMy
 */
public interface CCartItemService {
    CCartItemDTO update(String id, CCartItemUpdateDTO dto);
}
