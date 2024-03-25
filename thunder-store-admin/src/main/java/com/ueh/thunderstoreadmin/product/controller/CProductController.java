package com.ueh.thunderstoreadmin.product.controller;

import com.ueh.thunderstoreadmin.common.helper.ResponseHelper;
import com.ueh.thunderstoreadmin.product.dto.*;
import com.ueh.thunderstoreadmin.product.service.CProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

/**
 * @author TuMy
 */

@RestController
@RequestMapping("/api/v1/products")
public class CProductController {

    @Autowired
    private CProductService service;

    @GetMapping
    public Object findAll() {
        return ResponseHelper.getResponse(service.findAll(), HttpStatus.OK);
    }

    @GetMapping("/page/{page-index}/{page-size}/{order-by}")
    public Object getPage(@PathVariable(name="page-index") int pageIndex,
                          @PathVariable(name="page-size") int pageSize,
                          @PathVariable(name="order-by",required = false) String orderBy){
        if(pageSize == 0)
            return ResponseHelper.getResponse(null,HttpStatus.NO_CONTENT);

        return ResponseHelper.getResponse(service.findPage(pageIndex,pageSize,orderBy),HttpStatus.OK);
    }

    /*
     * Searching
     * */
    @PostMapping("/search")
    public Object searchingWithFilter(@RequestParam("keyword") String keyword,
                                      @RequestParam(name="limit",required = false,defaultValue = "10") Integer limit,
                                      @RequestParam(name="page",required = false,defaultValue = "1") Integer page,
                                      @RequestParam(name="order-by",required = false,defaultValue = "name") String orderBy,
                                      @RequestBody CProductSearchFilterDTO filter){
        return ResponseHelper.getResponse(service.searchingFilter(keyword,limit,orderBy,page,filter),HttpStatus.OK);
    }

    @GetMapping("/get-by-cate/{cate-id}")
    public Object findByCateId(@RequestParam(name="limit",required = false,defaultValue = "10") Integer limit,
                               @RequestParam(name="page",required = false,defaultValue = "1") Integer page,
                               @RequestParam(name="order-by",required = false,defaultValue = "name") String orderBy,
                               @PathVariable(name="cate-id") String cateId){
        return ResponseHelper.getResponse(service.findAllByCate(cateId,limit,orderBy,page),HttpStatus.OK);
    }
    @PostMapping
    public Object createNewProduct(@Valid @RequestBody CCreateProductDTO dto, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return ResponseHelper.getErrorResponse(bindingResult, HttpStatus.BAD_REQUEST);
        CProductDTO newDto = service.create(dto);

        if (newDto == null)
            return ResponseHelper.getErrorResponse("Product creation failed. ", HttpStatus.BAD_REQUEST);

        return ResponseHelper.getResponse(newDto, HttpStatus.OK);
    }

    @DeleteMapping("/{product-id}")
    public Object deleteProduct(@PathVariable(name = "product-id", required = true) String productId) {

        boolean isDeleted = service.delete(productId);
        if (!isDeleted)
            return ResponseHelper.getErrorResponse("Delete failed.Please try again.", HttpStatus.BAD_REQUEST);

        return ResponseHelper.getResponse("Product deleted successful.", HttpStatus.OK);
    }

    @PutMapping("/{product-id}")
    public Object updateProduct(@PathVariable(name = "product-id") String productId,
                                @Valid @RequestBody CProductUpdateDTO updateDTO, BindingResult bindingResult) {
        if(bindingResult.hasErrors())
            return ResponseHelper.getErrorResponse("product is not exists.",HttpStatus.BAD_REQUEST);

        return ResponseHelper.getResponse(service.update(productId,updateDTO), HttpStatus.OK);
    }

    @PostMapping("/add-image/{product-id}")
    public Object addImage(@PathVariable(name = "product-id",required = true) String productId,
                           @Valid @RequestBody CProductImageDTO dto) {
        return ResponseHelper.getResponse(service.addImage(productId,dto), HttpStatus.OK);
    }

    @DeleteMapping("delete-image/{image-id}")
    public Object deleteImage(@PathVariable(name = "image-id",required = true) String imageId) {
        return ResponseHelper.getResponse(service.removeImage(imageId), HttpStatus.OK);
    }


    /*product color*/
    @GetMapping("/colors")
    public Object getColors(){
        return ResponseHelper.getResponse(service.getColors(),HttpStatus.OK);
    }
    @GetMapping("/sizes")
    public Object getSizes(){
        return ResponseHelper.getResponse(service.getSizes(),HttpStatus.OK);
    }
}
