import styled from "styled-components";

export const TableWrapper = styled.div`
  margin: auto;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  height: calc(100vh - 280px); // Ajusta esto según el espacio del header y otros elementos
  min-height: 400px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const Table = styled.table`
  width: 100%;
  text-align: left;
  font-size: 0.875rem;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  text-transform: uppercase;
  background-color: #f1f1f1;
  color: #6b7280;
  ${({ theme }) => theme.dark && `background-color: #374151;`}
`;

export const TableRow = styled.tr`
  cursor: pointer;

  ${({ open }) => open && `
    background-color: #f3f4f6;

    &:hover {
      background-color: #f3f4f6;
    }
  `}

  &:hover {
    background-color: #f9fafb;
    transition: background-color 0.3s ease;
  }
`;

export const TableHeaderCell = styled.th`
  padding: 0.75rem 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f3f4f6; 
  }
`;

export const TableCell = styled.td`
  padding: 1rem 0.5rem;
  white-space: nowrap;
  border-top: 1px solid #e5e7eb;

  span {
    display: flex;
    align-items: center;
    ${({ theme }) => theme.dark && `background-color: #374151;`}
    gap: 0.5rem;
  }
`;

export const ExpandableRow = styled.tr`
  background-color: #f3f4f6;
`;

export const ExpandedContentCell = styled.td`
  padding: 1rem;
`;