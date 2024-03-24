package com.ueh.thunderstoreadmin.order.controller;

import com.ueh.thunderstoreadmin.common.helper.ResponseHelper;
import com.ueh.thunderstoreadmin.order.dto.COrderDTO;
import com.ueh.thunderstoreadmin.order.dto.COrderUpdateDTO;
import com.ueh.thunderstoreadmin.order.service.COrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * @author TuMy
 */
@RestController
@RequestMapping("/api/v1/admin/order")
public class COrderAdminController {

    @Autowired
    private COrderService service;

    @GetMapping
    public Object getAllOrder(@RequestParam(name="limit",required = false,defaultValue = "10") Integer limit,
                              @RequestParam(name="page",required = false,defaultValue = "1") Integer page,
                              @RequestParam(name="order-by",required = false,defaultValue = "name") String orderBy){

        return ResponseHelper.getResponse(service.findAll(page,limit,orderBy), HttpStatus.OK);
    }

    @GetMapping("/{order-id}")
    public Object getOrderById(@PathVariable(name="order-id") String orderId){
        COrderDTO dto = service.getOrderById(orderId);
        if(dto == null)
            return ResponseHelper.getErrorResponse("Order is not existed.",HttpStatus.BAD_REQUEST);
        return ResponseHelper.getResponse(dto,HttpStatus.OK);
    }
    @DeleteMapping("/delete/{order-id}")
    public Object deleteOrderById(@PathVariable(name = "order-id") String orderId){
        if(service.deleleOrderById(orderId)){
            return ResponseHelper.getErrorResponse("Order id is not existed.",HttpStatus.BAD_REQUEST);
        }
        return ResponseHelper.getResponse("Order deleted.",HttpStatus.OK);
    }

    @PutMapping("/update/{order-id}")
    public Object updateOrder(@PathVariable(name="order-id") String orderId,
                              @RequestBody COrderUpdateDTO orderUpdateDTO){
        COrderDTO dto = service.updateOrder(orderId,orderUpdateDTO);

        if(dto == null)
            return ResponseHelper.getErrorResponse("Order update failure.",HttpStatus.BAD_REQUEST);

        return ResponseHelper.getResponse("Order updated",HttpStatus.OK);
    }

}
