import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({text, disabled=false}) => {
    return (
        <button className="button" disabled={disabled}>{text}</button>
    )
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
}

export default Button