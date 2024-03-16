/* eslint-disable react-hooks/exhaustive-deps */
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

import { UserContainer, Cart, User, CartQuantiy, CartReview, CartReviewItem, AnoQuantity } from './header.style';
import { TiShoppingCart, TiDocumentText } from 'react-icons/ti';
import { FaRegUser } from 'react-icons/fa';
import { AiOutlineHeart, AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector, isLogin } from '~/redux/Selector/AuthSelector';
import Tippy from '@tippyjs/react';
import { logout } from '~/Apis/AuthApi';
import { getCartItem, getNumberOfAllItem } from '~/redux/Selector/CartSelector';
import { getNumOfOrder } from '~/redux/Selector/OrderSelector';
import { DropdownStyled } from '~/Component/GlobalStyle/component/dropdown.style';

function UserSection({ children }) {
    const isLoginState = useSelector(isLogin);
    const userDetails = useSelector(currentUserSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const numberOfItem = useSelector(getNumberOfAllItem);
    const items = useSelector(getCartItem);
    const numberOfOrder = useSelector(getNumOfOrder);

    const handleLogout = () => {
        logout(dispatch, navigate);
    };
    return (
        <UserContainer className="align-center-flex">
            {children}
            <div>
                <Link to={isLoginState ? '/favorite' : '/auth/login'}>
                    <span className="icon hover-primary">
                        <AiOutlineHeart size={28} />
                    </span>
                </Link>
            </div>
            <Cart>
                <Tippy
                    content={
                        <>
                            <CartReview>
                                {isLoginState ? (
                                    <>
                                        {items.map((item) => (
                                            <CartReviewItem to={`/details/${item.id}`} key={item.id}>
                                                <div className="img">
                                                    <img src={item.product.images[0].url} alt={item.id} />
                                                </div>
                                                <p className="name">
                                                    {item.product.name} x {item.quantity}
                                                </p>
                                                <p className="price">
                                                    {Number(item.finalPrice).toLocaleString('en-US')} VND
                                                </p>
                                            </CartReviewItem>
                                        ))}
                                        {items == 0 && <img width={200} height={500} src="/empty-cart.png" />}

                                        {items == 0 ? (
                                            <p>Tiếp tục mua sắm</p>
                                        ) : (
                                            <Link
                                                style={{ margin: '0 16px' }}
                                                className="btn btn-primary w-full"
                                                to="/my-cart"
                                            >
                                                Giỏ hàng của tôi
                                            </Link>
                                        )}
                                    </>
                                ) : (
                                    <Link to="/auth/login" className="btn">
                                        Đăng nhập ngay
                                    </Link>
                                )}
                            </CartReview>
                        </>
                    }
                    theme="light"
                    animation="fade"
                    arrow={true}
                    trigger="mouseenter"
                    interactive={true}
                    placement="bottom"
                    maxWidth="auto"
                >
                    <Link to={isLoginState ? '/my-cart' : '/auth/login'}>
                        <span className="icon hover-primary">
                            <AiOutlineShoppingCart size={28} />
                        </span>
                        {isLoginState && numberOfItem !== 0 && <CartQuantiy>{numberOfItem}</CartQuantiy>}
                    </Link>
                </Tippy>
            </Cart>

            <section className="align-center-flex">
                {isLoginState ? (
                    <Tippy
                        content={
                            <DropdownStyled>
                                <Link to="/profile">
                                    <FaRegUser /> Thông tin cá nhân
                                </Link>
                                <Link to="/my-order" style={{ position: 'relative' }}>
                                    <TiDocumentText />
                                    Đơn hàng của tôi
                                    {numberOfOrder > 0 && <AnoQuantity>{numberOfOrder}</AnoQuantity>}
                                </Link>
                                <Link to="/my-cart">
                                    <TiShoppingCart /> Giỏ hàng của tôi
                                </Link>
                                <div onClick={handleLogout}>
                                    <AiOutlineLogout />
                                    Đăng xuất
                                </div>
                            </DropdownStyled>
                        }
                        theme="light"
                        animation="fade"
                        arrow={true}
                        trigger="mouseenter"
                        interactive={true}
                        placement="bottom"
                    >
                        <User htmlFor="user-dropdown">
                            <span className="icon">
                                <FaRegUser />
                            </span>
                            {userDetails?.displayName}
                        </User>
                    </Tippy>
                ) : (
                    <div className="align-center-flex black-color gap-5">
                        <Link to="/auth/login" className="line-hover line-hover-black">
                            Đăng nhập
                        </Link>
                        /
                        <Link to="/auth/signup" className="line-hover line-hover-black">
                            Đăng ký
                        </Link>
                    </div>
                )}
            </section>
        </UserContainer>
    );
}

export default UserSection;
