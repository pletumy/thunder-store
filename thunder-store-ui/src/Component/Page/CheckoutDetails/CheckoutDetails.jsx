/* eslint-disable react-hooks/exhaustive-deps */
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Container, Bill, Wrapper, Voucher, InforMain, Address, Error, FieldError } from './CheckoutDetails.style';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { defaultAddressSelector, getToken, getUserId, inforUserSelector } from '~/redux/Selector/AuthSelector';
import { getCartItemByUserSelect } from '~/redux/Selector/CartSelector';
import { AiOutlineWarning } from 'react-icons/ai';
import httpRequest from '~/Apis/request';
import { createOrderApi, getCheckoutDtoApi } from '~/Apis/OrderApi';
import { useEffect, useState } from 'react';
import { OrderItem } from '~/Component/Layout';
import Breadcrumbs from '~/Component/Layout/Breadcrumbs/Breadcrums';
import { BiLocationPlus } from 'react-icons/bi';
import ChangeAddress from '~/Component/Layout/Infor/ChangeAddress';
import useAxiosJwt from '~/Component/Hook/useAxiosjwt';
import { isLoading, isNotLoading } from '~/redux/Slide/LoadingSlice';

const paymentMethodList = [
    { value: 'PAY_ONLINE', label: 'Thanh toán trực tuyến' },
    { value: 'PAY_ON_DELIVERY', label: 'Thanh toán khi nhận hàng' },
    { value: 'PAY_VIA_PAYPAl', label: 'Thanh toán qua paypal' },
];

const validationSchema = yup.object({
    paymentMethod: yup.string().required('Chọn phương thức thanh toán.'),
    phone: yup.string().required('Hãy điền số điện thoại'),
});

function CheckoutDetails() {
    const { getAxiosJwt, dispatch, navigate } = useAxiosJwt();
    const items = useSelector(getCartItemByUserSelect);
    const userId = useSelector(getUserId);
    const currentUser = useSelector(inforUserSelector);
    const defaultAddress = useSelector(defaultAddressSelector);

    const [checkoutDto, setCheckoutDto] = useState();

    const fetchCheckoutDto = async () => {
        if (items != null) {
            const axiosJwt = getAxiosJwt();
            if (axiosJwt) {
                dispatch(isLoading());
                const res = await getCheckoutDtoApi(userId, { cartItemIdList: items.map((i) => i.id) }, axiosJwt);
                dispatch(isNotLoading());
                if (res !== null) setCheckoutDto(res);
            }
        }
    };

    useEffect(() => {
        fetchCheckoutDto();
    }, []);

    const handleSubmit = (values) => {
        const data = {
            ...checkoutDto,
            address: `${defaultAddress.address} , ${defaultAddress.ward}, ${defaultAddress.district}, ${defaultAddress.city}`,
            paymentMethod: values.paymentMethod,
            phone: values.phone,
        };
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            createOrderApi(userId, data, navigate, dispatch, axiosJwt);
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            paymentMethod: null,
            address:
                defaultAddress !== null
                    ? `${defaultAddress.address} , ${defaultAddress.ward}, ${defaultAddress.district}, ${defaultAddress.city}`
                    : '',
            phone: currentUser.phone || '',
        },
        validateOnBlur: true,
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
    });

    return (
        <div className="container">
            <Breadcrumbs />
            {checkoutDto && (
                <Container onSubmit={formik.handleSubmit}>
                    <InforMain>
                        <strong>
                            <BiLocationPlus /> Địa chỉ nhận hàng
                        </strong>
                        <Address>
                            <div>
                                <div>
                                    <strong>Tên:</strong> {currentUser?.displayName}
                                </div>
                                <div>
                                    <strong>Số điện hoại:</strong>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formik.values.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.phone && formik.errors.phone ? (
                                        <FieldError>
                                            <AiOutlineWarning /> {formik.errors.phone}
                                        </FieldError>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                {defaultAddress !== null ? (
                                    <>
                                        <div>
                                            <strong>Địa chỉ:</strong> {defaultAddress.address} , {defaultAddress.ward},
                                            {defaultAddress.district}, {defaultAddress.city}
                                            <span className="tag primary">Mặc định</span>
                                        </div>
                                    </>
                                ) : (
                                    <Error>
                                        <AiOutlineWarning />
                                        Bạn chưa có địa chỉ hãy thêm địa chỉ mới.
                                    </Error>
                                )}
                            </div>
                            <ChangeAddress />
                        </Address>
                    </InforMain>

                    <Wrapper>
                        <OrderItem items={checkoutDto.items} />

                        <Bill>
                            <Voucher>
                                <label htmlFor="discount">Nhập mã giảm giá</label>
                                <div className="discount">
                                    <input id="discount" type="text" placeholder="Nhập mã giảm giá của bạn" />
                                    <button type="button" className="btn btn-primary">
                                        Áp dụng
                                    </button>
                                </div>
                                <div className="method">
                                    <label htmlFor="select">Thanh Toán Khi Nhận Hàng</label>
                                    <Select
                                        id="select"
                                        name="paymentMethod"
                                        theme={(theme) => ({
                                            ...theme,
                                            borderRadius: 6,
                                            colors: {
                                                ...theme.colors,
                                                primary25: 'var(--primary-color)',
                                                primary: 'var(--primary-color)',
                                            },
                                        })}
                                        placeholder="Chọn phương thức thanh toán"
                                        options={paymentMethodList}
                                        onChange={(selectedOption) =>
                                            formik.setFieldValue('paymentMethod', selectedOption.value)
                                        }
                                        onBlur={() => formik.setFieldTouched('paymentMethod', true)}
                                    />
                                    {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
                                        <p className="error-message">
                                            <AiOutlineWarning /> {formik.errors.paymentMethod}
                                        </p>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </Voucher>
                            <p className="heading-s">Hóa đơn của bạn</p>
                            <div className="row">
                                <div className="heading">Sản phẩm </div>
                                <div className="heading"> Giá</div>
                            </div>

                            <span className="line"></span>
                            {checkoutDto.items.map((item) => (
                                <div className="row" key={item.id}>
                                    <p className="name">
                                        {item.product.name} {item.product.sizes.find((s) => s.id === item.size)?.size}
                                        &#215;
                                        {item.quantity}
                                    </p>
                                    <p className="price">
                                        <span style={{ textDecoration: 'line-through' }}>
                                            {Number(item.originalPrice).toLocaleString('en-US')} &#8363;
                                        </span>
                                        {Number(item.finalPrice).toLocaleString('en-US')} &#8363;
                                    </p>
                                </div>
                            ))}
                            <div className="row">
                                <span>Phí ship</span>
                                <span>{checkoutDto.shippingCost} &#8363;</span>
                            </div>
                            <div className="row">
                                <span>Tiết kiệm</span>
                                <span>
                                    {(Number(checkoutDto.total) - Number(checkoutDto.finalTotal)).toLocaleString(
                                        'en-US',
                                    )}
                                    &#8363;
                                </span>
                            </div>
                            <span className="line"></span>

                            <div className="row">
                                <strong>Tổng ({checkoutDto.numOfProduct} Sản phẩm)</strong>
                                <div className="price">
                                    {Number(checkoutDto.finalTotal).toLocaleString('en-US')} &#8363;
                                </div>
                            </div>
                            <span className="text">Đồng ý với với các điều khoản và điều kiện của website</span>
                            <button type="submit" className="btn btn-primary btn-full" disabled={!formik.isValid}>
                                Đặt hàng ngay
                            </button>
                            <span className="text">
                                Thông tin của bạn sẽ được sử dụng để xử lý đơn hàng không lưu trữ với mục đích khác.Tìm
                                hiểu thêm ở <a href="#!"> Chính sách riêng tư</a>
                            </span>
                        </Bill>
                    </Wrapper>
                </Container>
            )}
        </div>
    );
}

export default CheckoutDetails;
