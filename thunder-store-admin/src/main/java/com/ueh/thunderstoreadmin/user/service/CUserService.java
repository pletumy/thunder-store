package com.ueh.thunderstoreadmin.user.service;

import com.ueh.thunderstoreadmin.common.dto.CPagingDTO;
import com.ueh.thunderstoreadmin.user.dto.CUserDetailsAndRolesDTO;
import com.ueh.thunderstoreadmin.user.dto.CUserDetailsDTO;
import com.ueh.thunderstoreadmin.user.dto.CUserDetailsUpdateDTO;

/**
 * @author TuMy
 */

public interface CUserService {

    CPagingDTO findAll(int page, int limit, String orderBy);

    CUserDetailsDTO getUserDetail(String userId);
    CUserDetailsDTO getUserDetailsByUsername(String username);

    CUserDetailsDTO updateUserDetails(String userId, CUserDetailsUpdateDTO dto);

    CUserDetailsAndRolesDTO updateUser(String userId, CUserDetailsAndRolesDTO dto);
}
