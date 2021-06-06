import React from "react";

export default function ReviewFormControl({
  record,
  handleSubmit,
  handleDelete,
  handleArchive,
  prevRecord,
  nextRecord,
}) {
  return (
    <div className="mb-3 d-sm-flex">
      <div className="me-auto mb-2 mb-sm-0">
        <button
          type="submit"
          className="btn btn-primary me-2"
          disabled={!record}
          onClick={handleSubmit}
        >
          通过
        </button>
        <button
          className="btn btn-primary me-2"
          onClick={(evt) => evt.preventDefault()}
          data-bs-toggle="modal"
          data-bs-target="#approve_message_modal"
          disabled={!record}
        >
          提供反馈并通过
        </button>
        <button
          className="btn btn-danger me-2"
          onClick={handleDelete}
          disabled={!record}
        >
          删除
        </button>
        <button
          className="btn btn-danger me-2"
          onClick={(evt) => evt.preventDefault()}
          data-bs-toggle="modal"
          data-bs-target="#reject_message_modal"
          disabled={!record}
        >
          提供反馈并删除
        </button>
        <button
          className="btn btn-success me-auto"
          onClick={handleArchive}
          disabled={!record}
        >
          归档
        </button>
      </div>
      <button
        className="btn btn-primary me-2"
        onClick={prevRecord}
        disabled={!record}
      >
        上一个
      </button>
      <button
        className="btn btn-primary"
        onClick={nextRecord}
        disabled={!record}
      >
        下一个
      </button>
    </div>
  );
}
