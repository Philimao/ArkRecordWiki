import React from "react";
import propTypes from "prop-types";

/**
 * FloatingInputBox is a controlled component that represents a input and label.
 *
 * @param props.id (required) id
 * @param props.label (required) label
 * @param props.value (required) value
 * @param props.onChange (required) handler of input value
 * @param props.placeholder
 * @param props.type "text" | "password" | "email" | ... , text by default
 * @param props.feedback feedback if the input fails validation
 * @param props.required true | false, false by default
 * @param props.min
 * @param props.disabled
 * @returns {JSX.Element}
 */
export default function FloatingInputBox(props) {
  return (
    <div className="form-floating mb-3">
      <input
        type={props.type === undefined ? "text" : props.type}
        className="form-control"
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder ? props.placeholder : props.label}
        required={props.required || false}
        min={props.min}
        disabled={props.disabled}
      />
      <label htmlFor={props.id}>{props.label}</label>
      <div
        className={
          "invalid-feedback" + (props.feedback === undefined ? " d-none" : "")
        }
      >
        {props.feedback}
      </div>
    </div>
  );
}

FloatingInputBox.propTypes = {
  id: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  placeholder: propTypes.string,
  type: propTypes.string,
  feedback: propTypes.string,
  required: propTypes.bool,
  min: propTypes.number,
  disabled: propTypes.bool,
};
