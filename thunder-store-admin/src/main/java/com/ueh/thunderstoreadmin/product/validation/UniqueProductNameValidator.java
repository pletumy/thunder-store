package com.ueh.thunderstoreadmin.product.validation;

import com.ueh.thunderstoreadmin.product.model.CProduct;
import com.ueh.thunderstoreadmin.product.repository.CProductRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

/**
 * @author TuMy
 */
public class UniqueProductNameValidator implements ConstraintValidator<UniqueProductName, String> {
    @Autowired
    private CProductRepository repository;

    private String message;

    @Override
    public void initialize(UniqueProductName uniqueName) {
        message = uniqueName.message();
    }

    @Override
    public boolean isValid(String name, ConstraintValidatorContext context) {
        Optional<CProduct> productOpt = repository.findByName(name);
        if(productOpt.isEmpty())
            return true;
        context.buildConstraintViolationWithTemplate(message)
                .addConstraintViolation()
                .disableDefaultConstraintViolation();
        return false;
    }
}
