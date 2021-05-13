import React from "react";
import propTypes from "prop-types";

/**
 * InputBox is a controlled component that represents a input and label.
 *
 * @param props.id (required) id
 * @param props.label (required) label
 * @param props.value (required) value
 * @param props.onChange (required) handler of input value
 * @param props.placeholder (required) placeholder
 * @param props.type "text" | "password" | "email" | ... , text by default
 * @param props.feedback feedback if the input fails validation
 * @param props.required true | false, false by default
 * @returns {JSX.Element}
 */
export default function InputBox(props) {
  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <input
        type={props.type === undefined ? "text" : props.type}
        className="form-control"
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        required={props.required || false}
      />
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

InputBox.propTypes = {
  id: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  placeholder: propTypes.string.isRequired,
  type: propTypes.string,
  feedback: propTypes.string,
  required: propTypes.bool,
};
