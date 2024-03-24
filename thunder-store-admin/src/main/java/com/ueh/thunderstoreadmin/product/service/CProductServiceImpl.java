package com.ueh.thunderstoreadmin.product.service;

import com.ueh.thunderstoreadmin.common.dto.CPagingDTO;
import com.ueh.thunderstoreadmin.common.helper.PagingHelper;
import com.ueh.thunderstoreadmin.product.dto.*;
import com.ueh.thunderstoreadmin.product.mapper.CProductMapper;
import com.ueh.thunderstoreadmin.product.model.*;
import com.ueh.thunderstoreadmin.product.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author TuMy
 */
@Service
public class CProductServiceImpl implements CProductService {


    @Autowired
    private CProductRepository repository;

    @Autowired
    private CProductSizeRepository sizeRepository;

    @Autowired
    private CProductColorRepository colorRepository;

    @Autowired
    private CProductImageRepository imageRepository;

    @Autowired
    private CCategoryRepository categoryRepository;

    @Autowired
    private CCategoryService categoryService;

    @Override
    public List<CProductDTO> findAll() {
        return repository.findAll().stream().map(product -> buildProductDTO(product)).collect(Collectors.toList());
    }

    @Override
    public CPagingDTO findPage(int pageIndex, int pageSize, String orderBy) {
        Pageable pageable = PagingHelper.getPageable(pageIndex,pageSize,orderBy);
        Page<CProduct> productsPage = repository.findAllPaging(pageable);
        return searchingResultDTOBuilder(productsPage,pageSize,pageIndex);
    }

    @Override
    public CProductDTO create(CCreateProductDTO dto) {
        CProduct product = CProductMapper.INSTANCE.toEntity(dto);

        //Map tay những field list images,color,size
        mapProductPropertiesList(product, dto);

        CProduct newProduct = repository.save(product);
        return buildProductDTO(newProduct);
    }

    @Override
    public boolean delete(String productId) {
        try {
            repository.deleteById(productId);
        }catch (Exception e){
            return false;
        }
        return true;
    }

    @Override
    public CProductDTO update(String productId, CProductUpdateDTO updateDTO) {
        Optional<CProduct> productOpt = repository.findById(productId);
        if (productOpt.isEmpty())
            return null;
        CProduct product = productOpt.get();

        CProductMapper.INSTANCE.updateEntityFromDto(updateDTO, product);
        updateProductField(product,updateDTO);

        repository.save(product);
        return buildProductDTO(product);
    }
    private void updateProductField(CProduct product, CProductUpdateDTO updateDTO) {
        Set<CProductSize> sizesCopy = new HashSet<>(product.getSizes());
        Set<CProductColor> colorsCopy = new HashSet<>(product.getColors());
        Set<CProductImage> imagesCopy = new HashSet<>(product.getImages());
        Set<CCategory> categoriesCopy = new HashSet<>(product.getCategories());
//        removed size
        sizesCopy.stream()
                .filter(size -> !updateDTO.getSizes().contains(size.getId()))
                .forEach(size -> product.removeSize(size));
//        Add new size
        updateDTO.getSizes().stream()
                .filter(sizeId -> sizesCopy.stream().noneMatch(size -> size.getId().equals(sizeId)))
                .forEach(sizeId -> {
                    Optional<CProductSize> sizeOpt = sizeRepository.findById(sizeId);
                    sizeOpt.ifPresent(size -> product.addSize(size));
                });

        colorsCopy
                .stream()
                .filter(color -> !updateDTO.getColors().contains(color.getId()))
                .forEach(color -> product.removeColor(color));

        //        Add new color
        updateDTO.getColors().stream().
                filter(colorId -> colorsCopy.stream().noneMatch(color -> color.getId().equals(colorId)))
                .forEach(colorId -> {
                    Optional<CProductColor> colorOpt = colorRepository.findById(colorId);
                    colorOpt.ifPresent(color -> product.addColor(color));
                });

        imagesCopy.stream()
                .filter(image -> updateDTO.getImages()
                        .stream().noneMatch(imageDto -> imageDto.getId() != null && image.getId().equals(imageDto.getId())))
                .forEach(image -> product.removeImage(image));

        updateDTO.getImages()
                .stream()
                .filter(imageDto -> imageDto.getId() == null)
                .forEach(imageDto ->  product.addImage(CProductImage.builder().url(imageDto.getUrl()).build()));


        categoriesCopy
                .stream()
                .filter(category -> !updateDTO.getCategories().contains(category.getId()))
                .forEach(category -> product.removeCategory(category));

        updateDTO.getCategories().stream().filter(cateId -> categoriesCopy.stream().noneMatch(category -> category.getId().equals(cateId)))
                .forEach(cateId  -> {
                    Optional<CCategory> categoryOpt = categoryRepository.findById(cateId);
                    categoryOpt.ifPresent(category -> product.addCategories(category));
                });
    }

    @Override
    public boolean removeImage(String imageId) {
        try{
            imageRepository.deleteById(imageId);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public CProductDTO addImage(String productId, CProductImageDTO imageDTO) {
        Optional<CProduct> productOpt = repository.findById(productId);
        if (productOpt.isEmpty())
            return null;
        CProduct product = productOpt.get();
        product.addImage(CProductImage.builder().url(imageDTO.getUrl()).build());

        CProduct newProduct = repository.save(product);

        return buildProductDTO(newProduct);
    }



    private void mapProductPropertiesList(CProduct product, CCreateProductDTO dto) {
        product.setColors(new LinkedHashSet<>());
        product.setSizes(new LinkedHashSet<>());
        product.setImages(new LinkedHashSet<>());
        product.setCategories(new LinkedHashSet<>());

        dto.getImages().stream().forEach(image -> {
            product.addImage(CProductImage.builder().url(image).build());
        });

        dto.getColors().stream().forEach(colorId -> {
            Optional<CProductColor> colorOpt = colorRepository.findById(colorId);
            if(colorOpt.isPresent())
                product.addColor(colorOpt.get());
        });

        dto.getSizes().stream().forEach(sizeId -> {
            Optional<CProductSize> sizeOpt = sizeRepository.findById(sizeId);
            if (sizeOpt.isPresent())
                product.addSize(sizeOpt.get());
        });

        dto.getCategories().stream().forEach(cateId ->{
            Optional<CCategory> cateOpt = categoryRepository.findById(cateId);
            if(cateOpt.isPresent())
                product.addCategories(cateOpt.get());
        });

    }

    @Override
    public CPagingDTO searching(String keyword, int limit, String orderBy, int page) {
        String modifierKeyword = keyword.replace(" ","%");
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(orderBy));
        Page<CProduct> result = repository.searchProducts(modifierKeyword,pageable);

        return searchingResultDTOBuilder(result,limit,page);
    }

    @Override
    public CPagingDTO searchingFilter(String keyword, int limit, String orderBy, int page, CProductSearchFilterDTO filter) {
        String modifierKeyword = keyword.replace(" ","%");
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(orderBy));

        Set<String> colorIds = filter.getColorIds();
        Set<String> categoryIds = filter.getCategoryIds();
        if(colorIds.size() == 0 || colorIds.isEmpty())
            colorIds = getColors().stream().map(color -> color.getId()).collect(Collectors.toSet());

        if(categoryIds.size() == 0 ||  categoryIds.isEmpty())
            categoryIds = categoryService.findAll().stream().map(cate -> cate.getId()).collect(Collectors.toSet());
        if(filter.getMaxPrice().equals(BigDecimal.ZERO)){
            filter.setMaxPrice(BigDecimal.valueOf(1000000000));
        }
        Page<CProduct> result = repository.findByNameContainingAndAndColors_IdInAndCategories_IdInAndPriceBetween(modifierKeyword,colorIds,categoryIds,filter.getMinPrice(),filter.getMaxPrice(),pageable);

        return searchingResultDTOBuilder(result,limit,page);
    }

    @Override
    public List<CColorDTO> getColors() {
        return colorRepository.findAll().stream().map(color -> CProductMapper.INSTANCE.colorToColorDTO(color)).collect(Collectors.toList());
    }
    @Override
    public List<CSizeDTO> getSizes() {
        return sizeRepository.findAll().stream().map(size -> CProductMapper.INSTANCE.sizeToSizeDTO(size)).collect(Collectors.toList());
    }

    @Override
    public CPagingDTO findAllByCate(String cateId, int limit, String orderBy, int page) {
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by(orderBy));
        Page<CProduct> result = repository.findAllByCateId(cateId,pageable);
        return searchingResultDTOBuilder(result,limit,page);
    }

    public CPagingDTO searchingResultDTOBuilder(Page<CProduct> productPage, int limit, int page){
        List<CProductDTO> data = productPage.stream().map(item -> buildProductDTO(item)).collect(Collectors.toList());

        return CPagingDTO.builder()
                .data(data)
                .limit(limit)
                .page(page)
                .total(productPage.getTotalElements())
                .build();
    }

    public CProductDTO buildProductDTO(CProduct product){
        CProductDTO dto = CProductMapper.INSTANCE.toDto(product);
        dto.setTag(product.getCategories().stream().map(cate -> cate.getTag()).collect(Collectors.toList()));
        return dto ;

    }

}
