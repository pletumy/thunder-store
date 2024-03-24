package com.ueh.thunderstoreadmin.cart.service;

import com.ueh.thunderstoreadmin.cart.dto.CCartItemDTO;
import com.ueh.thunderstoreadmin.cart.dto.CCartItemUpdateDTO;
import com.ueh.thunderstoreadmin.cart.model.CCart;
import com.ueh.thunderstoreadmin.cart.model.CCartItem;
import com.ueh.thunderstoreadmin.cart.repository.CCartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

/**
 * @author TuMy
 */
@Service
public class CCartItemServiceImpl implements CCartItemService {
    @Autowired
    private CCartItemRepository cartItemRepository;

    @Override
    public CCartItemDTO update(String itemId, CCartItemUpdateDTO dto) {
        Optional<CCartItem> cartItemOpt = cartItemRepository.findById(itemId);
        if(cartItemOpt.isEmpty())
            return null;
        CCartItem cartItem = cartItemOpt.get();

        CCart cart = cartItem.getCart();
        BigDecimal oldTotal = cart.getTotal().subtract(cartItem.finalPrice());
        int oldNumOfProduct = cart.getNumOfProduct() - cartItem.getQuantity();
        cartItem.setQuantity(dto.getQuantity());

        cart.setTotal(oldTotal.add(cartItem.finalPrice()));
        cart.setNumOfProduct(oldNumOfProduct + dto.getQuantity());

        cartItem.setColor(dto.getSize());
        cartItem.setSize(dto.getSize());

        CCartItem newCartItem = cartItemRepository.save(cartItem);

        CCartItemDTO newDto = new CCartItemDTO();
        newDto.mapFromEntity(newCartItem);
        return newDto;
    }
}
