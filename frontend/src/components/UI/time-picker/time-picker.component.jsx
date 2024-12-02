import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TimePickerContainer, TimePickerSelect } from './time-picker.styles';
import { appointmentConsts } from '../../../constants/apointment-form.const';

const TimePicker = ({ value, onChange, id = 'hora', disabled }) => {
    const { hours, minutes } = appointmentConsts;

    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [period, setPeriod] = useState('AM');

    // Parse the initial value to set state correctly
    useEffect(() => {
        if (value) {
            const [hours24, minutes] = value.split(':');
            const hours24Int = parseInt(hours24, 10);

            const isPM = hours24Int >= 12;
            let hours12 = hours24Int > 12 ? hours24Int - 12 : hours24Int;
            if (hours12 === 0) hours12 = 12;

            setHour(hours24); // Store 24-hour format directly
            setMinute(minutes);
            setPeriod(isPM ? 'PM' : 'AM');
        }
    }, [value]);

    // Notify the parent component of the selected time
    const updateTime = (newHour, newMinute) => {
        onChange({ target: { id, value: `${newHour}:${newMinute}` } });
    };

    const handleHourChange = (newHour) => {
        setHour(newHour);

        // Automatically adjust period based on hour
        const isPM = parseInt(newHour, 10) >= 12;
        const newPeriod = isPM ? 'PM' : 'AM';
        setPeriod(newPeriod);

        updateTime(newHour, minute, newPeriod);
    };

    const handleMinuteChange = (newMinute) => {
        setMinute(newMinute);
        updateTime(hour, newMinute, period);
    };

    const handlePeriodChange = (newPeriod) => {
        setPeriod(newPeriod);
        updateTime(hour, minute, newPeriod);
    };

    return (
        <TimePickerContainer>
            {/* Hour Select */}
            <TimePickerSelect
                value={hour}
                disabled={disabled}
                onChange={(e) => handleHourChange(e.target.value)}
            >
                <option value="">Hour</option>
                {hours.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </TimePickerSelect>

            {/* Minute Select */}
            <TimePickerSelect
                value={minute}
                disabled={disabled}
                onChange={(e) => handleMinuteChange(e.target.value)}
            >
                <option value="">Minute</option>
                {minutes.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </TimePickerSelect>

            {/* Period Select */}
            <TimePickerSelect
                value={period}
                disabled={true}
                onChange={(e) => handlePeriodChange(e.target.value)}
            >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </TimePickerSelect>
        </TimePickerContainer>
    );
};

TimePicker.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string,
    disabled: PropTypes.bool,
};

export default TimePicker;
