import { useSelector } from 'react-redux';
import { OrderItem, ProgressBar } from '~/Component/Layout';
import { getOrders } from '~/redux/Selector/OrderSelector';
import { Wrap, WrapItem, Actions, Details } from './MyOrder.style';
import Button from '~/Component/Layout/Button';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { IoIosMore } from 'react-icons/io';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import { DropdownStyled } from '~/Component/GlobalStyle/component/dropdown.style';
import { MdOutlineAutoDelete } from 'react-icons/md';

function MyOrder() {
    const orders = useSelector(getOrders);

    return (
        <>
            <Wrap>
                {orders.length <= 0 ? (
                    <div>
                        Bạn chưa có đơn hàng nào. <Link to="/"> Mua sắm ngay</Link>
                    </div>
                ) : (
                    orders?.map((order) => (
                        <WrapItem key={order.id}>
                            <Actions>
                                <Tippy
                                    content={
                                        <>
                                            <DropdownStyled>
                                                <Link to="/sdsd">
                                                    <MdOutlineAutoDelete /> Hủy đơn hàng
                                                </Link>
                                            </DropdownStyled>
                                        </>
                                    }
                                    theme="light"
                                    animation="fade"
                                    arrow={true}
                                    trigger="mouseenter"
                                    interactive={true}
                                    placement="bottom"
                                >
                                    <button>
                                        <IoIosMore />
                                    </button>
                                </Tippy>
                            </Actions>
                            <OrderItem items={order?.orderDetails?.orderItems} />
                            <Details>
                                <p>Mã đơn hàng: {order?.id}</p>
                                <p>
                                    Thời gian đặt hàng:
                                    {moment(order?.orderDetails?.orderDate).format('HH:mm [ngày] DD/MM/YYYY')}
                                </p>
                                <p>
                                    Tổng đơn hàng:
                                    <span className="primary-color">
                                        {Number(order?.orderDetails?.finalTotal).toLocaleString('en-US')} &#8363;
                                    </span>
                                </p>
                            </Details>
                            <ProgressBar order={order} />
                            <Actions>
                                {order.orderStatus === 'SUCCESS' ? (
                                    <Button className="btn btn-primary">Xác nhận đã nhận hàng</Button>
                                ) : (
                                    ''
                                )}
                            </Actions>
                        </WrapItem>
                    ))
                )}
            </Wrap>
        </>
    );
}

export default MyOrder;
