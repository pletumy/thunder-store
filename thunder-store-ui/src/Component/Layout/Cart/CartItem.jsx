import { RiDeleteBack2Fill } from 'react-icons/ri';
import { AiOutlineMinus, AiOutlinePlus, AiFillWarning } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { Wrap, QuantityBtn, Name, Price } from './ItemCart.style';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Select from 'react-select';
import {
    addItemToCartItemUserSelect,
    removeItemToCartItemUserSelect,
    updateNumberOfItemReview,
    updateTotalReview,
} from '~/redux/Slide/CartSlice';

import { updateCartItem, deleteCartItem } from '~/Apis/CartApi';

// Pop up
import Popup from 'reactjs-popup';
import { getCartId, getToken } from '~/redux/Selector/AuthSelector';
import httpRequest from '~/Apis/request';
import useAxiosJwt from '~/Component/Hook/useAxiosjwt';

function CartItem({ item, itemChecked }) {
    const dispatch = useDispatch();
    var { id, product, quantity, finalPrice, colorId, size } = item;
    const [isChecked, setIsChecked] = useState(itemChecked);
    const cartId = useSelector(getCartId);
    const { getAxiosJwt } = useAxiosJwt();

    const isItemInUserSelect = itemChecked;

    useEffect(() => {
        setIsChecked(isItemInUserSelect);
    }, [isItemInUserSelect]);

    const updateStore = () => {
        dispatch(updateNumberOfItemReview());
        dispatch(updateTotalReview());
    };
    const increaseQtt = () => {
        if (quantity < product.quantity) {
            const axiosJwt = getAxiosJwt();
            if (axiosJwt) {
                updateCartItem(
                    id,
                    {
                        quantity: ++quantity,
                        color: '',
                        size: '',
                    },
                    dispatch,
                    axiosJwt,
                );
            }
        }
    };
    const decreaseQtt = () => {
        if (quantity > 0) {
            const axiosJwt = getAxiosJwt();
            if (axiosJwt) {
                updateCartItem(
                    id,
                    {
                        quantity: --quantity,
                        color: '',
                        size: '',
                    },
                    dispatch,
                    axiosJwt,
                );
            }
        }
    };
    const handleChangeCartItem = (newSizeId) => {
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            updateCartItem(
                id,
                {
                    quantity: quantity,
                    color: '',
                    size: newSizeId,
                },
                dispatch,
                axiosJwt,
            );
        }
    };
    const handleChecked = () => {
        if (!isChecked) {
            dispatch(addItemToCartItemUserSelect(id));
        } else {
            dispatch(removeItemToCartItemUserSelect(id));
        }
        updateStore();
        setIsChecked(!isChecked);
    };

    const handleDelete = () => {
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            deleteCartItem(cartId, id, dispatch, axiosJwt);
        }
    };
    return (
        <Wrap className={`item ${isChecked && 'active'}`}>
            <p>
                <input type="checkbox" id={id} checked={isChecked} onChange={() => handleChecked()} />
                <label htmlFor={id}></label>
            </p>
            <Link to={`/details/${product.id}`} className="image">
                <img src={product?.images[0].url} alt="sanpham" />
            </Link>

            <Name>
                <Link to={`/details/${product.id}`}>{product.name}</Link>
            </Name>
            <div>
                <Select
                    name="size"
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 6,
                        colors: {
                            ...theme.colors,
                            primary25: 'var(--primary-color)',
                            primary: 'var(--primary-color)',
                        },
                    })}
                    placeholder="Chọn size"
                    defaultValue={() => {
                        const productSize = product.sizes.find((s) => s.id === size);
                        return productSize ? { value: productSize.id, label: productSize.size } : null;
                    }}
                    onChange={(selectedOption) => handleChangeCartItem(selectedOption.value)}
                    options={product.sizes.map((s) => ({ value: s.id, label: s.size }))}
                />
            </div>
            <QuantityBtn>
                <button onClick={() => increaseQtt()} className="btn plus-btn" type="button" name="button">
                    <AiOutlinePlus />
                </button>
                <p>{quantity} </p>
                <button onClick={() => decreaseQtt()} className="btn minus-btn" type="button" name="button">
                    <AiOutlineMinus />
                </button>
            </QuantityBtn>

            <Price>{Number(finalPrice).toLocaleString('en-US')} &#8363;</Price>

            <Popup
                trigger={
                    <button className="button">
                        <div className="delte-btn btn btn-s">
                            <RiDeleteBack2Fill />
                        </div>
                    </button>
                }
                modal
            >
                {(close) => (
                    <div className="modal">
                        <button className="modal_close" onClick={close}>
                            <FaTimes />
                        </button>
                        <div className="modal_header"> Xóa sản phẩm </div>
                        <div className="modal_content">
                            <AiFillWarning /> Bạn có chắc chắn muốn xóa sản phẩm này trong giỏ hàng của mình không.
                        </div>
                        <div className="modal_actions">
                            <button
                                onClick={() => {
                                    handleDelete();
                                    close();
                                }}
                                className="modal_button_action btn btn-error"
                            >
                                Xóa sản phẩm
                            </button>

                            <button
                                className="btn modal_button_action btn-cancel"
                                onClick={() => {
                                    close();
                                }}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                )}
            </Popup>
        </Wrap>
    );
}

export default CartItem;
