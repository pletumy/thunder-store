/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { publicRoute } from './router';
import { DefaultLayout, Loading } from './Component/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCategories } from './redux/Slide/CategoriesSlice';
import { fetchAllProduct } from './redux/Slide/AllProductSlice';
import { getCartId, getUserId, isLogin } from './redux/Selector/AuthSelector';
import { getCartByCartId } from './Apis/CartApi';
import { getAllOrderByUserId } from './Apis/OrderApi';
import useAxiosJwt from './Component/Hook/useAxiosjwt';

function App() {
    const { getAxiosJwt, token, dispatch } = useAxiosJwt();
    const { pathname } = useLocation();
    const cartId = useSelector(getCartId);
    const isLoading = useSelector((state) => state.loading.isLoading);
    const userId = useSelector(getUserId);
    const userLogin = useSelector(isLogin);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        if (userLogin) {
            const axiosJwt = getAxiosJwt();
            getCartByCartId(cartId, dispatch, axiosJwt);
            getAllOrderByUserId(userId, dispatch, axiosJwt);
        }
        dispatch(fetchCategories());
        dispatch(fetchAllProduct());
    }, [token]);

    const renderRoute = (route) => {
        const Component = route.component;
        let Layout = DefaultLayout;
        if (route.layout) Layout = route.layout;
        const routeElement = (
            <Layout>
                <Component />
            </Layout>
        );
        if (route.children) {
            return (
                <Route key={route.path} path={route.path} element={<Outlet />}>
                    <Route index element={routeElement} />
                    {route.children.map((child) => renderRoute(child))}
                </Route>
            );
        }

        return <Route key={route.path} path={route.path} element={routeElement} />;
    };

    return (
        <>
            <div className="background-white">
                <Routes>
                    {publicRoute.map((route) => renderRoute(route))}
                    <Route path="*" element={<p> 404 page</p>} />
                </Routes>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {isLoading && <Loading />}
        </>
    );
}

export default App;
