package com.ueh.thunderstoreadmin.user.annotation;

import com.ueh.thunderstoreadmin.user.model.CUser;
import com.ueh.thunderstoreadmin.user.repository.CUserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

/**
 * @author TuMy
 */
public class UniquePhoneValidator implements ConstraintValidator<UniquePhone, String> {
    private String message;

    @Autowired
    private CUserRepository repository;

    @Override
    public void initialize(UniquePhone uniqueUsername) {
        message = uniqueUsername.message();
    }

    @Override
    public boolean isValid(String phone, ConstraintValidatorContext context) {
        Optional<CUser> userOpt = repository.findByPhone(phone);
        if(userOpt.isEmpty())
            return true;

        context.buildConstraintViolationWithTemplate(message)
                .addConstraintViolation()
                .disableDefaultConstraintViolation();
        return false;
    }
}