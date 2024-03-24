package com.ueh.thunderstoreadmin.email.service;

import com.ueh.thunderstoreadmin.order.dto.COrderDTO;

/**
 * @author TuMy
 */
public interface CEmailService
{
    //void sendSimpleMailMessage(String name, String to);
    void sendOrderInfoEmail(String name, String to, COrderDTO order);
}
