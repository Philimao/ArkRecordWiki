import React from "react";
import Modal from "./Modal";
import SubmitForm from "../submit/SubmitForm";

export default function QuickSubmitModal({
  user,
  operationObject,
  menu,
  operators,
  categories,
  setRefresh,
}) {
  function QuickSubmit() {
    if (!user) return null;
    return (
      <SubmitForm
        user={user}
        menu={menu}
        operators={operators}
        categories={categories}
        pStory={operationObject.story}
        pEpisode={operationObject.episode}
        pOperation={operationObject.operation}
        pCnName={operationObject.cn_name}
        setRefresh={setRefresh}
      />
    );
  }

  return <Modal id="quick_submit" header="快速提交" Content={QuickSubmit} />;
}
