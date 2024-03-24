package com.ueh.thunderstoreadmin.cart.repository;

import com.ueh.thunderstoreadmin.cart.model.CCartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author TuMy
 */
@Repository
public interface CCartItemRepository extends JpaRepository<CCartItem, String> {

}
