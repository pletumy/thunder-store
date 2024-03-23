import { Button, Checkbox, Form, Input, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loginFailure, loginSuccess } from '../../Redux/Slide/AuthSlide';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '~/Redux/Selector/AuthSelector';
import { WarningOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { isLoading, isNotLoading } from '~/Redux/Slide/LoadingSlide';

const { Item } = Form;
const Container = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    background: url('https://bramsfruit.com/wp-content/uploads/2021/12/BF-lookbook-FW21-Femke-Lukas.jpg')
        center/cover no-repeat;
    position: relative;
`;
const FormStyled = styled(Form)`
    padding: 20px 20px;
    background-color: var(--white-color);
    border-radius: 6px;
    max-width: 600px;
    height: max-content;
    margin-top: 100px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;
const Message = styled.div`
    color: #e74c3c;
    margin: 0 0 20px 0;
    animation: horizontal-shaking backwards 0.3s;
    @keyframes horizontal-shaking {
        0% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(5px);
        }
        50% {
            transform: translateX(-5px);
        }
        75% {
            transform: translateX(5px);
        }
        100% {
            transform: translateX(0);
        }
    }
`;
function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errorMessage = useSelector(getErrorMessage);
    const [isError, setIsError] = useState(false);
    const handleSubmit = async (values) => {
        try {
            dispatch(isLoading());
            setIsError(false);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login/admin`, values, {
                withCredentials: true,
            });
            if (res.status === 200) dispatch(loginSuccess(res.data?.content));

            dispatch(isNotLoading());
            navigate('/');
        } catch (error) {
            setIsError(true);
            dispatch(isNotLoading());
            dispatch(loginFailure('Username or password is incorect.'));
        }
    };
    return (
        <Container>
            <FormStyled
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Space style={{ justifyContent: 'center', width: '100%', margin: '20px 0' }}>
                    <img src="/logo-01.png" alt="logo" />
                </Space>
                <Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        {
                            min: 1,
                        },
                    ]}
                >
                    <Input />
                </Item>

                <Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Item>
                {isError && (
                    <Message>
                        <WarningOutlined style={{ marginRight: 5 }} />
                        {errorMessage}
                    </Message>
                )}

                <Button type="primary" style={{ width: '100%' }} htmlType="submit">
                    Login
                </Button>
            </FormStyled>
        </Container>
    );
}
export default LoginPage;
