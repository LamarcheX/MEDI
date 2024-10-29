import styled from 'styled-components';

export const Input = styled.input`
    width: 97%;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    background-color: white;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: hsl(215.4 16.3% 46.9%);
        outline: none;
    }

    &.dark {
        background-color: #333;
        color: #f7f7f7;
        border-color: #555;

        &:focus {
        border-color: #93c5fd;
        }
    }

    &[type='date'], 
    &[type='time'] {
        width: 95%;
    }
`;
