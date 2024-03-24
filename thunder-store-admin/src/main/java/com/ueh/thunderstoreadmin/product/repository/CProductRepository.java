package com.ueh.thunderstoreadmin.product.repository;

import com.ueh.thunderstoreadmin.product.model.CProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.Set;

/**
 * @author TuMy
 */
public interface CProductRepository extends JpaRepository<CProduct,String> {
    @Query("SELECT p FROM CProduct p")
    Page<CProduct> findAllPaging(Pageable pageable);
    Optional<CProduct> findByName(String name);
    @Query("SELECT p FROM CProduct p WHERE p.name LIKE CONCAT('%',?1, '%') Or p.description LIKE CONCAT('%', ?1, '%')")
    Page<CProduct> searchProducts(String modifierKeyword, Pageable pageable);

    //filter all
    Page<CProduct> findByNameContainingAndAndColors_IdInAndCategories_IdInAndPriceBetween(
            String name,
            Set<String> colorIds,
            Set<String> categoryIds,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Pageable pageable);

    @Query("SELECT p FROM CProduct p LEFT JOIN p.categories c where c.id = ?1")
    Page<CProduct> findAllByCateId(String cateId,Pageable pageable);
}
