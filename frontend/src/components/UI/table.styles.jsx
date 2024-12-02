import styled from "styled-components";

export const TableWrapper = styled.div`
  margin: auto;
  overflow-y: auto;
  position: relative;
  max-height: 500px;
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