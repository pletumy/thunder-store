import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    AppstoreAddOutlined,
    AuditOutlined,
    ContactsOutlined,
    CustomerServiceOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';

const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem(<Link to="/">Dashboard</Link>, '/', <AppstoreAddOutlined style={{ fontSize: 22 }} />),
    getItem(<Link to="/products">Products</Link>, '/products', <ShoppingOutlined style={{ fontSize: 22 }} />),
    getItem(<Link to="/categories">Categories</Link>, '/categories', <ShoppingCartOutlined style={{ fontSize: 22 }} />),
    getItem(<Link to="/orders">Orders</Link>, '/orders', <AuditOutlined style={{ fontSize: 22 }} />),
    getItem(<Link to="/users">Users</Link>, '/users', <ContactsOutlined style={{ fontSize: 22 }} />),
    getItem('Support', 'support', <CustomerServiceOutlined style={{ fontSize: 22 }} />),
];

const ContentStyled = styled(Content)`
    min-height: 100%;
    overflow-y: auto;
`;
const Main = styled.main`
    padding: 24px 45px;
    overflow-y: auto;
`;
const Container = styled(Layout)`
    overflow: hidden;
    height: 100vh;
`;
const MenuStyled = styled(Menu)`
    background-color: #fff;
    padding: 16px 10px;
    max-height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    & .ant-menu-item {
        margin-top: 10px;
    }
    & .ant-menu-item .ant-menu-sub {
        margin: 0;
    }
    & .ant-menu-title-content {
        transition: none !important;
    }
    & .ant-menu-submenu-title:hover {
        color: #fff;
    }
    & .ant-menu-submenu-selected > .ant-menu-submenu-selected {
        color: var(--primary-color) !important;
    }
`;
const SiderStyled = styled(Sider)`
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    & .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        & img {
            height: 60px;
            width: auto;
        }
    }
`;

function DefaultLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const [currentTab, setCurrentTab] = useState(() => {
        if (pathnames.length === 0) return '/';
        return `/${pathnames[0]}`;
    });

    const onChangePage = (items) => {
        setCurrentTab(items?.keys);
    };

    return (
        <Container>
            <Header collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout>
                <SiderStyled
                    style={{ background: '#fff' }}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <MenuStyled
                        defaultSelectedKeys={[currentTab]}
                        defaultOpenKeys={currentTab?.split('/')}
                        mode="inline"
                        items={items}
                        onSelect={(items) => onChangePage(items)}
                    />
                </SiderStyled>
                <ContentStyled>
                    <Main>{children}</Main>
                </ContentStyled>
            </Layout>
        </Container>
    );
}
export default DefaultLayout;
