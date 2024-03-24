package com.ueh.thunderstoreadmin.product.service;

import com.ueh.thunderstoreadmin.product.dto.CCategoryDTO;

import java.util.List;

/**
 * @author TuMy
 */
public interface CCategoryService {
    List<CCategoryDTO> findAll();

    CCategoryDTO save(CCategoryDTO dto);
    boolean delete(String categoryId);

    CCategoryDTO update(String id,CCategoryDTO dto);

    boolean addProductListById(String categoryId, List<String> productId);

    boolean removeProduct(String categoryId, String productId);
}
