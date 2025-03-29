import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = React.forwardRef(({ placeholder, disabled = false, type = 'text' }, ref) => {
    return (
        <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className="input"
        />
    );
});

Input.propTypes = {
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
};

Input.displayName = 'Input';

export default Input;