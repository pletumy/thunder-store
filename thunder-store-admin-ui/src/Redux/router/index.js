import { Home, Categories, OrderPage, ProductPage, LoginPage, OrderDetails } from '../../Component/Page';
import { AuthLayout } from '../../Component/Layout';
import UserPage from '~/Component/Page/User/UserPage';
export const privateRoute = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: LoginPage,
        layout: AuthLayout,
    },
    {
        path: '/products',
        component: ProductPage,
    },
    {
        path: '/orders',
        component: OrderPage,
        children: [{ path: 'details/:id', component: OrderDetails }],
    },
    {
        path: '/categories',
        component: Categories,
    },
    {
        path: '/support',
        component: Home,
    },
    {
        path: '/users',
        component: UserPage,
    },
];
