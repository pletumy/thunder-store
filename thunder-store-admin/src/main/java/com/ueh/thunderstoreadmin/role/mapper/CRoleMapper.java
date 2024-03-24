package com.ueh.thunderstoreadmin.role.mapper;

import com.ueh.thunderstoreadmin.role.dto.CRoleDTO;
import com.ueh.thunderstoreadmin.role.model.CRole;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * @author TuMy
 */
@Mapper
public interface CRoleMapper {
    CRoleMapper INSTANCE = Mappers.getMapper(CRoleMapper.class);
    CRoleDTO toDTO(CRole entity);
    CRole toEntity(CRoleDTO dto);

    CRoleDTO toDTO(CRole entity);
}
