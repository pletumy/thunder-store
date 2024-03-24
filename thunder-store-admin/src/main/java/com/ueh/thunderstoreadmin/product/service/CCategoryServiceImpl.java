package com.ueh.thunderstoreadmin.product.service;

import com.ueh.thunderstoreadmin.product.dto.CCategoryDTO;
import com.ueh.thunderstoreadmin.product.mapper.CCategoryMapper;
import com.ueh.thunderstoreadmin.product.model.CCategory;
import com.ueh.thunderstoreadmin.product.model.CProduct;
import com.ueh.thunderstoreadmin.product.repository.CCategoryRepository;
import com.ueh.thunderstoreadmin.product.repository.CProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author TuMy
 */
@Service
public class CCategoryServiceImpl implements CCategoryService {
    @Autowired
    private CCategoryRepository repository;

    @Autowired
    private CProductRepository productRepository;

    @Override
    public List<CCategoryDTO> findAll() {
        List<CCategory> categories = repository.findAll();
        return categories.stream().map(cate -> CCategoryMapper.INSTANCE.toDto(cate)).collect(Collectors.toList());
    }

    @Override
    public CCategoryDTO save(CCategoryDTO dto) {
        CCategory category = CCategoryMapper.INSTANCE.toEntity(dto);
        CCategory newCategory = repository.save(category);

        return CCategoryMapper.INSTANCE.toDto(newCategory);
    }

    @Override
    public boolean delete(String categoryId) {
        try{
            repository.deleteById(categoryId);
        }catch (Exception e){
            return false;
        }
        return true;
    }

    @Override
    public CCategoryDTO update(String id, CCategoryDTO dto) {
        Optional<CCategory> categoryOpt = repository.findById(id);
        if(categoryOpt.isEmpty())
            return null;
        CCategory currentCate = categoryOpt.get();

        if(!currentCate.getName().equals(dto.getName())) {
            Optional<CCategory> existedCate = repository.findByName(dto.getName());
            if(existedCate.isPresent())
                return null;
        }
        CCategory newCate = CCategoryMapper.INSTANCE.updateEntityFromDto(dto, currentCate);
        repository.save(newCate);
        return CCategoryMapper.INSTANCE.toDto(newCate);
    }


    @Override
    public boolean addProductListById(String categoryId, List<String> productIds) {
        Optional<CCategory> categoryOpt = repository.findById(categoryId);
        CCategory category = categoryOpt.get();

        productIds.stream().forEach(id -> {
            Optional<CProduct> productOpt = productRepository.findById(id);
            if(productOpt.isPresent())
                category.addProduct(productOpt.get());
        });

        repository.save(category);
        return true;
    }

    @Override
    public boolean removeProduct(String categoryId, String productId) {
        Optional<CProduct> productOpt;
        Optional<CCategory> categoryOpt;
        try {
            categoryOpt = repository.findById(categoryId);
            productOpt = productRepository.findById(productId);
        }catch(Exception e) {
            return false;
        }
        if(productOpt.isEmpty() || categoryOpt.isEmpty())
            return false;
        CCategory category = categoryOpt.get();
        category.removeProduct(productOpt.get());
        repository.save(category);

        return true;
    }
}
