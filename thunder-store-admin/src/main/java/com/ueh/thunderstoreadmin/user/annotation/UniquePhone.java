package com.ueh.thunderstoreadmin.user.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author TuMy
 */
@Constraint(validatedBy = UniquePhoneValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface  UniquePhone {
    String message() default "Số điện thoại đã tồn tại.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
