/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Dropdown, Space, Table } from 'antd';
import { Typography } from 'antd';
import { EyeOutlined, MoreOutlined, PrinterOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '~/Component/Layout';
import { setOrders } from '~/Redux/Slide/OrderSlide';
import { statusTagStyled } from './comom';
import Search from 'antd/es/input/Search';
import useAxiosJwt from '~/Hook/useAxiosJwt';
const { Text } = Typography;

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
    },
    {
        title: 'Customer',
        dataIndex: 'customer',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        render: (date) => moment(date).format('HH:mm [-] DD/MM/YYYY'),
        sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        sorter: (a, b) => a.status.localeCompare(b.status),
        render: (status) => statusTagStyled(status),
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        sorter: (a, b) => a.quantity - b.quantity,
    },
    {
        title: 'Total',
        dataIndex: 'total',
        render: (total) => <>{Number(total).toLocaleString('en-US')} &#8363;</>,
        sorter: (a, b) => a.total - b.total,
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
    },
];

function Actions({ order }) {
    return (
        <>
            <Space style={{ justifyContent: 'end' }}>
                <Dropdown
                    menu={{
                        items: [
                            {
                                label: (
                                    <Link to={`/orders/details/${order.id}`}>
                                        <Text type="info">
                                            <EyeOutlined style={{ paddingRight: 10 }} />
                                            View details
                                        </Text>
                                    </Link>
                                ),
                                key: 'info',
                            },
                            {
                                label: (
                                    <Link to={`/orders/details/${order.id}`}>
                                        <Text type="info">
                                            <PrinterOutlined style={{ paddingRight: 10 }} />
                                            Printer
                                        </Text>
                                    </Link>
                                ),
                                key: 'print',
                            },
                        ],
                    }}
                    placement="bottomRight"
                    trigger={['click']}
                    arrow={{ pointAtCenter: false }}
                >
                    <MoreOutlined />
                </Dropdown>
            </Space>
        </>
    );
}

function formatData(data) {
    return data.map((order) => ({
        ...order,
        customer: order.user.displayName,
        total: order.orderDetails.finalTotal,
        date: order.orderDetails.orderDate,
        quantity: order.orderDetails.numOfProduct,
        actions: <Actions order={order} />,
        status: order.status,
    }));
}
function OrderPage() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });

    const { getAxiosJwt, dispatch } = useAxiosJwt();

    const fetchData = async (tableParams) => {
        try {
            setLoading(true);
            const { pageSize: limit, current: page } = tableParams.pagination;
            const axiosJwt = getAxiosJwt();
            if (axiosJwt) {
                const res = await axiosJwt.get('admin/order', {
                    params: { limit, page, 'order-by': 'createAt:desc' },
                });
                const content = res.data.content;

                console.log('Order fetch', content);
                dispatch(setOrders(content.data));
                setData(formatData(content.data));
                setLoading(false);

                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: content.total,
                    },
                });
            }
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchData(tableParams);
    }, []);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.current !== tableParams.pagination.current) {
            fetchData({ pagination });
        }
    };
    const onSearch = () => {};
    return (
        <div>
            <Breadcrumb />
            <p className="heading">Orders</p>

            <Search
                style={{ maxWidth: 400, margin: '12px 0' }}
                placeholder="Search order id"
                onSearch={onSearch}
                enterButton
            />
            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    );
}
export default OrderPage;
