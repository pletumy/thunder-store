/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Dropdown, Image, Modal, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from 'antd';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { CreateProductButton } from '../Product';
import Search from 'antd/es/input/Search';
import { getProductsSuccess } from '~/Redux/Slide/ProductSlide';
import { request } from '~/Api/Request';
import { Breadcrumb } from '../Layout';
import FormProduct from '../Product/FormProduct';
import { createProductApi, deleteProduct, updateProduct } from '~/Api/ProductApi';
import { getToken } from '~/Redux/Selector/AuthSelector';
import httpRequest from '~/Api';
import { useNavigate } from 'react-router-dom';
import useAxiosJwt from '~/Hook/useAxiosJwt';
import { isLoading } from '~/Redux/Slide/LoadingSlide';
const { Paragraph, Text } = Typography;

const columns = [
    {
        title: 'Image',
        dataIndex: 'images',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Description',
        render: (description) => descriptionRender(description),
        dataIndex: 'description',
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
    },
    {
        title: 'Likes',
        dataIndex: 'likes',
    },
    {
        title: 'Sold',
        dataIndex: 'sold',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
        render: (price) => <>{Number(price).toLocaleString('en-US')} &#8363;</>,
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
    },
];

const descriptionRender = (text) => {
    return (
        <Paragraph
            style={{ maxWidth: '150px' }}
            ellipsis={{
                suffix: '...',
            }}
        >
            {text}
        </Paragraph>
    );
};
function Actions({ product, setProductEditor, setOpenModal, setOpenModalDelete, setProductSelectId }) {
    const categories = useSelector((state) => state.category.categories);

    const handleDelete = () => {
        setProductSelectId(product.id);
        setOpenModalDelete(true);
    };
    const handleEditor = () => {
        console.log(product);

        setProductEditor({
            ...product,
            categories: categories.filter((cate) => product?.tag.includes(cate.tag)).map((cate) => cate.id),
            colors: product?.colors.map((color) => color.id),
            sizes: product?.sizes.map((size) => size.id),
        });
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

function ProductPage() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const { getAxiosJwt, dispatch } = useAxiosJwt();
    const [productEditor, setProductEditor] = useState({});
    const [productSelectId, setProductSelectId] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openCreateProduct, setOpenCreateProduct] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });

    const formatData = (data) => {
        return data.map((product) => ({
            ...product,
            key: product.id,
            description: product.description,
            images:
                product.images.length > 0 ? (
                    <Image width={80} height={80} src={product?.images[0].url} />
                ) : (
                    <Image width={80} height={80} src="error" />
                ),
            actions: (
                <Actions
                    product={product}
                    setProductEditor={setProductEditor}
                    setOpenModal={setOpenModal}
                    setOpenModalDelete={setOpenModalDelete}
                    setProductSelectId={setProductSelectId}
                />
            ),
        }));
    };

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
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

            const res = await request.get(`/products/page/${page}/${limit}/createAt:desc`);

            const content = res.data.content;
            dispatch(getProductsSuccess(content.products));
            setData(formatData(content.data));
            setLoading(false);

            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: content.total,
                },
            });
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
    const handleDeleteCancel = () => {
        setOpenModalDelete(false);
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

    const handleEditProduct = async () => {
        const { tag, ...productUpdateDto } = productEditor;

        console.log(productUpdateDto);
        const axiosJwt = getAxiosJwt();

        if (axiosJwt) {
            const newProduct = await updateProduct(productEditor.id, productUpdateDto, dispatch, axiosJwt);

            if (newProduct) {
                setData((prev) => {
                    const [fomatProduct] = formatData([newProduct]);
                    return prev.map((item) => (item.id === fomatProduct.id ? { ...fomatProduct } : item));
                });
            }
        }

        setOpenModal(false);
    };
    const handleDeleteProduct = async () => {
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            const isSuccess = await deleteProduct(productSelectId, dispatch, axiosJwt);
            if (isSuccess) {
                setData((prev) => prev.filter((item) => item.id !== productSelectId));
            }
            setOpenModalDelete(false);
        }
    };
    const handleCreateProduct = async (data) => {
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            const res = await createProductApi(
                { ...data, images: data.images.map((img) => img.url) },
                dispatch,
                axiosJwt,
            );
            if (res !== null) {
                setOpenCreateProduct(false);
            }
        }
    };
    return (
        <div>
            <Breadcrumb />
            <p className="heading">Products</p>
            <div
                style={{
                    marginBottom: 16,
                }}
            >
                <CreateProductButton
                    setOpen={setOpenCreateProduct}
                    open={openCreateProduct}
                    handleSubmit={handleCreateProduct}
                />
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
                placeholder="Search product"
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
            {productEditor ? (
                <Modal title="Edit Product" open={openModal} onOk={handleEditProduct} onCancel={handleCancel}>
                    <FormProduct product={productEditor} setProduct={setProductEditor} />
                </Modal>
            ) : null}

            <Modal
                title="Delete product"
                open={openModalDelete}
                onOk={handleDeleteProduct}
                onCancel={handleDeleteCancel}
            >
                Are you sure you want to delete this product? Cannot restore.
            </Modal>
        </div>
    );
}
export default ProductPage;
