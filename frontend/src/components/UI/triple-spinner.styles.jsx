import styled, { keyframes } from 'styled-components';

// Keyframe animation for the spinning effect
const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

// TripleSpinner component styled with the converted CSS
const TripleSpinner = styled.div`
    display: block;
    margin: auto;
    position: relative;
    width: 61px;
    height: 61px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top: 2px solid rgb(205, 167, 24);
    border-left: 2px solid rgb(205, 167, 24);
    animation: ${spin} 2s linear infinite;

    &::before,
    &::after {
        content: "";
        position: absolute;
        border-radius: 50%;
        border: 2px solid transparent;
    }

    &::before {
        opacity: 0.85;
        top: 8%;
        left: 8%;
        right: 8%;
        bottom: 8%;
        border-top-color: rgb(205, 167, 24);
        border-left-color: rgb(205, 167, 24);
        animation: ${spin} 3s linear infinite;
    }

    &::after {
        opacity: 0.7;
        top: 18%;
        left: 18%;
        right: 18%;
        bottom: 18%;
        border-top-color: rgb(205, 167, 24);
        border-left-color: rgb(205, 167, 24);
        animation: ${spin} 1.5s linear infinite;
    }
`;

export default TripleSpinner;
