import styled from "styled-components";

export const SelectWrapper = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
`;

export const SelectInput = styled.select`
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    appearance: none;
    outline: none;
    cursor: pointer;

    &:focus {
        border-color: #2563eb;
    }
    
    &::placeholder {
        color: #6b7280;
    }
`;
