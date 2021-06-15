import React, { useEffect, useState } from "react";
import PendingRecord from "./PendingRecord";
import ReviewForm from "./ReviewForm";
import LoadingComp from "../../shared/LoadingComp";
import { toast } from "react-toastify";
import Modal from "../../shared/Modal";
import ReviewFormControl from "./ReviewFormControl";
import { nanoid } from "nanoid";

export default function ReviewPage({ operators, refresh, menu, categories }) {
  const [pendingArray, setPendingArray] = useState();
  const [index, setIndex] = useState(0);
  const [reviewMsg, setReviewMsg] = useState("");
  const [record, setRecord] = useState();

  const [groupArray, setGroupArray] = useState([
    "bug修复记录失效",
    "开荒记录（不使用关卡实装后才上线的干员）",
  ]);

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

  useEffect(() => {
    if (pendingArray && pendingArray[index]) {
      setRecord(pendingArray[index]);
    } else {
      setRecord(undefined);
    }
  }, [index, pendingArray]);

  function prevRecord() {
    if (!pendingArray[index]) {
      setIndex(0);
      return;
    }
    if (index >= 1) {
      setIndex(index - 1);
    }
  }

  function nextRecord() {
    if (!pendingArray[index]) {
      setIndex(0);
      return;
    }
    if (index < pendingArray.length - 1) {
      setIndex(index + 1);
    }
  }

  function reviewMessage() {
    const id = nanoid();

    const responseArray = [
      "阵容格式不符合提交要求",
      "该纪录不在收录范围内",
      "已有更少人记录，详情请参见收录原则",
      "链接格式不符合要求",
    ];

    function quickResponse(index) {
      setReviewMsg(responseArray[index]);
    }
    return (
      <div className="px-2">
        <label className="form-label" htmlFor={id}>
          给用户的留言将会被展示在审核通过/不通过的系统消息中（可选）：
        </label>
        <textarea
          value={reviewMsg}
          onChange={(evt) => setReviewMsg(evt.target.value)}
          className="form-control mb-3"
          id={id}
          rows="10"
        />
        <label htmlFor="quick_response" className="form-label">
          点击使用快速回复
        </label>
        <ul className="list-group" id="quick_response">
          <li
            className="list-group-item"
            role="button"
            onClick={() => quickResponse(0)}
          >
            {responseArray[0]}
          </li>
          <li
            className="list-group-item"
            role="button"
            onClick={() => quickResponse(1)}
          >
            {responseArray[1]}
          </li>
          <li
            className="list-group-item"
            role="button"
            onClick={() => quickResponse(2)}
          >
            {responseArray[2]}
          </li>
          <li
            className="list-group-item"
            role="button"
            onClick={() => quickResponse(3)}
          >
            {responseArray[3]}
          </li>
        </ul>
      </div>
    );
  }

  async function handleSubmit() {
    const temp = pendingArray[index];
    for (let key of Object.keys(record)) {
      temp[key] = record[key];
    }

    if (temp.category.length === 0) {
      temp.category.push("常规队");
    }
    temp.category.sort((a, b) => {
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

    const resRaw = await fetch("/record/accept-pending", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(temp),
    });
    const res = await resRaw.text();
    if (!resRaw.ok) {
      toast.warning("提交失败\n" + res);
    } else {
      toast.info(res);
      setPendingArray((prev) => {
        const newArray = JSON.parse(JSON.stringify(prev));
        newArray.splice(index, 1);
        return newArray;
      });
      prevRecord();
      setReviewMsg("");
    }
  }

  async function handleDelete() {
    if (window.confirm("确认是否删除该纪录？")) {
      const resRaw = await fetch("/record/delete-pending", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: record._id,
          submitter: record.submitter,
          reviewer: record.reviewer,
          msg: reviewMsg,
        }),
      });
      if (!resRaw.ok) {
        resRaw.text().then((res) => {
          toast.warning("删除失败\n" + res);
        });
      } else {
        toast.info("删除成功");
        setPendingArray((prev) => {
          const newArray = JSON.parse(JSON.stringify(prev));
          newArray.splice(index, 1);
          return newArray;
        });
        prevRecord();
        setReviewMsg("");
      }
    }
  }

  async function handleArchive() {
    if (window.confirm("是否归档此纪录？（归档前最好备注一下内容）")) {
      const resRaw = await fetch("/record/archive-pending", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });
      const res = await resRaw.text();
      if (!resRaw.ok) {
        toast.warning("提交失败\n" + res);
      } else {
        toast.info(res);
        setPendingArray((prev) => {
          const newArray = JSON.parse(JSON.stringify(prev));
          newArray.splice(index, 1);
          return newArray;
        });
        prevRecord();
        setReviewMsg("");
      }
    }
  }

  function PendingRecords() {
    if (!pendingArray || pendingArray.length === 1) return null;
    return pendingArray.map((record, i) => (
      <PendingRecord
        index={i}
        setIndex={setIndex}
        record={record}
        key={"Pending-" + i}
      />
    ));
  }

  if (!pendingArray) return <LoadingComp />;
  return (
    <div>
      <ReviewForm
        menu={menu}
        operators={operators}
        categories={categories}
        record={record}
        setRecord={setRecord}
        groupArray={groupArray}
      />
      <ReviewFormControl
        record={record}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        handleArchive={handleArchive}
        prevRecord={prevRecord}
        nextRecord={nextRecord}
      />
      <div className="mt-5">
        <PendingRecords />
      </div>
      <Modal
        id="approve_message_modal"
        handleSubmit={() => {
          if (reviewMsg.length !== 0) {
            handleSubmit().catch(console.log);
          }
        }}
        Content={reviewMessage}
        header="通过纪录-审核反馈"
      />
      <Modal
        id="reject_message_modal"
        handleDelete={() => {
          if (reviewMsg.length !== 0) {
            handleDelete().catch(console.log);
          }
        }}
        Content={reviewMessage}
        header="删除纪录-审核反馈"
      />
    </div>
  );
}
