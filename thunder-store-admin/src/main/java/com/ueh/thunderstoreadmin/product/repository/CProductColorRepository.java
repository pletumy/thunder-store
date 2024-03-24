package com.ueh.thunderstoreadmin.product.repository;

import com.ueh.thunderstoreadmin.product.model.CProductColor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author TuMy
 */
@Repository
public interface CProductColorRepository extends JpaRepository<CProductColor,String> {
    Optional<CProductColor> findByColor(String color);
}
