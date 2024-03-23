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
public class CCategoryDTO {
    private String id;
    @UniqueCategoryName
    private String name;
    @NotBlank
    private String description;

    @NotBlank
    private String tag;
}
