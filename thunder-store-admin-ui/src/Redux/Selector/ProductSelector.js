import { createSelector } from '@reduxjs/toolkit';

export const getProducts = (state) => state?.product?.products;

export const getProductById = (id) => {
    return createSelector(getProducts, (product) => {
        return product.find((item) => item.id === id);
    });
};

export const getCategories = (state) => state.categories.categories;

export const getSectionsProduct = (tag) => {
    return createSelector(getCategories, getAllProducts, (categories, products) => {
        const cate = categories.find((cate) => cate.tag === tag);

        if (cate) {
            return products.filter((product) => product.tag.includes(cate.tag));
        }
        return [];
    });
};
export const getCategoryByTag = (tag) => {
    return createSelector(getCategories, (categories) => {
        const topProductCate = categories.find((cate) => cate.tag === tag);
        if (topProductCate) return topProductCate;
    });
};
