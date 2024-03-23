import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Form, Input, Flex } from 'antd';
import styled from 'styled-components';
import useAxiosJwt from '~/Hook/useAxiosJwt';
import { addCategory } from '~/Redux/Slide/CategoriesSlice';
import { isLoading, isNotLoading } from '~/Redux/Slide/LoadingSlide';
import { toast } from 'react-toastify';

const { Item } = Form;
const { TextArea } = Input;
const Wrap = styled.div`
    display: flex;
    justify-content: end;
    margin: 20px 0;
`;
function CreateCategory({ onCancel }) {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const { getAxiosJwt, dispatch } = useAxiosJwt();

    const [defaultValue, setDefaultValue] = useState({
        name: '',
        description: '',
        tag: '',
    });

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const createNewCategory = async (values, axiosJwt) => {
        try {
            dispatch(isLoading());
            const res = await axiosJwt.post('categories', values);
            dispatch(addCategory(res.data.content));

            toast.success('Create category successfully.');
            dispatch(isNotLoading());
        } catch (e) {
            console.log(e);
            dispatch(isNotLoading());
            toast.error('Create category failure.');
        }
    };
    const onSubmit = (values) => {
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            createNewCategory(values, axiosJwt);
        }
        setOpen(false);
    };

    const FormRender = () => {
        return (
            <>
                <Form
                    form={form}
                    initialValues={defaultValue}
                    onFinish={onSubmit}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    layout="horizontal"
                    style={{
                        maxWidth: 600,
                    }}
                    validateTrigger="onBlur"
                >
                    <Item
                        name="name"
                        label="Title"
                        rules={[{ required: true }, { type: 'string', warningOnly: true }, { type: 'string', min: 6 }]}
                    >
                        <Input placeholder="Title for products" />
                    </Item>
                    <Item
                        name="tag"
                        label="Tag"
                        rules={[{ required: true }, { type: 'string', warningOnly: true }, { type: 'string', min: 6 }]}
                    >
                        <Input placeholder="Tag for category" />
                    </Item>
                    <Item
                        label="Description"
                        name="description"
                        rules={[{ required: true }, { type: 'string', warningOnly: true }, { type: 'string', min: 6 }]}
                    >
                        <TextArea rows={4} />
                    </Item>

                    <Flex justify="flex-end" gap="small" wrap="wrap">
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button onClick={onCancel}>Cancel</Button>
                    </Flex>
                </Form>
            </>
        );
    };

    return (
        <>
            <Wrap>
                <Button type="primary" onClick={showModal}>
                    <PlusOutlined />
                    Create category
                </Button>
            </Wrap>
            <Modal title="Create category" open={open} footer={null} onCancel={handleCancel}>
                <FormRender />
            </Modal>
        </>
    );
}
export default CreateCategory;
