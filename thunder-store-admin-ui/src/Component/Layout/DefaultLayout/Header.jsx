import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Space } from 'antd';
import styled from 'styled-components';
import { Layout } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '~/Api/AuthApi.js';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserSelector } from '~/Redux/Selector/AuthSelector';
const HeaderStyled = styled(Layout.Header)`
    background-color: #fff;
    padding: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    z-index: 10;
    & .box-left {
        display: flex;

        & .logo {
            display: flex;
            align-items: center;
        }
    }
`;
const AvatarWrap = styled(Space)`
    margin-right: 16px;
    cursor: pointer;
`;
function Header({ collapsed, setCollapsed }) {
    const userDetails = useSelector(currentUserSelector);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(dispatch, navigate);
    };

    return (
        <HeaderStyled>
            <div className="box-left">
                <Button
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                        marginLeft: 16,
                        background: 'colorBgContainer',
                    }}
                />
                <div className="logo">
                    <img src="/logo-01.png" alt="logo" />
                </div>
            </div>

            <AvatarWrap>
                <Dropdown
                    menu={{
                        items: [
                            {
                                label: <Link to="/info">Info</Link>,
                                key: '0',
                            },
                            {
                                label: <div onClick={handleLogout}>Logout</div>,
                                key: '1',
                            },
                        ],
                    }}
                    placement="bottomRight"
                    trigger={['click']}
                    arrow={{ pointAtCenter: true }}
                >
                    <Space align="center">
                        <Avatar size={40} icon={<UserOutlined />} />
                        <p>{userDetails?.displayName}</p>
                    </Space>
                </Dropdown>
            </AvatarWrap>
        </HeaderStyled>
    );
}

export default Header;
