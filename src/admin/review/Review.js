import React, { useEffect, useState } from "react";
import PendingRecord from "./PendingRecord";
import ReviewForm from "./ReviewForm";
import LoadingComp from "../../shared/LoadingComp";
import { toast } from "react-toastify";

export default function Review({ operators, refresh, menu }) {
  const [pendingArray, setPendingArray] = useState();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/record/all-pending").then((resRaw) => {
      if (!resRaw.ok) {
        resRaw.text().then((res) => {
          toast.warning("获取未处理纪录失败\n" + res);
        });
      } else {
        resRaw.json().then((res) => {
          setPendingArray(res);
        });
      }
    });
  }, [refresh]);

  const pending = () => {
    if (!pendingArray) return null;
    return pendingArray.map((record, i) => (
      <PendingRecord
        index={i}
        setIndex={setIndex}
        record={record}
        key={"Pending-" + i}
      />
    ));
  };

  if (!pendingArray) return <LoadingComp />;
  return (
    <div>
      <ReviewForm
        index={index}
        pendingArray={pendingArray}
        setPendingArray={setPendingArray}
        setIndex={setIndex}
        operators={operators}
        menu={menu}
      />
      <div className="mt-5">{pending()}</div>
    </div>
  );
}
