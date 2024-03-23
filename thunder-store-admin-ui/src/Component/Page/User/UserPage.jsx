/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Avatar, Dropdown, Modal, Space, Table } from 'antd';
import { Typography } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { CreateProductButton } from '../../Product';
import Search from 'antd/es/input/Search';
import { Breadcrumb } from '../../Layout';
import EditUserForm from '~/Component/Users/EditUserForm';
import { updateUser } from '~/Api/UserApi';
import useAxiosJwt from '~/Hook/useAxiosJwt';
const { Text } = Typography;

const columns = [
    {
        title: 'Avatar',
        dataIndex: 'avatar',
    },
    {
        title: 'Username',
        dataIndex: 'username',
        sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
    },
];
function Actions({ user, setUserEdit, setOpenModal }) {
    const handleDelete = () => {
        console.log('delete', user.id);
    };
    const handleEditor = () => {
        setUserEdit(user);
        setOpenModal(true);
    };
    return (
        <>
            <Space style={{ width: 50, justifyContent: 'end' }}>
                <Dropdown
                    menu={{
                        items: [
                            {
                                label: (
                                    <Text type="warning" onClick={handleEditor}>
                                        <EditOutlined style={{ paddingRight: 10 }} />
                                        Edit
                                    </Text>
                                ),
                                key: 'edit',
                            },
                            {
                                label: (
                                    <Text type="danger" onClick={handleDelete}>
                                        <DeleteOutlined style={{ paddingRight: 10 }} /> Delete
                                    </Text>
                                ),
                                key: 'delete',
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

function UserPage() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const { getAxiosJwt, dispatch } = useAxiosJwt();

    const [userEdit, setUserEdit] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    const onSearch = (values) => {
        console.log(values);
    };

    const fetchData = async (tableParams) => {
        try {
            setLoading(true);
            const { pageSize: limit, current: page } = tableParams.pagination;

            const axiosJwt = getAxiosJwt();
            if (axiosJwt) {
                const res = await axiosJwt.get('user', {
                    params: { limit, page, 'order-by': 'createAt:desc' },
                });
                const content = res.data.content;

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

    const handleCancel = () => {
        setOpenModal(false);
    };

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

    const onEditSubmit = async () => {
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            const newUser = await updateUser(userEdit.userDetails.id, userEdit, dispatch, axiosJwt);
            if (newUser !== null) {
                setData((prev) => {
                    const [formatUser] = formatData([newUser]);
                    return prev.map((item) => (item.id === formatUser.id ? { ...formatUser } : item));
                });

                setOpenModal(false);
                return;
            }
        }
    };

    function formatData(data) {
        return data.map((user) => ({
            ...user.userDetails,
            avatar:
                user.userDetails.avatar != null ? (
                    <Avatar src={user.userDetails.avatar} size={40}></Avatar>
                ) : (
                    <Avatar size={40}>{user.userDetails?.username[0].toUpperCase()}</Avatar>
                ),
            actions: <Actions user={user} setOpenModal={setOpenModal} setUserEdit={setUserEdit} />,
        }));
    }
    return (
        <div>
            <Breadcrumb />
            <p className="heading">Users</p>
            <div
                style={{
                    marginBottom: 16,
                }}
            >
                <CreateProductButton />
                <span
                    style={{
                        marginLeft: 8,
                    }}
                >
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Search
                style={{ maxWidth: 400, margin: '12px 0' }}
                placeholder="Search user"
                onSearch={onSearch}
                enterButton
            />
            <Table
                rowSelection={rowSelection}
                dataSource={data}
                columns={columns}
                rowKey={(record) => record.id}
                loading={loading}
                onChange={handleTableChange}
                pagination={tableParams.pagination}
            />
            {userEdit ? (
                <Modal title="Edit user" open={openModal} onCancel={handleCancel} footer={null}>
                    <EditUserForm
                        user={userEdit}
                        setUser={setUserEdit}
                        onSubmit={onEditSubmit}
                        onCancel={handleCancel}
                    />
                </Modal>
            ) : null}
        </div>
    );
}
export default UserPage;
