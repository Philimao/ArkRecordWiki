import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import propTypes from "prop-types";

export default function OperationComp({ user, operationObject, menuButtons }) {
  const custom = operationObject.custom ? operationObject.custom : [];
  const [currentId, setCurrentId] = useState();
  const history = useHistory();

  useEffect(() => {
    const full_operation =
      operationObject.operation + " " + operationObject.cn_name;
    setCurrentId(() => {
      for (let key of Object.keys(menuButtons.current)) {
        if (menuButtons.current[key] === full_operation) {
          return parseInt(key);
        }
      }
    });
  }, [menuButtons, operationObject]);

  function prevButton() {
    const prev_id = currentId - 1;
    if (prev_id % 100 !== 0 && menuButtons.current[prev_id]) {
      history.push(
        "/operation/" +
          menuButtons.current[prev_id]
            .replace(" ", "+")
            .replace("/", "_")
            .replace("/", "_")
      );
    }
  }

  function nextButton() {
    const next_id = currentId + 1;
    if (next_id % 100 !== 0 && menuButtons.current[next_id]) {
      history.push(
        "/operation/" +
          menuButtons.current[next_id]
            .replace(" ", "+")
            .replace("/", "_")
            .replace("/", "_")
      );
    }
  }

  return (
    <div className="operation-comp mb-3">
      <div className="d-lg-flex">
        <h3 className="fw-bold me-auto mb-2 text-nowrap">
          {operationObject.operation + " " + operationObject.cn_name}
        </h3>
        <div className="mb-2 operation-buttons">
          {user ? (
            <button
              id="quickSubmitButton"
              className="btn btn-primary me-2"
              data-bs-toggle="modal"
              data-bs-target="#quick_submit"
            >
              快速提交
            </button>
          ) : null}
          <button className="btn btn-primary me-2" onClick={prevButton}>
            上一关
          </button>
          <button className="btn btn-primary" onClick={nextButton}>
            下一关
          </button>
        </div>
      </div>
      <div className="fw-light mb-3">{operationObject.description}</div>
      <img
        src={operationObject.preview}
        alt="preview"
        className="img-fluid mb-3"
      />
      <div>
        {custom.map((item, index) => (
          <div key={"custom" + index} className="mb-3">
            <div className="mb-1 h5">{item.name}</div>
            <div className="fw-light">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

OperationComp.propTypes = {
  operationObject: propTypes.object.isRequired,
};
