import React from "react";

export default function LoadingComp() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="position-absolute start-50 top-50 translate-middle">
        <div className="spinner-grow text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}
