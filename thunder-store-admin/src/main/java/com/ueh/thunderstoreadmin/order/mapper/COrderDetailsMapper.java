package com.ueh.thunderstoreadmin.order.mapper;

import com.ueh.thunderstoreadmin.order.dto.COrderDetailsDTO;
import com.ueh.thunderstoreadmin.order.model.COrderDetails;
import org.springframework.web.bind.annotation.Mapping;
import org.xmlunit.util.Mapper;

/**
 * @author TuMy
 */
@Mapper
public interface COrderDetailsMapper {
    COrderDetailsMapper INSTANCE = Mappers.getMapper(COrderDetailsMapper.class);
    @Mapping(target = "orderItems",ignore = true)
    COrderDetailsDTO toDTO(COrderDetails entity);
}
