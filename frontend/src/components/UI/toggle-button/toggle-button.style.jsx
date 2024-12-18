import styled from "styled-components";
import * as Switch from "@radix-ui/react-switch";

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    padding: 8px 4px;
    width: 176px;
`;

export const Input = styled.input`
    position: absolute;
    display: flex;
    align-items: center;
    width: 0;
    height: 0;
    
    &:checked + span {
        background-color: hsl(220.9 39.3% 11%);
        
        &:before {
            left: calc(100% - 2px);
            transform: translate(-100%);
        }
    }
`;

export const Slider = styled.span`
    display: flex;
    cursor: pointer;
    width: 45px;
    height: 22.5px;
    border-radius: 100px;
    background-color: #BFBFBF;
    position: relative;
    align-items: center;
    margin: 0 0 0 5px;
    transition: background-color 0.2s;

    &:before {
        content: "";
        position: absolute;
        display: flex;
        align-items: center;
        top: 2px;
        left: 2px;
        width: 18.9px;
        height: 18.9px;
        border-radius: 21px;
        transition: 0.2s;
        background: #FFF;
        box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);
    }

    &:active:before {
        width: 28px;
    }
`;

export const SwitchRoot = styled(Switch.Root)`
    all: unset;
    width: 45px;
    height: 22.5px;
    border-radius: 100px;
    background-color: #bfbfbf;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background-color 0.2s;

    &[data-state="checked"] {
        background-color: hsl(220.9 39.3% 11%);
    }
`;

export const SwitchThumb = styled(Switch.Thumb)`
    display: flex;
    position: absolute;
    width: 18.9px;
    height: 18.9px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);
    transition: transform 0.2s, width 0.2s;

    transform: translateX(2px);
    
    &[data-state="checked"] {
        transform: translateX(22.5px);
    }
`;
