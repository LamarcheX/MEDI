import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 50%;
  max-width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const ModalTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 20px;
`;

export const ModalContent = styled.div`
  margin-bottom: 20px;
  p {
    margin: 5px 0;
    font-size: 1rem;
    color: #555;
  }
`;

export const CloseButton = styled.button`
  background-color: #f4f4f4;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #e0e0e0;
  }
`;
