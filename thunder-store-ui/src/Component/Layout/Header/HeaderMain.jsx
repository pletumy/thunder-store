import SearchBar from '~/Component/Layout/Search/SearchBar';
import { NavBar } from '..';
import UserSection from './UserSection';
import { Logo, Header } from './header.style';
import { Link } from 'react-router-dom';
function HeaderMain() {
    return (
        <Header>
            <div className="container">
                <Logo>
                    <Link to="/">
                        <img src="/logo-02.png" alt="logo" />
                    </Link>
                </Logo>
                <NavBar />

                <UserSection>
                    <SearchBar />
                </UserSection>
            </div>
        </Header>
    );
}

export default HeaderMain;
