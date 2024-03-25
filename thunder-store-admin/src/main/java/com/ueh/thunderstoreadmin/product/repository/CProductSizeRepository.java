package com.ueh.thunderstoreadmin.product.repository;

import com.ueh.thunderstoreadmin.product.model.CProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author TuMy
 */
@Repository
public interface CProductSizeRepository extends JpaRepository<CProductSize,String> {
    Optional<CProductSize> findBySize(String size);
}
