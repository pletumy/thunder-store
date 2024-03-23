package com.ueh.thunderstoreadmin.cart.controller;

import com.ueh.thunderstoreadmin.cart.service.CCartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

/**
 * @author TuMy
 */
@RestController
@RequestMapping("/api/v1/cart")
public class CCartController {
    @Autowired
    private CCartService service;

    @GetMapping("/{cart-id}")
    public Object getItemByUserId(@PathVariable(name="cart-id") String cartId) {
        CCartDTO dto = service.findCartById(cartId);
        if(dto == null)
            return ResponseHelper
                    .getErrorResponse("Cart id is not existed.", null);
        return ResponseHelper.getResponse(dto, HttpStatus.OK);
    }

    @PostMapping("/add-product")
    public Object addProduct(@Valid @RequestBody CAddProductToCartDTO dto, BindingResult bindingResult) {
        if(bindingResult.hasErrors())
            return ResponseHelper.getErrorResponse(bindingResult, HttpStatus.BAD_REQUEST);
        CCartDTO res = service.addProductToCart(dto);
        if(res == null)
            return ResponseHelper.getErrorResponse("Some thing wrong", HttpStatus.BAD_REQUEST);

        return ResponseHelper.getResponse(res, HttpStatus.OK);
    }

    @DeleteMapping("/remove/{cart-id}/{cart-item-id}")
    public Object removeProduct(@PathVariable(name="cart-id",required = true) String cartId,
                                @PathVariable(name="cart-item-id",required = true) String cartItemId) {
        boolean result = service.removeProduct(cartId,cartItemId);

        if(!result)
            return ResponseHelper.getErrorResponse("Cart item id is not existed.", HttpStatus.BAD_REQUEST);

        return ResponseHelper.getResponse("Remove successfully", HttpStatus.OK);
    }
}
