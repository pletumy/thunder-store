package com.ueh.thunderstoreadmin.order.dto;

import com.ueh.thunderstoreadmin.order.model.COrderStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * @author TuMy
 */
@Setter
@Getter
@NoArgsConstructor
@SuperBuilder
public class COrderUpdateDTO {
    private COrderDetailsDTO orderDetails;
    private COrderStatus status;
}
