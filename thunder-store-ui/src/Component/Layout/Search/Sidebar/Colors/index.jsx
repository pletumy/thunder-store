import { useEffect, useState } from 'react';
import { Heading, Label, Wrapsection } from '../sidebar.style';
import { getColors } from '~/Apis/ProductApi';
import styled from 'styled-components';
const ColorBox = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #f3f3f3;
`;
const ColorWrap = styled(Wrapsection)`
    height: 200px;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    & {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none;
    }
`;
const Colors = ({ filter, setFilter, setPagination }) => {
    const [colors, setColors] = useState();

    const handleInputChange = (id) => {
        setPagination((prev) => ({ ...prev, page: 1 }));
        setFilter((prev) => ({ ...prev, colorIds: id !== 'all' ? [id] : [] }));
    };

    const fetchColors = async () => {
        var colors = await getColors();
        if (colors) setColors(colors);
    };
    useEffect(() => {
        fetchColors();
    }, []);

    return (
        <>
            <Heading>Màu sắc</Heading>
            <ColorWrap>
                <Label className="sidebar-label-container">
                    <input
                        onChange={(e) => handleInputChange(e.target.value)}
                        checked={filter.colorIds.length === 0}
                        type="radio"
                        value="all"
                        name="color"
                    />
                    Tất cả
                </Label>
                {colors?.map((color) => (
                    <Label key={color.id}>
                        <input
                            type="radio"
                            checked={filter.colorIds.includes(color.id)}
                            onChange={() => handleInputChange(color.id)}
                            value={color.id}
                            name="color"
                        />
                        <ColorBox style={{ backgroundColor: color.color }} />
                        {color.name}
                    </Label>
                ))}
            </ColorWrap>
        </>
    );
};

export default Colors;
