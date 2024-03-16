import {
    Home,
    Login,
    SignUp,
    DetailsProduct,
    CartPage,
    Profile,
    CheckoutDetails,
    Address,
    OrderComfirm,
    MyOrder,
    Discover,
    Searching,
} from '../Component/Page';
import { AuthLayout } from '../Component/Layout';
export const publicRoute = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/discover',
        component: Discover,
    },
    {
        path: '/auth/login',
        component: Login,
        layout: AuthLayout,
    },
    {
        path: '/auth/signup',
        component: SignUp,
        layout: AuthLayout,
    },
    {
        path: '/details/:id',
        component: DetailsProduct,
    },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/my-cart',
        component: CartPage,
    },
    {
        path: '/checkout',
        component: CheckoutDetails,
    },
    {
        path: '/user-address',
        component: Address,
    },
    {
        path: '/order-comfirm/:orderId',
        component: OrderComfirm,
    },
    {
        path: '/my-order',
        component: MyOrder,
    },
    {
        path: '/searching',
        component: Searching,
    },
    {
        path: 'categories',
        component: Home,
        children: [{ path: ':category', component: Home }],
    },
];
