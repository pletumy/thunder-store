import { Link, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

const List = styled.nav`
    display: flex;
    gap: 10px;
    font-size: 1.4rem;
    text-transform: capitalize;
    justify-content: start;
    width: 100%;
    & div a {
        color: var(--black-color);
        display: inline;
        margin-left: 5px;
        transition: all 0.2s linear;
    }
    & div a:hover {
        color: var(--primary-color);
    }
`;

function Breadcrumb() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    return (
        <List>
            <div>
                <Link to="/">Home</Link>
            </div>
            {pathnames.map((pathname, index) => {
                const url = `/${pathnames.slice(0, index + 1).join('/')}`;
                return (
                    <div key={index}>
                        <span className="breadcrumb-arrow">&gt;</span>
                        <Link to={url}>{pathname}</Link>
                    </div>
                );
            })}
        </List>
    );
}

export default Breadcrumb;
