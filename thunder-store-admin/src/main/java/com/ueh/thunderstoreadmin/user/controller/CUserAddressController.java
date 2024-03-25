package com.ueh.thunderstoreadmin.user.controller;

import com.ueh.thunderstoreadmin.common.helper.ResponseHelper;
import com.ueh.thunderstoreadmin.user.dto.CUserAddressDTO;
import com.ueh.thunderstoreadmin.user.service.CUserAddressService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author TuMy
 */
@RestController
@RequestMapping("/api/v1/address")
public class CUserAddressController {
    @Autowired
    private CUserAddressService service;

    @PutMapping("/update/{address-id}")
    public Object update(	@PathVariable(name="address-id") String addressId,
                             @Valid @RequestBody CUserAddressDTO dto,
                             BindingResult bindingResult) {
        if(bindingResult.hasErrors())
            return ResponseHelper.getErrorResponse(bindingResult, HttpStatus.BAD_REQUEST);
        CUserAddressDTO newDto = service.update(addressId, dto);

        if(newDto == null)
            return ResponseHelper.getErrorResponse("Add Address failure.", HttpStatus.BAD_REQUEST);

        return ResponseHelper.getResponse(newDto, HttpStatus.OK);
    }
    @DeleteMapping("/{address-id}")
    public Object deleteById(@PathVariable(name="address-id") String addressId) {
        boolean isSuccess = service.deleteById(addressId);
        if(!isSuccess)
            return ResponseHelper.getErrorResponse("Delete failure", HttpStatus.BAD_REQUEST);
        return ResponseHelper.getResponse("Delete successful.", HttpStatus.OK);
    }

    @PostMapping("create/{user-id}")
    public Object addAddressByUserId(@PathVariable(name="user-id") String userId,@Valid @RequestBody CUserAddressDTO dto,
                                     BindingResult bindingResult) {

        if(bindingResult.hasErrors())
            return ResponseHelper.getErrorResponse(bindingResult, HttpStatus.BAD_REQUEST);

        List<CUserAddressDTO> address = service.createAddressByUserId(userId,dto);

        if(dto == null)
            return ResponseHelper.getErrorResponse("Some thing wrong.", HttpStatus.BAD_REQUEST);
        return ResponseHelper.getResponse(address, HttpStatus.OK);
    }

    @PostMapping("/set-default/{user-id}/{address-id}")
    public Object setDefaultAddress(@PathVariable(name="user-id") String userId,@PathVariable(name="address-id") String addressId) {


        List<CUserAddressDTO> address = service.setDefaultById(userId,addressId);

        if(address == null)
            return ResponseHelper.getErrorResponse("Some thing wrong.", HttpStatus.BAD_REQUEST);
        return ResponseHelper.getResponse(address, HttpStatus.OK);
    }
}