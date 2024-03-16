import { createSelector } from '@reduxjs/toolkit';
//AllProduct
export const getAllProducts = (state) => state?.allProducts?.products;
export const getCurrentPage = (state) => state?.allProducts?.currentPage;
export const getTotalProducts = (state) => state?.allProducts?.total;
export const getPerPage = (state) => state?.allProducts?.productPerpage;

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
export const getPageAllProduct = createSelector(
    getAllProducts,
    getCurrentPage,
    getPerPage,
    (allProducts, currentPage, productPerpage) => {
        const indexOfLastPage = currentPage * productPerpage;
        const indexofFirstPage = indexOfLastPage - productPerpage;
        const visibleTodos = allProducts.slice(indexofFirstPage, indexOfLastPage);

        return visibleTodos;
    },
);
