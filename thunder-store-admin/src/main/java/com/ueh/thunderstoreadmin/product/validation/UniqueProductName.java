package com.ueh.thunderstoreadmin.product.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author TuMy
 */
@Constraint(validatedBy = UniqueProductNameValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueProductName {
    String message() default "Tên sản pham da ton tai!";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
