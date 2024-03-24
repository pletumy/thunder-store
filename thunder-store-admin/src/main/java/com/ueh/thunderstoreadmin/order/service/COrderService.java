package com.ueh.thunderstoreadmin.order.service;

import com.ueh.thunderstoreadmin.common.dto.CPagingDTO;
import com.ueh.thunderstoreadmin.order.dto.CCheckoutDTO;
import com.ueh.thunderstoreadmin.order.dto.COrderDTO;
import com.ueh.thunderstoreadmin.order.dto.COrderUpdateDTO;

import java.util.List;

/**
 * @author TuMy
 */
public interface COrderService {
    List<COrderDTO> getAllByUserId(String userId);

    CCheckoutDTO getCheckoutDTO(String userId, List<String> cartItemIdList);

    COrderDTO createOrder(String userId,CCheckoutDTO checkoutDTO);

    CPagingDTO findAll(int page, int limit, String orderBy);

    COrderDTO getOrderById(String orderId);

    boolean deleleOrderById(String orderId);

    COrderDTO updateOrder(String orderId, COrderUpdateDTO orderUpdateDTO);
}
