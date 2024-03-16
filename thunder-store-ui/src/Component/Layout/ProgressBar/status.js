export const orderDetailsStatus = [
    {
        value: 'NOT_READY',
        label: 'Chờ xác nhận',
        step: 0,
    },
    {
        value: 'PREPARING_ORDER',
        label: 'Đang chuẩn bị đơn hàng',
        step: 1,
    },
    {
        value: 'DELIVERING',
        label: 'Đang giao hàng',
        step: 2,
    },
    {
        value: 'SUCCESS',
        label: 'Giao hàng thành công',
        step: 3,
    },
];

export const orderDetailsStep = (step) => {
    const current = orderDetailsStatus.find((order) => order.value === step);
    return current ? current.step : 0;
};
export const getCurrentStepValue = (step) => {
    const current = orderDetailsStatus.find((order) => order.step === step);
    console.log('current step value: ', current.value);
    return current.value;
};
