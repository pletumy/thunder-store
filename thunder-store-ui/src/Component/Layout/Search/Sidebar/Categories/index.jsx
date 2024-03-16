import { useSelector } from 'react-redux';
import { Heading, Label, Wrapsection } from '../sidebar.style';

function Categories({ setPagination, filter, setFilter }) {
    const categories = useSelector((state) => state.categories.categories);

    const handleInputChange = (id) => {
        setPagination((prev) => ({ ...prev, page: 1 }));
        setFilter((prev) => ({ ...prev, categoryIds: id !== 'all' ? [id] : [] }));
    };
    return (
        <Wrapsection>
            <Heading>Category</Heading>

            <Label>
                <input
                    onChange={(e) => handleInputChange(e.target.value)}
                    checked={filter.categoryIds.length === 0}
                    type="radio"
                    value="all"
                    name="category"
                />
                <span>Tất cả</span>
            </Label>

            {categories?.map((cate) => (
                <Label key={cate.tag}>
                    <input
                        type="radio"
                        value={cate.id}
                        title={cate.name}
                        checked={filter.categoryIds.includes(cate.id)}
                        onChange={() => handleInputChange(cate.id)}
                        name="category"
                    />
                    {cate.name}
                </Label>
            ))}
        </Wrapsection>
    );
}

export default Categories;
