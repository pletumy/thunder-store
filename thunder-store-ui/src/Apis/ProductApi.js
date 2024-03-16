import { getProductsSuccess } from '../redux/Slide/AllProductSlice';
import { request } from '../Untils/request';

const getAllProduct = async (dispatch) => {
    try {
        const response = await request.get('products');
        console.log(response.data.content);
        dispatch(getProductsSuccess(response.data.content));
    } catch (error) {
        console.log(error);
    }
};

export const getColors = async () => {
    try {
        const response = await request.get('products/colors ');
        return response.data.content;
    } catch (error) {
        return null;
    }
};

export default getAllProduct;
