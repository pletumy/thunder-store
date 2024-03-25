package com.ueh.thunderstoreadmin.user.service;

import com.ueh.thunderstoreadmin.user.dto.CUserAddressDTO;

import java.util.List;

/**
 * @author TuMy
 */
public interface CUserAddressService {
    CUserAddressDTO update(String addressId, CUserAddressDTO dto);
    List<CUserAddressDTO> createAddressByUserId(String userId, CUserAddressDTO dto);

    List<CUserAddressDTO> setDefaultById(String userId,String addressId);
    boolean deleteById(String addressId);
}
