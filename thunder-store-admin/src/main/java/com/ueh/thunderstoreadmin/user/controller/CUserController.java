package com.ueh.thunderstoreadmin.user.controller;

import com.ueh.thunderstoreadmin.common.helper.ResponseHelper;
import com.ueh.thunderstoreadmin.user.dto.CUserDetailsAndRolesDTO;
import com.ueh.thunderstoreadmin.user.dto.CUserDetailsDTO;
import com.ueh.thunderstoreadmin.user.dto.CUserDetailsUpdateDTO;
import com.ueh.thunderstoreadmin.user.service.CUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

/**
 * @author TuMy
 */
@RestController
@RequestMapping("/api/v1/user")
public class CUserController {
    @Autowired
    private CUserService service;

    @GetMapping
    public Object findAllUser(@RequestParam(name="limit",required = false,defaultValue = "10") Integer limit,
                              @RequestParam(name="page",required = false,defaultValue = "1") Integer page,
                              @RequestParam(name="order-by",required = false,defaultValue = "createAt:desc") String orderBy) {
        return ResponseHelper.getResponse(service.findAll(page,limit,orderBy), HttpStatus.OK);
    }

    @GetMapping("/user-detail/{user-id}")
    public Object getUserDetail(@PathVariable(name="user-id") String userId) {
        CUserDetailsDTO dto = service.getUserDetail(userId);

        return ResponseHelper.getResponse(dto, HttpStatus.OK);
    }

    @PutMapping("/update-details/{user-id}")
    public Object updateUserDetails(@PathVariable(name="user-id") String userId,
                                    @Valid @RequestBody CUserDetailsUpdateDTO dto,
                                    BindingResult bindingResult) {

        if(bindingResult.hasErrors())
            return ResponseHelper.getErrorResponse(bindingResult,HttpStatus.BAD_REQUEST);

        CUserDetailsDTO newDetails = service.updateUserDetails(userId,dto);
        if(newDetails == null)
            return ResponseHelper.getErrorResponse("Something wrong.", HttpStatus.BAD_REQUEST);

        return ResponseHelper.getResponse(newDetails, HttpStatus.OK);
    }


    @PutMapping("/update/{user-id}")
    public Object adminUpdateUser(@PathVariable(name="user-id") String userId,
                                  @Valid @RequestBody CUserDetailsAndRolesDTO dto,
                                  BindingResult bindingResult) {

        if(bindingResult.hasErrors())
            return ResponseHelper.getErrorResponse(bindingResult,HttpStatus.BAD_REQUEST);

        CUserDetailsAndRolesDTO newDetails = service.updateUser(userId,dto);
        if(newDetails == null)
            return ResponseHelper.getErrorResponse("Something wrong.", HttpStatus.BAD_REQUEST);

        return ResponseHelper.getResponse(newDetails, HttpStatus.OK);
    }


}
