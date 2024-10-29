import { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../input.styles';

const DatePicker = ({ value, onChange }) => {
    const [fecha, setFecha] = useState("");

    // Function to check if the selected date is between Monday (1) and Saturday (6)
    const isValidDay = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDay(); // 0 = Sunday, 6 = Saturday
        return day >= 1 && day <= 5; // Monday (1) to Saturday (6)
    };

    // Handle change to allow only valid days (Monday to Saturday)
    const handleChange = (e) => {
        const selectedDate = e.target.value;
        if (isValidDay(selectedDate)) {
            setFecha(selectedDate); // Update the state if valid
            onChange(e); // Pass the date to the parent component
        } else {
            alert("Please select a date from Monday to Saturday.");
            setFecha(""); // Reset the input if invalid
        }
    };

    // Get today's date in the format yyyy-mm-dd
    const today = new Date().toISOString().split("T")[0];

    return (
        <Input
            id="fecha"
            type="date"
            onChange={handleChange}
            value={fecha || value}
            name="fecha"
            min={today} // Disable past dates
        />
    );
};

DatePicker.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default DatePicker;
