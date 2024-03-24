package com.ueh.thunderstoreadmin.role.mapper;

import com.ueh.thunderstoreadmin.role.dto.CRoleDTO;
import com.ueh.thunderstoreadmin.role.model.CRole;

/**
 * @author TuMy
 */
public class CRoleMapperImpl implements CRoleMapper {

    @Override
    public CRoleDTO toDTO(CRole entity) {
        if ( entity == null ) {
            return null;
        }

        CRoleDTOBuilder<?, ?> cRoleDTO = CRoleDTO.builder();

        cRoleDTO.code( entity.getCode() );
        cRoleDTO.description( entity.getDescription() );
        cRoleDTO.id( entity.getId() );

        return cRoleDTO.build();
    }

    @Override
    public CRole toEntity(CRoleDTO dto) {
        if ( dto == null ) {
            return null;
        }

        CRoleBuilder<?, ?> cRole = CRole.builder();

        cRole.id( dto.getId() );
        cRole.code( dto.getCode() );
        cRole.description( dto.getDescription() );

        return cRole.build();
    }
}