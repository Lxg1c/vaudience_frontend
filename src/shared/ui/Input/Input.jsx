import PropTypes from "prop-types";
import "./Input.scss";

const Input = ({ placeholder, onChange, name, disabled = false, type = "text" }) => {
  return (
    <input
      type={type}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="input"
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

Input.displayName = "Input";

export default Input;
