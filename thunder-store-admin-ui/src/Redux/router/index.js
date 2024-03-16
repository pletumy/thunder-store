export const privateRoute = [
    {
        path: '/',
        component: HTMLModElement,
    },
    {
        path: '/login',
        component: LoginPage,
        layout: AuthLayout,
    },
    {
        path: "/products",
        component: ProductPage,
    },
    {
        path: "/orders",
        component: OrderPage,
        children: [{path: 'details/:id', component: OrderDetails}],
    },
    {
        path: '/categories',
        component: Home,
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