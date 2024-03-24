package com.ueh.thunderstoreadmin.product.mapper;

import com.ueh.thunderstoreadmin.product.dto.CCategoryDTO;
import com.ueh.thunderstoreadmin.product.model.CCategory;
import org.apache.catalina.mapper.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.web.bind.annotation.Mapping;

/**
 * @author TuMy
 */
@Mapper
public interface CCategoryMapper {
    CCategoryMapper INSTANCE = Mappers.getMapper(CCategoryMapper.class);
    CCategoryDTO toDto(CCategory entity);
    CCategory toEntity(CCategoryDTO dto);
    @Mapping(target = "id",ignore=true)
    CCategory updateEntityFromDto(CCategoryDTO dto,@MappingTarget CCategory product);

}
