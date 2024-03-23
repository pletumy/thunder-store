/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, Route, Routes } from 'react-router-dom';
import { privateRoute } from './Redux/router';
import { DefaultLayout } from './Component/Layout';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCategories } from './Redux/Slide/CategoriesSlice';
import { fetchColorsAndSizes } from './Redux/Slide/ProductSlide';
import { fetchRoles } from './Redux/Slide/UserSlide';
import useAxiosJwt from './Hook/useAxiosJwt';
import { useSelector } from 'react-redux';
import Loading from './Component/Layout/Loading';
function App() {
    const { getAxiosJwt, dispatch, token, navigate } = useAxiosJwt();
    const isLoading = useSelector((state) => state.loading.isLoading);

    useEffect(() => {
        const axiosJwt = getAxiosJwt();
        if (token && axiosJwt) {
            dispatch(fetchColorsAndSizes());
            dispatch(fetchCategories());
            dispatch(fetchRoles(axiosJwt));
        } else {
            navigate('/login');
        }
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
        <div className="App">
            <Routes>{privateRoute.map((route) => renderRoute(route))}</Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
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
        </div>
    );
}

export default App;

