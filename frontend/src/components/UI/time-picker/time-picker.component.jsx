import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TimePickerContainer, TimePickerSelect } from './time-picker.styles';

const TimePicker = ({ value, onChange, id = "hora" }) => {
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [period, setPeriod] = useState('AM');

    // Parse the initial value to set state correctly
    useEffect(() => {
        if (value) {
            const [hours24, minutes] = value.split(':');
            const hours24Int = parseInt(hours24, 10);

            let period = hours24Int >= 12 ? 'PM' : 'AM';
            let hours12 = hours24Int > 12 ? hours24Int - 12 : hours24Int;
            if (hours12 === 0) hours12 = 12;

            setHour(hours12.toString());
            setMinute(minutes);
            setPeriod(period);
        }
    }, [value]);

    // Convert the selected 12-hour time to 24-hour format
    const convertTo24Hour = (hour12, minute, period) => {
        let hour24 = parseInt(hour12, 10);
        if (period === 'PM' && hour24 !== 12) hour24 += 12;
        if (period === 'AM' && hour24 === 12) hour24 = 0;

        return `${hour24.toString().padStart(2, '0')}:${minute}`;
    };

    // Update the time and notify parent component
    const updateTime = (newHour, newMinute, newPeriod) => {
        const time24 = convertTo24Hour(newHour, newMinute, newPeriod);
        onChange({ target: { id, value: time24 } }); // Emit with the `id`
    };

    const handleHourChange = (newHour) => {
        setHour(newHour);

        // Automatically adjust period
        let adjustedPeriod = period;
        if (newHour >= '1' && newHour <= '4') adjustedPeriod = 'PM';
        if (newHour >= '8' && newHour <= '11') adjustedPeriod = 'AM';

        setPeriod(adjustedPeriod);
        updateTime(newHour, minute, adjustedPeriod);
    };

    const handleMinuteChange = (newMinute) => {
        setMinute(newMinute);
        updateTime(hour, newMinute, period);
    };

    const handlePeriodChange = (newPeriod) => {
        setPeriod(newPeriod);
        updateTime(hour, minute, newPeriod);
    };

    const generateHours = () => {
        const hours = [];
        for (let i = 8; i <= 12; i++) hours.push(i.toString());
        for (let i = 1; i <= 6; i++) hours.push(i.toString());
        return hours;
    };

    const generateMinutes = () => {
        const minutes = [];
        for (let i = 0; i < 60; i += 10) {
            minutes.push(i.toString().padStart(2, '0'));
        }
        return minutes;
    };

    return (
        <TimePickerContainer>
            <TimePickerSelect value={hour} onChange={(e) => handleHourChange(e.target.value)}>
                <option value="">Hour</option>
                {generateHours().map((h) => (
                    <option key={h} value={h}>
                        {h}
                    </option>
                ))}
            </TimePickerSelect>

            <TimePickerSelect value={minute} onChange={(e) => handleMinuteChange(e.target.value)}>
                <option value="">Minute</option>
                {generateMinutes().map((m) => (
                    <option key={m} value={m}>
                        {m}
                    </option>
                ))}
            </TimePickerSelect>

            <TimePickerSelect value={period} onChange={(e) => handlePeriodChange(e.target.value)}>
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
};

export default TimePicker;
