import React from "react";
import SubmitForm from "./SubmitForm";

export default function SubmitPage(props) {
  return (
    <div className="container">
      <SubmitForm {...props} />
    </div>
  );
}
