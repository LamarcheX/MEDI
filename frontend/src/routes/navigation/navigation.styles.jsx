import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavigationContainer = styled.div`
    display: flex;
    height: 7.2vh;
    align-items: center;
    justify-content: space-between;
    width: 95%;
    margin: 0 auto;
    border-bottom: 0.5px solid #000;
`;

export const NavigationLogo = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #000;
    font-size: 1.5rem;
    font-weight: 700;

    h1 {
        margin: 0;
    }
`;

export const NavigationLogoImage = styled.img`
    width: 370px;
    height: 40px;
    aspect-ratio: 370 / 40;
`;

export const NavigationList = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
`;

export const NavigationItem = styled(NavLink)`
    text-decoration: none;
    color: #000;
    font-size: 1rem;
    font-weight: 500;
    margin-left: 1rem;
    transition: color 0.2s;

    &:hover {
        color: #CEA721;
    }
    
    &.active{
        filter: brightness(70%);
        color: #CEA721;
    }
`;
