import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import FormProduct from './FormProduct';
const init = {
    name: '',
    categories: [],
    description: '',
    images: [],
    price: 0,
    quantity: 0,
    sold: 0,
    colors: [],
    sizes: [],
    discount: 0,
};
function CreateProductButton({ handleSubmit, setOpen, open }) {
    const [data, setData] = useState(init);

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        setData(init);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                <PlusOutlined />
                Create new
            </Button>
            <Modal title="Create new Product" open={open} onOk={() => handleSubmit(data)} onCancel={handleCancel}>
                <FormProduct product={data} setProduct={setData} />
            </Modal>
        </>
    );
}
export default CreateProductButton;
