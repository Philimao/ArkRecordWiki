import React from "react";

export default function PendingRecord({ record, index, setIndex }) {
  if (window.matchMedia("(min-width: 992px)").matches) {
    return (
      <div
        className="row mx-0 text-white border rounded-3 mb-3 pending-record"
        onClick={() => setIndex(index)}
        style={{ backgroundColor: "#17a2b8" }}
      >
        <div
          className="col-3 align-self-center p-2 text-center"
          style={{ backgroundColor: "rgba(0,0,0,0.3)", height: "100%" }}
        >
          {record.operation + " " + record.cn_name}
        </div>
        <div className="col-9 flex-grow-1 px-3 align-self-center row">
          <div className="col-2 align-self-center">
            {record.operationType === "normal" ? "普通" : "突袭"}
          </div>
          <div className="col-4 align-self-center">{record.raider}</div>
          <div className="col-6 align-self-center">
            {Array.isArray(record.team) ? record.team.join("+") : record.team}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="mx-0 text-white border rounded-3 mb-3"
        onClick={() => setIndex(index)}
        style={{ backgroundColor: "#17a2b8" }}
      >
        <div
          className="align-self-center p-2 text-center"
          style={{ backgroundColor: "rgba(0,0,0,0.3)", height: "100%" }}
        >
          {record.operation + " " + record.cn_name}
        </div>
        <div className="px-3 align-self-center row p-2">
          <div className="col-2 align-self-center">
            {record.operationType === "normal" ? "普通" : "突袭"}
          </div>
          <div className="col-4 align-self-center">{record.raider}</div>
          <div className="col-6 align-self-center">
            {Array.isArray(record.team) ? record.team.join("+") : record.team}
          </div>
        </div>
      </div>
    );
  }
}
