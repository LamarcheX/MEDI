import styled from 'styled-components';
import * as TabsPrimitive from '@radix-ui/react-tabs';

export const Tabs = TabsPrimitive.Root;

export const TabsList = styled(TabsPrimitive.List)`
    display: grid;
    gap: 0.3rem;
    grid-template-columns: repeat(4, 1fr);
    background-color: #f1f1f1;
    padding: 0.3rem;
    border-radius: 8px;
`;

export const TabsTrigger = styled(TabsPrimitive.Trigger)`
    padding: 0.5rem 1rem;
    font-size: 14px;
    font-weight: 600;
    border-radius: 4px;
    transition: background-color 0.2s;
    color: hsl(215.4 16.3% 46.9%);
    border: 0;
    cursor: pointer;

    &[data-state='active'] {
        background-color: white;
        color: hsl(222.2 84% 4.9%);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
`;

export const TabsContent = styled(TabsPrimitive.Content)`
    margin-top: 16px;
`;

export const TabsContentContainer = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
`;
