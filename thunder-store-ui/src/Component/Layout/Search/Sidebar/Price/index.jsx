import { useState } from 'react';
import { Heading, Label, Wrapsection } from '../sidebar.style';

const Price = ({ setFilter, setPagination }) => {
    const [checked, setChecked] = useState('all');

    const handleInputChange = (price) => {
        setFilter((prev) => ({
            ...prev,
            minPrice: price != 'all' ? price.minPrice : 0,
            maxPrice: price != 'all' ? price.maxPrice : 0,
        }));
        setChecked(price != 'all' ? price.id : 'all');
    };

    return (
        <Wrapsection>
            <Heading>Giá</Heading>

            <Label>
                <input
                    checked={checked === 'all'}
                    type="radio"
                    onChange={(e) => handleInputChange(e.target.value)}
                    value="all"
                    name="price"
                />
                <span>Tất cả</span>
            </Label>

            <Label>
                <input
                    type="radio"
                    onChange={(e) => handleInputChange({ id: 1, minPrice: 0, maxPrice: 300000 })}
                    checked={checked === 1}
                    name="price"
                />
                <span>0 - 300.000 &#8363;</span>
            </Label>

            <Label>
                <input
                    type="radio"
                    onChange={() => handleInputChange({ id: 2, minPrice: 300000, maxPrice: 500000 })}
                    checked={checked === 2}
                    title=""
                    name="price"
                />
                <span>300.000 - 500.000 &#8363;</span>
            </Label>

            <Label>
                <input
                    type="radio"
                    onChange={(e) => handleInputChange({ id: 3, minPrice: 500000, maxPrice: 0 })}
                    checked={checked === 3}
                    title=""
                    name="price"
                />
                <span>Trên 500.000 &#8363;</span>
            </Label>
        </Wrapsection>
    );
};

export default Price;
