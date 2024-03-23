package com.ueh.thunderstoreadmin.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author TuMy
 */
public interface CCategoryRepository  extends JpaRepository<CCategory,String> {
    Optional<CCategory> findByName(String name);
}