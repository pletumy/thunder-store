package com.ueh.thunderstoreadmin.product.repository;

import com.ueh.thunderstoreadmin.product.model.CProductSize;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author TuMy
 */
public interface CProductSizeRepository extends JpaRepository<CProductSize,String> {
    Optional<CProductSize> findBySize(String size);
}
