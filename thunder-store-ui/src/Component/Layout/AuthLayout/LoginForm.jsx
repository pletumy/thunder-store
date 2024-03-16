import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Form, GroupInput, Social, FieldError } from './AuthLayout.style';
import { FaUser, FaLock } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible, AiOutlineWarning } from 'react-icons/ai';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginSuccess } from '~/redux/Slide/AuthSlice';
import { isLoading, isNotLoading } from '~/redux/Slide/LoadingSlice';

const validationSchema = yup.object({
    username: yup.string().required('Yêu cầu nhập tên đăng nhập.').min(5, 'Tên đăng nhập ít nhất 5 kí tự.'),
    password: yup
        .string()
        .required('Yêu cầu nhập mật khẩu.')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password ít nhất 8 ký tự, tồn tại 1 chữ số và một ký tự đặt biệt.',
        ),
});
function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isUnauthorized = useSelector((state) => state.auth.login.error);

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (values) => {
        dispatch(isLoading());
        await axios
            .post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, values, { withCredentials: true })
            .then((response) => {
                if (response.status === 200) dispatch(loginSuccess(response.data?.content));
                navigate('/');
            })
            .catch((error) => {
                dispatch(loginFailure(error));
            });

        dispatch(isNotLoading());
    };
    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validateOnBlur: true,
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
    });

    return (
        <Form id="scrollbar" onSubmit={formik.handleSubmit}>
            <p className="heading-l">ĐĂNG NHẬP</p>
            <GroupInput>
                <label htmlFor="username">
                    <i>
                        <FaUser />
                    </i>
                    Tên đăng nhập
                </label>
                <div className="inputWrap">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                {formik.touched.username && formik.errors.username ? (
                    <FieldError>
                        <AiOutlineWarning /> {formik.errors.username}{' '}
                    </FieldError>
                ) : (
                    ''
                )}
            </GroupInput>
            <GroupInput>
                <label htmlFor="password">
                    <i>
                        <FaLock />
                    </i>
                    Mật khẩu
                </label>
                <div className="inputWrap">
                    <input
                        name="password"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    <span onClick={() => setShowPassword(!showPassword)} className="show-password">
                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </span>
                </div>
                {formik.touched.password && formik.errors.password ? (
                    <FieldError>
                        <AiOutlineWarning /> {formik.errors.password}{' '}
                    </FieldError>
                ) : (
                    ''
                )}
            </GroupInput>
            {isUnauthorized && (
                <FieldError>
                    <AiOutlineWarning /> Tài khoản và mật khẩu không đúng.
                </FieldError>
            )}
            <a href="#!" className="foget-password heading-s">
                Quên mật khẩu
            </a>
            <button type="submit" className="submit btn btn-primary" disabled={!formik.isValid}>
                Đăng nhập
            </button>

            <p className="line">or</p>
                
            <Social>
                <a href="#!" className="btn">
                    <img src="/facebook-logo.svg" alt="" />
                    Đăng nhập bằng facebook
                </a>
                <a href="#!" className="btn">
                    <img src="/google-icon.svg" alt="" />
                    Đăng nhập bằng google
                </a>
            </Social>

            <p className="change-method">
                Bạn chưa có tài khoản. <Link to="/auth/signup">Đăng ký tài khoản ngay.</Link>
            </p>
        </Form>
    );
}

export default LoginForm;
