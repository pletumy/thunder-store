import { HiOutlineFilter } from 'react-icons/hi';
import Categories from './Categories';
import Colors from './Colors';
import Price from './Price';
import { Title, Wrap } from './sidebar.style';

const Sidebar = ({ filter, setFilter, setPagination }) => {
    return (
        <>
            <Wrap>
                <Title>
                    <HiOutlineFilter />
                    Bộ lọc tìm kiếm
                </Title>
                <Categories filter={filter} setPagination={setPagination} setFilter={setFilter} />
                <Price filter={filter} setPagination={setPagination} setFilter={setFilter} />
                <Colors filter={filter} setPagination={setPagination} setFilter={setFilter} />
            </Wrap>
        </>
    );
};

export default Sidebar;
