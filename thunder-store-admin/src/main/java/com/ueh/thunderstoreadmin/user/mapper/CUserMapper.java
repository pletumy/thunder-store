package com.ueh.thunderstoreadmin.user.mapper;

import com.ueh.thunderstoreadmin.user.dto.CUserDTO;
import com.ueh.thunderstoreadmin.user.dto.CUserDetailsDTO;
import com.ueh.thunderstoreadmin.user.dto.CUserDetailsUpdateDTO;
import com.ueh.thunderstoreadmin.user.model.CUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

/**
 * @author TuMy
 */
@Mapper
public interface CUserMapper {
    CUserMapper INSTANCE = Mappers.getMapper(CUserMapper.class);
    CUserDTO toDTO(CUser entity);
    CUser toEntity(CUserDTO dto);
    CUserDetailsDTO toUserDetailsDTO(CUser entity);

    @Mapping(target = "id",ignore = true)
    CUser updateToUserDetails(CUserDetailsUpdateDTO userDetails, @MappingTarget CUser user);

    @Mappings({
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "userAddress", ignore = true),
            @Mapping(target = "cart", ignore = true)
    })
    CUser update(CUserDetailsDTO userDetails, @MappingTarget CUser user);
}
