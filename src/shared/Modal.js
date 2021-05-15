import React, { useRef } from "react";
import propTypes from "prop-types";

/**
 * @param props.id
 * @param props.header
 * @param props.Content
 * @param props.handleSubmit
 * @param props.handleDelete
 * @param props.handleClose
 * @param props.customButton
 * @returns {JSX.Element}
 */
export default function Modal(props) {
  const modal = useRef();

  return (
    <div
      className="modal fade"
      id={props.id}
      tabIndex="-1"
      aria-hidden="true"
      ref={modal}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.header}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                if (props.handleClose) {
                  props.handleClose();
                }
              }}
            />
          </div>
          <div className="modal-body">{props.Content()}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                if (props.handleClose) {
                  props.handleClose();
                }
              }}
            >
              关闭
            </button>
            {!props.handleSubmit ? null : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  props.handleSubmit();
                }}
              >
                提交
              </button>
            )}
            {!props.handleDelete ? null : (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  props.handleDelete();
                }}
              >
                删除
              </button>
            )}
            {props.customButton ? props.customButton() : null}
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  id: propTypes.string.isRequired,
  header: propTypes.string.isRequired,
  Content: propTypes.elementType.isRequired,
  handleSubmit: propTypes.func,
  handleDelete: propTypes.func,
  handleClose: propTypes.func,
  customButton: propTypes.elementType,
};
