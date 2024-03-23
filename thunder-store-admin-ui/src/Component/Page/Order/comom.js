import { Tag } from 'antd';
import { BsBoxSeam } from 'react-icons/bs';
import { HiOutlineInboxIn } from 'react-icons/hi';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { PiNewspaperClipping } from 'react-icons/pi';

export const orderStatus = [
    {
        value: 'AWAITING',
        label: 'Chờ xác nhận (AWAITING)',
        color: '#f1c40f',
    },
    {
        value: 'PENDING',
        label: 'Đang diễn ra (PENDING)',
        color: '#3498db',
    },
    {
        value: 'CANCEL',
        label: 'Hủy (CANCEL)',
        color: '#e74c3c',
    },
    {
        value: 'SUCCESS',
        label: 'Thành công (SUCCESS)',
        color: '#87d068',
    },
];
export const orderDetailsStatus = [
    {
        value: 'NOT_READY',
        label: 'Chờ xác nhận',
        step: 0,
        icon: <PiNewspaperClipping />,
    },
    {
        value: 'PREPARING_ORDER',
        label: 'Đang chuẩn bị đơn hàng',
        step: 1,
        icon: <BsBoxSeam />,
    },
    {
        value: 'DELIVERING',
        label: 'Đang giao hàng',
        step: 2,
        icon: <MdOutlineDeliveryDining />,
    },
    {
        value: 'SUCCESS',
        label: 'Giao hàng thành công',
        step: 3,
        icon: <HiOutlineInboxIn />,
    },
];
export const statusTagStyled = (status) => {
    const order = orderStatus.find((order) => order.value === status);
    return <Tag color={order ? order.color : 'gray'}>{status ? status.toUpperCase() : status}</Tag>;
};

export const getOrderStatusLabel = (status) => {
    const order = orderStatus.find((order) => order.value === status);
    return order ? order : '';
};

export const orderDetailsLabel = () => {
    return orderDetailsStatus.map((order) => ({ title: order.label, icon: order.icon }));
};
export const orderDetailsStep = (step) => {
    const current = orderDetailsStatus.find((order) => order.value === step);
    return current ? current.step : 0;
};
export const getCurrentStepValute = (step) => {
    const current = orderDetailsStatus.find((order) => order.step === step);
    console.log('current step value: ', current.value);
    return current.value;
};
