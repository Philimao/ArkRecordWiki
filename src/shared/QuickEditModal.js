import React, { useState } from "react";
import Modal from "./Modal";
import ReviewForm from "../admin/review/ReviewForm";
import { toast } from "react-toastify";

export default function QuickEditModal({
  user,
  menu,
  operators,
  categories,
  record,
  setRecord,
  setRefresh,
}) {
  const [groupArray, setGroupArray] = useState([
    "bug修复记录失效",
    "开荒记录（不使用关卡实装后才上线的干员）",
  ]);

  async function handleSubmit() {
    if (record.category.length === 0) {
      record.category.push("常规队");
    }
    record.category.sort((a, b) => {
      const indexA = categories.indexOf(a);
      const indexB = categories.indexOf(b);
      return indexA - indexB;
    });

    // add new group to the datalist
    setGroupArray((prev) => {
      const set = new Set(prev);
      set.add(record.group);
      return Array.from(set);
    });

    const resRaw = await fetch("/record/update-record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    const res = await resRaw.text();
    if (!resRaw.ok) {
      toast.warning("更新失败\n" + res);
    } else {
      setRecord(undefined);
      setRefresh((prev) => !prev);
      toast.info(res);
    }
  }

  function quickReview() {
    return (
      <ReviewForm
        menu={menu}
        operators={operators}
        categories={categories}
        record={record}
        setRecord={setRecord}
        groupArray={groupArray}
      />
    );
  }

  if (!(menu && user && (user.role === "admin" || user.role === "su"))) {
    return null;
  }
  return (
    <Modal
      id="quick_edit"
      header="快速编辑"
      Content={quickReview}
      handleSubmit={record ? handleSubmit : undefined}
      handleClose={(evt) => {
        if (evt) evt.preventDefault();
        setRecord(undefined);
        setRefresh((prev) => !prev);
      }}
    />
  );
}
