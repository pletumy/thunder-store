package com.ueh.thunderstoreadmin.cart.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * @author TuMy
 */
@Setter
@Getter
@SuperBuilder
@Entity
@NoArgsConstructor
@Table(name = "c_cart")
public class CCart {
}
