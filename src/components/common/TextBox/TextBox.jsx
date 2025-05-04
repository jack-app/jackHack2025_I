import React from 'react';
import PropTypes from 'prop-types';
import './TextBox.css';

const TextBox = ({ value, onChange, placeholder, type = 'text', className = '' }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`text-box ${className}`}
        />
    );
};

TextBox.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
};

export default TextBox;