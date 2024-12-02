import styled from "styled-components";

export const Badge = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    white-space: nowrap;
    text-transform: capitalize;

    /* Variants */
    ${({ variant }) => variant === 'success' && `
        background-color: #4CAF50; /* green */
        color: white;
    `}

    ${({ variant }) => variant === 'secondary' && `
        background-color: #F3F4F6;
        color: #6B7280;
    `}

    ${({ variant }) => variant === 'destructive' && `
        background-color: #EF4444; /* red-500 */
        color: white;
    `}

    ${({ variant }) => variant === 'warning' && `
        background-color: #FFB200; /* yellow-500 */
        color: white;
    `}
`;
