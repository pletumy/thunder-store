package com.ueh.thunderstoreadmin.product.repository;

import com.ueh.thunderstoreadmin.product.model.CProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author TuMy
 */
@Repository
public interface CProductImageRepository extends JpaRepository<CProductImage,String> {
}
