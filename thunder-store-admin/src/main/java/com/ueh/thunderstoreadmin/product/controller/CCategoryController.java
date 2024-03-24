package com.ueh.thunderstoreadmin.product.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author TuMy
 */
@RestController
@RequestMapping("/api/v1/categories")
public class CCategoryController {
    @Autowired
    private CCategoryService service;

    @GetMapping
    public Object findAll() {
        return ResponseHelper.getResponse(service.findAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public Object createNewCate(@Valid @RequestBody CCategoryDTO dto, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return ResponseHelper.getErrorResponse(bindingResult, HttpStatus.BAD_REQUEST);
        CCategoryDTO newDto = service.save(dto);

        if (newDto == null)
            return ResponseHelper.getErrorResponse("Category creation failed. ", HttpStatus.BAD_REQUEST);

        return ResponseHelper.getResponse(newDto, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{category-id}")
    public Object updateCategory(   @PathVariable(name = "category-id", required = true) String categoryId,
                                    @RequestBody CCategoryDTO dto, BindingResult bindingResult) {

        if (bindingResult.hasErrors())
            return ResponseHelper.getErrorResponse(bindingResult, HttpStatus.BAD_REQUEST);

        CCategoryDTO newDTO = service.update(categoryId, dto);

        if (newDTO == null)
            return ResponseHelper.getErrorResponse("Update failed.", HttpStatus.BAD_REQUEST);

        return ResponseHelper.getResponse(newDTO, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{category-id}")
    public Object deleteCategory(@PathVariable(name = "category-id", required = true) String categoryId) {

        boolean isDeleted = service.delete(categoryId);
        if (!isDeleted)
            return ResponseHelper.getErrorResponse("Delete failed.Please try again.", HttpStatus.BAD_REQUEST);

        return ResponseHelper.getResponse("Deleted.", HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add-products/{cate-id}")
    public Object addProducts(@RequestBody List<String> productIds, @PathVariable(name="cate-id") String cateId) {
        boolean status = service.addProductListById(cateId, productIds);
        if(!status)
            return ResponseHelper.getErrorResponse("Category or product id is not existed.Please try again.", HttpStatus.BAD_REQUEST);

        return ResponseHelper.getResponse("Successfully add all product .", HttpStatus.OK);
    }
    /* Product */

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/remove-product/{category-id}/{product-id}")
    public Object removeProduct(@PathVariable(name="category-id",required=true) String categoryId,
                                @PathVariable(name="product-id",required=true) String productId) {
        boolean status = service.removeProduct(categoryId, productId);
        if(!status)
            return ResponseHelper.getErrorResponse("Category or product id is not existed.Please try again.", HttpStatus.BAD_REQUEST);

        return ResponseHelper.getResponse("Successfully remove product from category.", HttpStatus.OK);
    }

}
