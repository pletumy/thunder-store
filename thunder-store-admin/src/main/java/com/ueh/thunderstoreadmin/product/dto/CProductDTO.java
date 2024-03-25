package com.ueh.thunderstoreadmin.product.dto;

import com.ueh.thunderstoreadmin.product.validation.UniqueProductName;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * @author TuMy
 */
@Setter
@Getter
@NoArgsConstructor
@SuperBuilder
public class CProductDTO {
    private String id;

    @UniqueProductName
    private String name;

    @NotNull(message = "{product.price.notNull}")
    private BigDecimal price;

    @NotNull(message = "{product.quantity.notNull}")
    private int quantity;

    private int sold;

    @NotBlank(message = "{product.description.notBlank}")
    private String description;

    private float rate;

    private int likes;

    private BigDecimal discount;

    private List<CProductImageDTO> images = new ArrayList<>();
    private List<CColorDTO> colors = new ArrayList<>();
    private List<CSizeDTO> sizes = new ArrayList<>();

    private List<String> tag = new ArrayList<>();
}