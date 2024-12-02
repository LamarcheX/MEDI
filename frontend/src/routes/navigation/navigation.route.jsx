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
import { useDispatch } from "react-redux";
import { logoutCenterStart } from "../../store/center/center.action.js";

const Navigation = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutCenterStart());
        alert("Logged out");
    };

    return (
        <Fragment>
            <NavigationContainer>
                <NavigationLogo>
                    <NavigationLogoImage src="https://pastoraldelasaludrd.com/images/Logos/PASTORAL1.png" />
                </NavigationLogo>
                <NavigationList>
                    {navOptions.map((option, index) => (
                        <NavigationItem key={index} to={option.route}>
                            {option.name}
                        </NavigationItem>
                    ))}
                    <NavigationItem
                        onClick={handleLogout}
                        to="/login"
                    >
                        Logout
                    </NavigationItem>
                </NavigationList>
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
