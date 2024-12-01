import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import {
    NavigationContainer,
    NavigationItem,
    NavigationLogo,
    NavigationList,
    NavigationLogoImage,
} from "./navigation.styles.jsx";
import { navOptions } from "../../constants/navigation.const.js";

const Navigation = () => <Fragment>
    <NavigationContainer>
        <NavigationLogo>
            <NavigationLogoImage src="https://pastoraldelasaludrd.com/images/Logos/PASTORAL1.png" />
        </NavigationLogo>
        <NavigationList>
            {navOptions.map((option, index) => (
                <NavigationItem key={index} to={option.route}>
                    <li>{option.name}</li>
                </NavigationItem>
            ))}
        </NavigationList>
    </NavigationContainer>
    <Outlet />
</Fragment>;

export default Navigation;
