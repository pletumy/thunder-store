package com.ueh.thunderstoreadmin.product.mapper;

import com.ueh.thunderstoreadmin.product.dto.*;
import com.ueh.thunderstoreadmin.product.model.CProduct;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

/**
 * @author TuMy
 */
@Mapper
public interface CProductMapper {
    CProductMapper INSTANCE = Mappers.getMapper(CProductMapper.class);

    CProductDTO toDto(CProduct entity);

    /*3 field này map bằng tay*/
    @Mappings({
            @Mapping(target = "images", ignore = true),
            @Mapping(target = "colors", ignore = true),
            @Mapping(target = "sizes", ignore = true)
    })
    CProduct toEntity(CProductDTO dto);
    @Mappings({
            @Mapping(target = "images", ignore = true),
            @Mapping(target = "colors", ignore = true),
            @Mapping(target = "sizes", ignore = true),
            @Mapping(target = "categories",ignore = true)
    })
    CProduct toEntity(CCreateProductDTO dto);

    @Mappings({
            @Mapping(target = "images", ignore = true),
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "colors", ignore = true),
            @Mapping(target = "sizes", ignore = true),
            @Mapping(target = "categories", ignore = true)
    })
    CProduct updateEntityFromDto(CProductUpdateDTO dto, @MappingTarget CProduct product);

    CColorDTO colorToColorDTO(CProductColor color);
    CSizeDTO sizeToSizeDTO(CProductSize color);
}
