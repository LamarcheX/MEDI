import PropTypes from 'prop-types'
import {
    InputWrapper,
    Input,
    Slider
} from './toggle-button.style.jsx'

const ToggleButton = ({ onChange, isToggled, label, ...otherProps }) => {
    return (
        <InputWrapper>
            {label}
            <div className="date-separator"/>
            <Input type="checkbox" checked={isToggled} onChange={onChange} {...otherProps} />
            <Slider />
        </InputWrapper>
    );
}

ToggleButton.propTypes = {
    onChange: PropTypes.func,
    isToggled: PropTypes.bool,
    label: PropTypes.string
}

export default ToggleButton
