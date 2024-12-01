import PropTypes from 'prop-types'
import {
    SwitchRoot,
    SwitchThumb
} from './toggle-button.style.jsx'
import { Label } from '../label.styles.jsx';

const ToggleButton = ({ onChange, isToggled, label, name, ...otherProps }) => {
    return (
        <>
            <Label htmlFor={name}>{label}</Label>
            {/* <Input
                checked={isToggled}
                onCheckedChange={onChange}
                id={name}
                {...otherProps}
            />
            <Slider /> */}
            <SwitchRoot
                checked={isToggled}
                onCheckedChange={onChange}
                id={name}
                {...otherProps}
            >
                <SwitchThumb />
            </SwitchRoot>
        </>
    );
}

ToggleButton.propTypes = {
    onChange: PropTypes.func,
    isToggled: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string
}

export default ToggleButton
