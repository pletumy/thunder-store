package com.ueh.thunderstoreadmin.role.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author TuMy
 */
@Constraint(validatedBy = UniqueCodeValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueCode {
    String message() default "Role code is existed.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
