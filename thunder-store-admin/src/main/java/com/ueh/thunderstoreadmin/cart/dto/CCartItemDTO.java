package com.ueh.thunderstoreadmin.cart.dto;

import com.ueh.thunderstoreadmin.cart.model.CCartItem;
import com.ueh.thunderstoreadmin.product.dto.CProductDTO;
import com.ueh.thunderstoreadmin.product.mapper.CProductMapper;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * @author TuMy
 */
@Setter
@Getter
@NoArgsConstructor
@SuperBuilder
public class CCartItemDTO {
    private String id;
    private int quantity;
    private CProductDTO product;
    private String color;
    private String size;
    private LocalDateTime createAt;
    private BigDecimal finalPrice;
    private BigDecimal originalPrice;

    public void mapFromEntity(CCartItem item){
        if(item == null) return;

        this.setId(item.getId());
        this.setQuantity(item.getQuantity());
        this.setProduct(CProductMapper.INSTANCE.toDto(item.getProduct()));
        this.setSize(item.getSize());
        this.setColor(item.getColor());
        this.setCreateAt(item.getCreateAt());
        this.setFinalPrice(item.finalPrice());
        this.setOriginalPrice(item.originalPrice());
    }
}
