import { Link } from 'react-router-dom';
import { Description, ProductImg, ProductImgWrap, ButtonGroup, Sale } from './Product.style';
import { AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { HiOutlineShoppingBag, HiSearch } from 'react-icons/hi';
import { useSelector } from 'react-redux';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { getCartId, getUserId } from '~/redux/Selector/AuthSelector';
import { addProductToCart } from '~/Apis/CartApi';
import useAxiosJwt from '~/Component/Hook/useAxiosjwt';

function ProductCard({ product }) {
    const { getAxiosJwt, dispatch, navigate } = useAxiosJwt();
    const userId = useSelector(getUserId);
    const cartId = useSelector(getCartId);

    const addProductToCartHandle = (e, productId) => {
        e.preventDefault();
        if (!userId) return navigate('/auth/login');

        const data = {
            cartId: cartId,
            productId: productId,
            quantity: 1,
            colorId: product.colors[0].id,
            sizeId: product.sizes[0].id,
        };
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) addProductToCart(data, dispatch, axiosJwt);
    };

    return (
        <>
            <Link to={`/details/${product.id}`} key={product.id} className="item">
                <ProductImgWrap>
                    <ProductImg>
                        <img src={product.images[0].url} alt="product" />
                    </ProductImg>
                    <div className="d-flex c-flex">
                        <Tippy content="Thêm vào giỏ hàng">
                            <button className="icon add-to-cart" onClick={(e) => addProductToCartHandle(e, product.id)}>
                                <HiOutlineShoppingBag size={20} />
                                <span>Thêm vào giỏ hàng</span>
                            </button>
                        </Tippy>
                    </div>
                    <ButtonGroup>
                        <Tippy content="Tìm kiếm" allowHTML={false} placement="left">
                            <button className="search icon">
                                <HiSearch />
                            </button>
                        </Tippy>
                        <Tippy content="Thích sản phẩm" allowHTML={false} placement="left">
                            <button className="like icon">
                                <AiOutlineHeart />
                            </button>
                        </Tippy>
                    </ButtonGroup>
                    {product.discount > 0 && <Sale>- {product.discount}%</Sale>}
                </ProductImgWrap>
                <Description className="description">
                    <span className="title">{product?.title}</span>
                    <p className="name">{product?.name}</p>
                    <div className="star">
                        <AiOutlineStar />
                        <AiOutlineStar />
                        <AiOutlineStar />
                        <AiOutlineStar />
                        <AiOutlineStar />
                    </div>
                    <p className="price">{Number(product.price).toLocaleString('en-US')}VND</p>
                </Description>
            </Link>
        </>
    );
}

export default ProductCard;
