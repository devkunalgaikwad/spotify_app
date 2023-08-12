import React from 'react';

const Seekbar = ({ value, max, onChange }) => {
    const handleChange = (event) => {
        const newValue = parseFloat(event.target.value);
        onChange(newValue);
    };

    return (
        <input
            type="range"
            className='w-full'
            value={value}
            max={max}
            onChange={handleChange}
        />
    );
};

export default Seekbar;
