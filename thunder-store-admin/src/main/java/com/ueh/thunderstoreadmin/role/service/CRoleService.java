package com.ueh.thunderstoreadmin.role.service;

import com.ueh.thunderstoreadmin.role.dto.CRoleDTO;
import com.ueh.thunderstoreadmin.role.model.CRole;

import java.util.List;

/**
 * @author TuMy
 */
public interface CRoleService {
    List<CRole> findAll();
    CRoleDTO save(CRoleDTO role);
    boolean removeRole(String roleId);
    CRoleDTO updateRole(String roleId, CRoleDTO dto);
}
