package com.ueh.thunderstoreadmin.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

/**
 * @author TuMy
 */
@Setter
@Getter
@NoArgsConstructor
@SuperBuilder
public class CProductUpdateDTO {
    private String id;
    private String name;
    @NotNull(message = "{product.price.notNull}")
    private BigDecimal price;

    @NotNull(message = "{product.quantity.notNull}")
    private int quantity;


    @NotBlank(message = "{product.description.notBlank}")
    private String description;

    private BigDecimal discount;

    private int likes;
    private int rate;

    private List<CProductImageDTO> images;
    private List<String> colors;
    private List<String> sizes;
    private List<String> categories;
}
