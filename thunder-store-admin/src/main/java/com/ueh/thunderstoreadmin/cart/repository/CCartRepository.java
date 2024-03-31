package com.ueh.thunderstoreadmin.cart.repository;

import com.ueh.thunderstoreadmin.cart.model.CCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author TuMy
 */
@Repository

public interface CCartRepository extends JpaRepository<CCart, String> {
}
