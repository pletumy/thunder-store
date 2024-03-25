package com.ueh.thunderstoreadmin.user.annotation;

import com.ueh.thunderstoreadmin.user.model.CUser;
import com.ueh.thunderstoreadmin.user.repository.CUserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

/**
 * @author TuMy
 */
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {
    private String message;

    @Autowired
    private CUserRepository repository;

    @Override
    public void initialize(UniqueEmail uniqueEmail) {
        message = uniqueEmail.message();
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        Optional<CUser> userOpt = repository.findByEmail(email);
        if (userOpt.isEmpty())
            return true;

        context.buildConstraintViolationWithTemplate(message).addConstraintViolation()
                .disableDefaultConstraintViolation();
        return false;
    }
}
