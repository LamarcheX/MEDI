import styled from "styled-components";

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  svg {
    margin-left: 0.25rem; /* ml-1 */
  }
`;

export const BadgeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem; /* gap-1 */
`;

export const InfoBlock = styled.div`
  margin-bottom: 1rem;
`;

export const InfoHeading = styled.h4`
  font-weight: 600; /* font-semibold */
  margin-bottom: 0.5rem;
`;

export const InfoItem = styled.p`
  font-size: 0.875rem; /* text-sm */
  gap: 0.25rem;
  margin-bottom: 0.25rem;
`;

export const ExpandButton = styled.button`
  color: #6b7280; /* text-gray-500 */
  &:hover {
    color: #374151; /* text-gray-700 */
  }
`;

export const InfoLabel = styled.span`
  font-weight: 500; /* font-medium */
`;

export const InfoSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
