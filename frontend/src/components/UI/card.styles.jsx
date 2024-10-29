import styled from 'styled-components';

export const Card = styled.div`
  background-color: #ffffff;
  color: #1c1c1c;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }

  &.dark {
    background-color: #1c1c1c;
    color: #f0f0f0;
    border: 1px solid #333;
    box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
  }
`;

export const CardHeader = styled.div`
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.dark {
    background-color: #333;
  }
`;

export const CardTitle = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
`;

export const CardContent = styled.div`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CardDateAndTime = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

export const CardFooter = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  &.dark {
    background-color: #333;
  }
`;