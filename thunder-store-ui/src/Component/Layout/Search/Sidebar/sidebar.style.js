import styled from 'styled-components';

export const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--white-color);
    width: 250px;
    padding: 20px 0 20px 30px;
    border-radius: 6px;
`;
export const Wrapsection = styled.section`
    margin: 20px 0;
    display: flex;
    flex-direction: column;
`;
export const Title = styled.p`
    font-size: 1.8rem;
    text-transform: uppercase;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0 10px;
`;
export const Heading = styled.p`
    font-size: 2rem;
    font-weight: 500;
`;

export const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 0 10px;
    text-transform: capitalize;
`;
