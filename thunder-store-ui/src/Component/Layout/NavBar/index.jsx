import { styled } from 'styled-components';
import { AiOutlineDown } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { useSelector } from 'react-redux';

const Nav = styled.nav`
    margin: 20px 0;
    & ul {
        justify-content: center;
        gap: 0 30px;
    }
    & ul a {
        font-size: 1.6rem;
        text-transform: uppercase;
        color: var(--black-color);
    }
`;
const Dropdown = styled.ul`
    background-color: var(--white-color);
    min-width: 300px;
    border-radius: 6px;
    & li p {
        padding: 10px 20px;
        font-size: 1.6rem;
        font-weight: 500;
        &:hover {
            background-color: var(--background-white);
        }
    }
`;
const ListItem = styled.li`
    text-transform: uppercase;
    font-weight: 500;
`;
function NavBar() {
    const categories = useSelector((state) => state.categories.categories);
    const navigate = useNavigate();

    const handleNav = (id) => {
        navigate(`/searching?cate=${id}`);
    };
    return (
        <Nav>
            <ul className="align-center-flex">
                <ListItem>
                    <Link className="item active line-hover line-hover-primary" to="/">
                        TRANG CHỦ
                    </Link>
                </ListItem>
                <div>
                    <Tippy
                        content={
                            <Dropdown>
                                {categories?.map((cate) => (
                                    <li onClick={(e) => handleNav(cate.id)} key={cate.id}>
                                        <p>{cate.description}</p>
                                    </li>
                                ))}

                                <li onClick={(e) => handleNav('all')} key="commingsoon">
                                    <p>Sắp ra mắt</p>
                                </li>
                            </Dropdown>
                        }
                        theme="light"
                        animation="fade"
                        arrow={false}
                        trigger="mouseenter"
                        interactive={true}
                        placement="bottom"
                    >
                        <ListItem className="item line-hover line-hover-primary">
                            Danh mục
                            <AiOutlineDown size={12} />
                        </ListItem>
                    </Tippy>
                </div>
                <ListItem>
                    <Link className="item line-hover line-hover-primary" to="/">
                        Thông báo
                    </Link>
                </ListItem>
            </ul>
        </Nav>
    );
}

export default NavBar;
