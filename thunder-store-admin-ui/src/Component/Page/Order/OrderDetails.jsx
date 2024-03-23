import { Avatar, Button, Card, Image, Select, Space, Steps, Table } from 'antd';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Breadcrumb } from '~/Component/Layout';
import {
    getCurrentStepValute,
    getOrderStatusLabel,
    orderDetailsLabel,
    orderDetailsStep,
    orderStatus,
    statusTagStyled,
} from './comom';
import { SaveOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import httpRequest from '~/Api';
import { getOrderById, udpateOrder } from '~/Api/OrderApi';
import TextArea from 'antd/es/input/TextArea';
import useAxiosJwt from '~/Hook/useAxiosJwt';
const { Text } = Typography;
const itemsColumn = [
    {
        title: 'Image',
        dataIndex: 'images',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Color',
        dataIndex: 'color',
    },
    {
        title: 'Size',
        dataIndex: 'size',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
    },
    {
        title: 'Total',
        dataIndex: 'total',
    },
];

const QuickView = styled.div`
    display: flex;
    gap: 0 10px;
    padding: 5px 20px;
    color: var(--gray-color);
    border-bottom: 1px solid var(--gray-color);
    border-top: 1px solid var(--gray-color);
    margin-bottom: 20px;
    & span {
        font-weight: 600;
        color: var(--black-color);
    }
`;
const Wrap = styled.div`
    display: flex;
    flex-flow: wrap;
    gap: 15px;
`;
const Item = styled.div`
    background-color: var(--white-color);
    padding: 10px 16px;
    border-radius: 6px;
    flex: 1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    &.info {
        min-width: max-content;
        background-color: transparent;
    }
`;
const Bill = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    background-color: var(--white-color);
    padding: 20px;
    border-radius: 6px;
    & .row {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        gap: 0 40px;
    }
    & .text {
        display: block;
        margin-top: 20px;
        color: var(--gray-color);
        font-size: 1.4rem;
        & a {
            display: inline;
            color: var(--primary-color);
        }
    }
    & .line {
        margin: 10px 0;
        display: block;
        width: 100%;
        height: 1px;
        background-color: var(--primary-color);
    }
    & .wrap {
        max-width: max-content;
    }
`;
const CardStyled = styled(Card)`
    flex: 1;
    min-width: 200px;
`;

const InputStyled = styled.input`
    color: var(--text-color);
    width: 100%;
    height: 100%;
    word-wrap: break-word;
    word-break: break-word;
`;
function OrderDetails() {
    const { id } = useParams();
    const { getAxiosJwt, dispatch } = useAxiosJwt();

    const [step, setStep] = useState(0);
    const [status, setStatus] = useState();

    const [order, setOrder] = useState({
        user: { displayName: '', phone: '', email: '' },
        orderDetails: {
            address: '',
            numOfProduct: 0,
            orderDate: '',
            orderItems: [],
            orderStatus: '',
            paymentMethod: '',
            shippingCost: 0,
            total: 0,
        },
        status: '',
    });

    const fetchOrder = async (id) => {
        if (id) {
            const axiosJwt = getAxiosJwt();
            if (axiosJwt) {
                const orderOtp = await getOrderById(id, dispatch, axiosJwt);
                if (orderOtp !== null) {
                    setOrder(orderOtp);
                    setStatus(getOrderStatusLabel(orderOtp.status));
                    setStep(orderDetailsStep(orderOtp.orderDetails.orderDetailsStatus));
                }
            }
        }
    };

    useEffect(() => {
        fetchOrder(id);
    }, [id]);

    const orderItemsTable = order.orderDetails?.orderItems.map((orderItem) => ({
        ...orderItem.product,
        key: orderItem.product.id,
        color: orderItem.color != null ? orderItem.color : '',
        size: orderItem.size !== null ? orderItem.size : '',
        quantity: orderItem.quantity,
        total: <>{Number(orderItem.total).toLocaleString('en-US')} &#8363;</>,
        images: <Image width={60} height={60} src={orderItem.product.images[0].url} />,
    }));

    const handleChangeStep = (value) => {
        setStep(value);
    };

    const handleSaveAll = () => {
        const updateDto = {
            orderDetails: { ...order.orderDetails, orderDetailsStatus: getCurrentStepValute(step) },
            status: status.value,
        };

        const axiosToken = getAxiosJwt();
        udpateOrder(order.id, updateDto, dispatch, axiosToken);
    };
    const handleCancel = () => {
        setStep(orderDetailsStep(order.orderDetails.orderDetailsStatus));
        setStatus(order.status);
    };

    const onChangeUser = (e) => {
        const { name, value } = e.target;
        setOrder((prev) => ({ ...prev, user: { ...prev.user, [name]: value } }));
    };
    const onChangeDetails = (e) => {
        const { name, value } = e.target;
        setOrder((prev) => ({ ...prev, orderDetails: { ...prev.orderDetails, [name]: value } }));
    };

    console.log(order);
    return (
        <>
            <Breadcrumb />
            {order !== null && (
                <>
                    <p className="heading">Order</p>
                    <QuickView>
                        <div>
                            <span>Time</span>
                            {moment(order.orderDetails?.orderDate).format(' HH:mm [-] DD/MM/YYYY')}
                        </div>
                        <div>
                            <span>Quantity</span> {order.orderDetails.numOfProduct}
                        </div>
                        <div>
                            <span>Total</span> {Number(order.orderDetails.finalTotal).toLocaleString('en-US')} &#8363;
                        </div>
                        <div>
                            <span>Status</span> {statusTagStyled(order?.status)}
                        </div>
                    </QuickView>

                    <Wrap>
                        {order.user && (
                            <Wrap>
                                <CardStyled size="small" title="Customer">
                                    <Avatar
                                        style={{
                                            verticalAlign: 'middle',
                                        }}
                                        size={80}
                                    >
                                        {order.user?.displayName}
                                    </Avatar>
                                    <p>
                                        Username:
                                        <InputStyled
                                            type="text"
                                            name="displayName"
                                            value={order.user.displayName}
                                            onChange={(e) => onChangeUser(e)}
                                        />
                                    </p>
                                </CardStyled>
                                <CardStyled size="small" title="Contact">
                                    <p>
                                        Phone:
                                        <InputStyled
                                            type="text"
                                            name="phone"
                                            value={order.user.phone || 'Null'}
                                            onChange={(e) => onChangeUser(e)}
                                        />
                                    </p>
                                    <p>
                                        Email:
                                        <InputStyled
                                            type="text"
                                            name="email"
                                            value={order.user.email}
                                            onChange={(e) => onChangeUser(e)}
                                        />
                                    </p>
                                </CardStyled>

                                <CardStyled size="small" title="Shipping Address">
                                    <p>
                                        Address:
                                        <InputStyled
                                            type="text"
                                            name="address"
                                            value={order.orderDetails?.address}
                                            onChange={(e) => onChangeDetails(e)}
                                        />
                                    </p>
                                </CardStyled>
                                <CardStyled size="small" title="Order Status">
                                    <Text strong>Thay đổi trạng thái hiện tại.</Text>
                                    <Select
                                        value={status}
                                        onChange={(value) => setStatus(getOrderStatusLabel(value))}
                                        style={{
                                            width: '100%',
                                            marginTop: 10,
                                        }}
                                        options={orderStatus}
                                    />
                                </CardStyled>
                            </Wrap>
                        )}
                        <Item>
                            <p className="heading-s">Items</p>
                            <Table columns={itemsColumn} dataSource={orderItemsTable} pagination={false} />
                            <Bill>
                                <div className="wrap">
                                    <div className="row">
                                        <span>Phí ship</span>
                                        <span>
                                            {Number(order.orderDetails?.shippingCost).toLocaleString('en-US')} &#8363;
                                        </span>
                                    </div>
                                    <div className="row">
                                        <strong>Tổng ({order.orderDetails?.numOfProduct} Sản phẩm)</strong>
                                        <div className="price">
                                            {Number(order.orderDetails?.finalTotal).toLocaleString('en-US')} &#8363;
                                        </div>
                                    </div>
                                    <div className="row">
                                        <strong>Phương thức thanh toán</strong>
                                        {order.orderDetails?.paymentMethod}
                                    </div>
                                </div>
                            </Bill>
                            <p className="heading-s">Tracking Details Order</p>
                            <Steps
                                status={status?.value === 'CANCEL' ? 'error' : 'process'}
                                onChange={handleChangeStep}
                                labelPlacement="vertical"
                                current={step}
                                style={{ padding: '20px 50px' }}
                                items={orderDetailsLabel()}
                            />

                            <p className="heading-s">Note</p>
                            <TextArea rows={3} placeholder="Note" />

                            <Space direction="horizontal" style={{ padding: '30px 0', gap: 15 }}>
                                <Button type="primary" onClick={handleSaveAll} icon={<SaveOutlined />} size="large">
                                    Save Changes
                                </Button>
                                <Button onClick={handleCancel} icon={<SaveOutlined />} size="large">
                                    Cancel
                                </Button>
                            </Space>
                        </Item>
                    </Wrap>
                </>
            )}
        </>
    );
}

export default OrderDetails;
