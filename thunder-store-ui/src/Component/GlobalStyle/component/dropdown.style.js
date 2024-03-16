import styled from 'styled-components';

export const DropdownStyled = styled.div`
    display: flex;
    flex-direction: column;
    & a,
    & div {
        cursor: pointer;
        color: var(--text-color);
        padding: 12px 18px;
        display: flex;
        gap: 0 10px;
        align-items: center;
        &:hover {
            background-color: var(--background-white);
        }
    }
`;
