package com.ueh.thunderstoreadmin.product.validation;

import com.ueh.thunderstoreadmin.product.repository.CCategoryRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

/**
 * @author TuMy
 */
public class UniqueCategoryNameValidator implements ConstraintValidator <UniqueCategoryName, String> {
    @Autowired
    private CCategoryRepository repository;

    private String message;

    @Override
    public void initialize(UniqueCategoryName uniqueName) {
        message = uniqueName.message();
    }

    @Override
    public boolean isValid(String name, ConstraintValidatorContext context) {
        Optional<CCategory> categoryOpt = repository.findByName(name);
        if(categoryOpt.isEmpty())
            return true;
        context.buildConstraintViolationWithTemplate(message).addConstraintViolation().disableDefaultConstraintViolation();
        return false;
    }
}
