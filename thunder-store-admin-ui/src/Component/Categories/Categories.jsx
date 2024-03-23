/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Breadcrumb } from '../Layout';
import { useSelector } from 'react-redux';
import { deleteCategories, fetchCategories } from '~/Redux/Slide/CategoriesSlice';
import { Dropdown, Modal, Space, Table, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { DeleteOutlined, EyeOutlined, MoreOutlined } from '@ant-design/icons';
import CreateCategory from './CreateCategory';
import { toast } from 'react-toastify';
import useAxiosJwt from '~/Hook/useAxiosJwt';

const { Text } = Typography;
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Tag',
        dataIndex: 'tag',
        render: (tag) => <Tag color="#f59121">{tag}</Tag>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },

    {
        title: 'Actions',
        dataIndex: 'actions',
    },
];

function Actions({ cate, setCateSelect, setOpenModal }) {
    const handleDelete = () => {
        setCateSelect(cate.id);
        setOpenModal(true);
    };
    return (
        <>
            <Space style={{ justifyContent: 'end' }}>
                <Dropdown
                    menu={{
                        items: [
                            {
                                label: (
                                    <Link to={`/categories/details/${cate.id}`}>
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

function Categories() {
    const { getAxiosJwt, dispatch } = useAxiosJwt();
    const categories = useSelector((state) => state.category.categories);
    const [openModal, setOpenModal] = useState();
    const [cateSelect, setCateSelect] = useState();

    const data = categories?.map((cate) => ({
        ...cate,
        actions: <Actions cate={cate} setCateSelect={setCateSelect} setOpenModal={setOpenModal} />,
    }));

    useEffect(() => {
        if (categories.length === 0) {
            const axiosToken = getAxiosJwt();
            if (axiosToken) {
                dispatch(fetchCategories(axiosToken));
            }
        }
    }, []);
    const handleCancel = () => {
        setOpenModal(false);
    };

    const deleteCate = async (cateId, axiosJwt) => {
        try {
            await axiosJwt.delete(`categories/${cateId}`);
            dispatch(deleteCategories(cateSelect));
            toast.success('Category is deleted.');
        } catch (e) {
            toast.error('Category delete valid.');
        }
    };

    const handleOk = async () => {
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            await deleteCate(cateSelect, axiosJwt);
        }
        setOpenModal(false);
    };
    return (
        <>
            <Breadcrumb />
            <p className="heading">Categories</p>
            <CreateCategory />

            <Table columns={columns} rowKey={(record) => record.id} dataSource={data} />

            <Modal title="Delete categories" open={openModal} onOk={handleOk} onCancel={handleCancel}>
                Are you sure you want to delete this cate? Cannot restore.
            </Modal>
        </>
    );
}

export default Categories;
