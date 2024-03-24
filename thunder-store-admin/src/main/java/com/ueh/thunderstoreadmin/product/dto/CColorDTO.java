package com.ueh.thunderstoreadmin.product.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * @author TuMy
 */
@Setter
@Getter
@NoArgsConstructor
@SuperBuilder
public class CColorDTO {
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String color;
}
