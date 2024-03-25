package com.ueh.thunderstoreadmin.cart.service;

import com.ueh.thunderstoreadmin.cart.dto.CAddProductToCartDTO;
import com.ueh.thunderstoreadmin.cart.dto.CCartDTO;
import com.ueh.thunderstoreadmin.cart.dto.CCartItemDTO;
import com.ueh.thunderstoreadmin.cart.model.CCart;
import com.ueh.thunderstoreadmin.cart.model.CCartItem;
import com.ueh.thunderstoreadmin.cart.repository.CCartItemRepository;
import com.ueh.thunderstoreadmin.cart.repository.CCartRepository;
import com.ueh.thunderstoreadmin.product.model.CProduct;
import com.ueh.thunderstoreadmin.product.repository.CProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author TuMy
 */
@Service
public class CCartServiceImpl implements CCartService {

    @Autowired
    private CCartRepository cartRepository;

    @Autowired
    private CCartItemRepository cartItemRepository;

    @Autowired
    private CProductRepository productRepository;

    @Override
    public CCartDTO findCartById(String cartId) {
        Optional<CCart> cartOpt = cartRepository.findById(cartId);

        if (cartOpt.isEmpty())
            return null;
        CCart cart = cartOpt.get();

        return buildSCartDTO(cart);
    }

    @Override
    public CCartDTO addProductToCart(CAddProductToCartDTO dto) {
        Optional<CCart> cartOpt = cartRepository.findById(dto.getCartId());

        if (cartOpt.isEmpty())
            return null;

        Optional<CProduct> productOpt = productRepository.findById(dto.getProductId());
        if (productOpt.isEmpty())
            return null;
        CProduct product = productOpt.get();
        CCart cart = cartOpt.get();
        Set<CCartItem> cartItems = cart.getItems(); // lay item

        CCartItem cartItemExisted = cartItems.stream()
                .filter(cartItem -> cartItem.getProduct()
                        .getId()
                        .equals(dto.getProductId()))
                .findFirst().orElse(null);

        if (cartItemExisted != null) {
            cartItemExisted.setQuantity(cartItemExisted.getQuantity() + dto.getQuantity());
            cart.setTotal(cart.getTotal().add(cartItemExisted.getProduct().priceDiscounted().multiply(BigDecimal.valueOf(dto.getQuantity()))));
        }else{
            CCartItem cartItem = CCartItem.builder()
                    .product(product)
                    .size(dto.getSizeId())
                    .color(dto.getColorId())
                    .quantity(dto.getQuantity())
                    .build();
            cart.addCartItem(cartItem);
            cart.setTotal(cart.getTotal().add(cartItem.finalPrice()));
        }

        cart.setNumOfProduct(cart.getNumOfProduct() + dto.getQuantity());

        CCart newCart = cartRepository.save(cart);
        return buildSCartDTO(newCart);
    }

    public CCartDTO buildSCartDTO(CCart cart) {
        cart.buildTotalAndNumOfProduct();
        CCartDTO cartDTO =  CCartDTO.builder()
                .total(cart.getTotal())
                .numOfProduct(cart.getNumOfProduct())
                .items(cart.getItems().stream()
                        .map(item -> {
                            CCartItemDTO dto = new CCartItemDTO();
                            dto.mapFromEntity(item);
                            return dto;
                        })
                        .sorted(Comparator.comparing(CCartItemDTO::getCreateAt))
                        .collect(Collectors.toCollection(LinkedHashSet::new)))
                .build();

        return cartDTO;
    }

    @Override
    public boolean removeProduct(String cartId,String cartItemId) {
        Optional<CCart> cartOpt = cartRepository.findById(cartId);

        if (cartOpt.isEmpty())
            return false;

        CCart cart = cartOpt.get();
        CCartItem existCartItem = cart.getItems().stream().filter(item -> item.getId().equals(cartItemId)).findFirst().orElse(null);

        if(existCartItem == null) return false;

        cart.removeCartItem(existCartItem);
        cart.setTotal(cart.getTotal().subtract(existCartItem.finalPrice()));
        cart.setNumOfProduct(cart.getNumOfProduct() - existCartItem.getQuantity());
        cartRepository.save(cart);
        cartItemRepository.deleteById(cartItemId);
        return true;
    }
}
