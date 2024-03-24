package com.ueh.thunderstoreadmin.order.mapper;

import com.ueh.thunderstoreadmin.order.dto.COrderDetailsItemDTO;
import com.ueh.thunderstoreadmin.order.model.COrderDetailsItem;

/**
 * @author TuMy
 */
@Mapper
public interface COrderDetailsItemMapper {
    COrderDetailsItemMapper INSTANCE = Mappers.getMapper(COrderDetailsItemMapper.class);

    COrderDetailsItemDTO toDTO(COrderDetailsItem entity);
}
