import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, Image, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
const ImageStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const { Item } = Form;
const { TextArea } = Input;
const TagStyled = styled(Tag)`
    text-transform: capitalize;
    font-weight: 500;
    color: #f3f3f3 !important;
    border: 1px solid #333;
`;

const FormProduct = ({ product, setProduct }) => {
    const [image, setImage] = useState({ id: null, url: '' });
    const imageRef = useRef();
    const categories = useSelector((state) => state.category.categories);
    const colors = useSelector((state) => state.product.colors);
    const sizes = useSelector((state) => state.product.sizes);
    const [form] = Form.useForm();

    const categoriesOptions = categories?.map((item) => ({ label: item.tag, value: item.id }));
    const colorsOptions = colors?.map((item) => ({
        label: <TagStyled color={item?.color}>{item?.name}</TagStyled>,
        value: item?.id,
    }));
    const sizesOptions = sizes?.map((item) => ({
        label: <Tag bordered={false}>{item.size}</Tag>,
        value: item?.id,
    }));
    const getCategoriesDefault = (category) => {
        if (category) {
            const result = categories.filter((cate) => category.includes(cate?.id));
            return result.map((i) => ({ label: i.tag, value: i.id }));
        }
    };

    const getColorsDefault = (productColor) => {
        if (productColor)
            return colors
                .filter((color) => productColor.includes(color.id))
                .map((item) => ({
                    label: <TagStyled color={item?.color}>{item?.name}</TagStyled>,
                    value: item?.id,
                }));
    };
    const getSizeDefault = (productSize) => {
        if (productSize)
            return sizes
                .filter((size) => productSize.includes(size.id))
                .map((item) => ({
                    label: item?.size,
                    value: item?.id,
                }));
    };
    const handleChangeOptions = (value, name) => {
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddProduct = () => {
        setProduct((prev) => ({ ...prev, images: [...prev.images, image] }));
        setImage((prev) => ({ ...prev, url: '' }));
        imageRef.current.focus();
    };
    const handleDeleteImage = (value) => {
        setProduct((prev) => ({ ...prev, images: prev?.images.filter((image) => image.id !== value) }));
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const defaultValue = {
        ...product,
        categories: getCategoriesDefault(product.categories),
        colors: getColorsDefault(product.colors),
        sizes: getSizeDefault(product.sizes),
    };

    useEffect(() => {
        form.setFieldsValue(defaultValue);
    }, [form, product]);

    return (
        <Form
            validateTrigger="onBlur"
            validateMessages={true}
            form={form}
            layout="vertical"
            initialValues={defaultValue}
        >
            <Item name="name" label="Name" rules={[{ required: true }, { type: 'string', min: 6 }]}>
                <Input type="text" name="name" placeholder="Tên sản phẩm" onChange={(e) => handleInputChange(e)} />
            </Item>
            <Item name="price" label="Price" rules={[{ required: true }]}>
                <Input type="number" name="price" placeholder="Price" onChange={(e) => handleInputChange(e)} />
            </Item>
            <Item name="quantity" label="Quantity" rules={[{ required: true }]}>
                <Input type="number" name="quantity" onChange={(e) => handleInputChange(e)} />
            </Item>
            <Item name="discount" label="Discount" rules={[{ required: true }]}>
                <Input type="number" name="discount" onChange={(e) => handleInputChange(e)} />
            </Item>
            <Item name="categories" label="Categories">
                <Select
                    virtual={false}
                    mode="multiple"
                    placeholder="Please select"
                    onChange={(value) => handleChangeOptions(value, 'categories')}
                    options={categoriesOptions}
                />
            </Item>
            <Item name="colors" label="Colors">
                <Select
                    mode="multiple"
                    virtual={false}
                    placeholder="Please select"
                    onChange={(value) => handleChangeOptions(value, 'colors')}
                    options={colorsOptions}
                />
            </Item>
            <Item name="sizes" label="Sizes">
                <Select
                    virtual={false}
                    mode="multiple"
                    placeholder="Please select"
                    onChange={(value) => handleChangeOptions(value, 'sizes')}
                    options={sizesOptions}
                />
            </Item>
            <Item name="description" label="Description" rules={[{ required: true }]}>
                <TextArea rows={4} name="description" onChange={(e) => handleInputChange(e)} />
            </Item>
            {product?.images.length > 0 && (
                <Item label="Images Review">
                    <Space wrap style={{ margin: '10px 0' }}>
                        {product?.images.map((img, i) => (
                            <ImageStyled key={i}>
                                <Image width={100} height={100} src={img.url} />
                                <Button
                                    onClick={() => handleDeleteImage(img.id)}
                                    style={{ marginTop: 10 }}
                                    icon={<CloseCircleOutlined />}
                                />
                            </ImageStyled>
                        ))}
                    </Space>
                </Item>
            )}

            {image.url !== '' && (
                <Item label="Review">
                    <Space>
                        <Image width={80} src={image.url} />
                    </Space>
                </Item>
            )}
            <Item name="review-images" label="Images">
                <div style={{ display: 'flex' }}>
                    <Input
                        ref={imageRef}
                        placeholder="Add url images"
                        value={image?.url}
                        onInput={(e) => setImage((prev) => ({ ...prev, url: e.target.value }))}
                    />
                    {image.url.length > 0 && <Button onClick={handleAddProduct}>Add</Button>}
                </div>
            </Item>
        </Form>
    );
};

export default FormProduct;
