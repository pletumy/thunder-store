package com.ueh.thunderstoreadmin.cart.repository;

import com.ueh.thunderstoreadmin.cart.model.CCart;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author TuMy
 */
public interface CCartRepository extends JpaRepository<CCart, String> {
}
