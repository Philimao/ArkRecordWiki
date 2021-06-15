import React, { useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";

export default function ReportRecordModal({ user, reportRecord }) {
  const [reportValue, setReportValue] = useState("");

  if (!user) return null;

  async function handleReportSubmit() {
    if (reportValue.length === 0) return toast.warning("请填写具体问题！");
    setReportValue("");
    const resRaw = await fetch("/record/report-record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "report-record",
        username: user.username,
        record: reportRecord,
        msg: reportValue,
        date_created: new Date(),
      }),
    });
    if (!resRaw.ok) {
      resRaw.text().then((res) => {
        toast.warning("提交失败\n" + res);
      });
    } else {
      toast.info("我们已收到您的反馈，将会尽快处理！请关闭页面");
    }
  }

  function reportContent() {
    if (!reportRecord) return null;
    return (
      <form className="px-2">
        <div className="mb-3">
          <div className="mb-1">{"攻略者： " + reportRecord.raider}</div>
          <div>{"队伍组成： " + reportRecord.team.join(" + ")}</div>
        </div>
        <label className="form-label" htmlFor="report_content">
          请填写具体问题
        </label>
        <textarea
          value={reportValue}
          onChange={(evt) => setReportValue(evt.target.value)}
          className="form-control"
          name="report_content"
          id="report_content"
          rows="10"
        />
      </form>
    );
  }

  return (
    <Modal
      id="report_record"
      header="这个纪录有问题"
      Content={reportContent}
      handleSubmit={handleReportSubmit}
    />
  );
}
