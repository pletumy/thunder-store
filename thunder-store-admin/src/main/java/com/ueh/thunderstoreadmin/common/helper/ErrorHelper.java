package com.ueh.thunderstoreadmin.common.helper;

import org.springframework.validation.BindingResult;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author TuMy
 */
public class ErrorHelper {
    public static List<String> getAllError(BindingResult result) {
        return result.getAllErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .collect(Collectors.toList());
    }
}
