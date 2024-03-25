package com.ueh.thunderstoreadmin.order.mapper;

import com.ueh.thunderstoreadmin.order.dto.COrderDetailsItemDTO;
import com.ueh.thunderstoreadmin.order.model.COrderDetailsItem;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

/**
 * @author TuMy
 */
@Mapper
public interface COrderDetailsItemMapper {
    COrderDetailsItemMapper INSTANCE = Mappers.getMapper(COrderDetailsItemMapper.class);

    COrderDetailsItemDTO toDTO(COrderDetailsItem entity);
}
