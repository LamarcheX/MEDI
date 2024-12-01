import styled from "styled-components";

export const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    width: 100%;
    max-width: 500px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ModalTitle = styled.h3`
    margin: 0;
    font-size: 1.2rem;
`;

export const ModalBody = styled.div`
    padding: 16px;
`;

export const ModalFooter = styled.div`
    padding: 16px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
`;
