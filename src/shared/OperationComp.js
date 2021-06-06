import React from "react";
import propTypes from "prop-types";
import Modal from "./Modal";
import SubmitForm from "../submit/SubmitForm";

export default function OperationComp({
  user,
  story,
  episode,
  operation,
  menu,
  menuButtons,
  operators,
  categories,
}) {
  const custom = operation.custom ? operation.custom : [];

  const full_operation = operation.operation + " " + operation.cn_name;
  const current_id = menuButtons.current[full_operation].index;

  function prevButton() {
    const prev_id = current_id - 1;
    if (prev_id % 100 !== 0) {
      const prev = document.querySelector("#btn" + prev_id);
      prev.click();
    }
  }

  function nextButton() {
    const next_id = current_id + 1;
    if (next_id % 100 !== 0) {
      const next = document.querySelector("#btn" + next_id);
      if (next) {
        next.click();
      }
    }
  }

  function quickSubmit() {
    return (
      <SubmitForm
        user={user}
        menu={menu}
        operators={operators}
        categories={categories}
        pStory={story}
        pEpisode={episode}
        pOperation={operation.operation}
      />
    );
  }

  function handleModalClose() {
    document.querySelector("#btn" + current_id).click();
  }

  return (
    <div className="operation-comp mb-3">
      <div className="d-lg-flex">
        <h3 className="fw-bold me-auto mb-2 text-nowrap">{full_operation}</h3>
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
      <div className="fw-light mb-3">{operation.description}</div>
      <img src={operation.preview} alt="preview" className="img-fluid mb-3" />
      <div>
        {custom.map((item, index) => (
          <div key={"custom" + index} className="mb-3">
            <div className="mb-1 h5">{item.name}</div>
            <div className="fw-light">{item.value}</div>
          </div>
        ))}
      </div>
      {user ? (
        <Modal
          id="quick_submit"
          header="快速提交"
          Content={quickSubmit}
          handleClose={handleModalClose}
        />
      ) : null}
    </div>
  );
}

OperationComp.propTypes = {
  operation: propTypes.object.isRequired,
};
