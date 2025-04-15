import PropTypes from "prop-types";
import "./Checkbox.scss";

const Checkbox = ({ id, checked, onChange, disabled }) => {
  return (
    <label className="checkbox-container">
      <input
        className="checkbox-input"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className="checkbox-custom"></span>
    </label>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Checkbox;
