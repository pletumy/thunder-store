import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Heading } from '../Sidebar/sidebar.style';
import { request } from '~/Untils/request';
import { useState } from 'react';

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px 0;
`;
const CateWrap = styled.div`
    display: flex;
    gap: 0 16px;
`;
const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    padding: 6px 16px;
    border-radius: 6px;
    border: 1px solid #ccc;
    cursor: pointer;
    &.active {
        border-color: transparent;
        color: var(--white-color);
        background-color: var(--primary-color);
    }
`;
const Recomment = ({ setPagination, filter, setFilter }) => {
    const categories = useSelector((state) => state.categories.categories);

    const handleOnClick = (cateId) => {
        setPagination((prev) => ({ ...prev, page: 1 }));
        setFilter((prev) => ({ ...prev, categoryIds: cateId !== 'all' ? [cateId] : [] }));
    };
    return (
        <Wrapper>
            <Heading>Recomment</Heading>
            <CateWrap>
                {categories.map((cate) => (
                    <Item
                        className={filter.categoryIds.includes(cate.id) ? 'active' : ''}
                        onClick={() => handleOnClick(cate.id)}
                        key={cate.id}
                    >
                        {cate.name}
                    </Item>
                ))}
            </CateWrap>
        </Wrapper>
    );
};

export default Recomment;
