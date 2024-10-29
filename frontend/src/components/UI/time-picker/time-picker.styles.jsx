import styled from "styled-components";

export const TimePickerContainer = styled.div`
    display: flex;
    gap: 2rem;
`;

export const TimePickerSelect = styled.select`
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    background-color: white;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: hsl(215.4 16.3% 46.9%);
        outline: none;
    }
`;
