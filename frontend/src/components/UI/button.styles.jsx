import styled from 'styled-components';

export const Button = styled.button`
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    background-color: hsl(220.9 39.3% 11%);
    color: white;

    &:hover {
        background-color: hsl(220.9 39.3% 25%);
    }

    &.outline {
        background-color: transparent;
        color: hsl(220.9 39.3% 11%);
        border: 2px solid hsl(220.9 39.3% 11%);

        &:hover {
            background-color: hsl(220.9 39.3% 11%);
            color: white;
        }
    }

    // if button is disabled
    &:disabled {
        background-color: #f0f0f0;
        color: #a0a0a0;
        cursor: not-allowed;
    }

    &.dark {
        background-color: #3b3b3b;
        color: #f0f0f0;
        border: 2px solid #444;

        &:hover {
        background-color: #525252;
        }
    }
`;
