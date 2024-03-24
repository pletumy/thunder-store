package com.ueh.thunderstoreadmin.email.service;

import com.ueh.thunderstoreadmin.order.dto.COrderDTO;
import com.ueh.thunderstoreadmin.order.dto.COrderDetailsDTO;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

/**
 * @author TuMy
 */
@Service
public class CEmailServiceImpl implements CEmailService{
    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void sendSimpleMailMessage(String name, String to) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setSubject("Test send email");
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setText("Tao ten nhan.");
            emailSender.send(message);
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            throw new RuntimeException(exception.getMessage());
        }
    }

    public void sendOrderInfoEmail(String name, String to, COrderDTO order) {
        try {
            Context context = new Context();
            COrderDetailsDTO orderDetailsDTO  = order.getOrderDetails();
            context.setVariables(Map.of(
                    "displayName", order.getUser().getDisplayName(),
                    "address", orderDetailsDTO.getAddress(),
                    "orderId",order.getId(),
                    "phone", orderDetailsDTO.getPhone(),
                    "orderItems", orderDetailsDTO.getOrderItems(),
                    "finalTotal", orderDetailsDTO.getFinalTotal(),
                    "orderDate",orderDetailsDTO.getOrderDate()
            ));


            String text = templateEngine.process("emailOrder", context);
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setPriority(1);
            helper.setSubject("Cozastore");
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setText(text, true);

            emailSender.send(message);
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            throw new RuntimeException(exception.getMessage());
        }
    }


}
