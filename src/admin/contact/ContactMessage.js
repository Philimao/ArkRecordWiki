import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

export default function ContactMessage({ user }) {
  const [messages, setMessages] = useState();
  const [updateContact, refreshPage] = useState(false);
  const keyArray = useRef([]);
  if (messages && messages.length > 0 && keyArray.current.length === 0) {
    keyArray.current = Array(messages.length)
      .fill(0)
      .map(() => nanoid());
  }

  useEffect(() => {
    fetch("/user/contact").then((resRaw) => {
      if (!resRaw.ok) {
        resRaw.text().then((res) => {
          toast.warning("获取系统消息失败\n" + res);
        });
      } else {
        resRaw.json().then((res) => {
          setMessages(res);
        });
      }
    });
  }, [updateContact]);

  async function handleSolve(message) {
    if (!user) toast.warning("登录信息失效！请刷新页面");
    const resRaw = await fetch("/mail/solve-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact_id: message._id,
        reviewer: user.username,
      }),
    });
    if (!resRaw.ok) {
      resRaw.text().then((res) => {
        toast.warning("提交失败\n" + res);
      });
    } else {
      toast.info("提交成功！");
      refreshPage((prev) => !prev);
    }
  }

  async function handleUpdate(message) {
    if (!user) toast.warning("登录信息失效！请刷新页面");
    const resRaw = await fetch("/record/update-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: message.record._id,
      }),
    });
    if (!resRaw.ok) {
      resRaw.text().then((res) => {
        toast.warning("编辑失败\n" + res);
      });
    } else {
      toast.info("纪录已发送回审核页");
    }
  }

  function contactCard(message, index) {
    return (
      <div className="col-12 col-sm-6 px-1 pb-3" key={keyArray.current[index]}>
        <div className="card text-dark bg-light mb-3">
          <div className="card-header">
            <button
              className="btn p-0"
              onClick={() => {
                navigator.clipboard.writeText(message.email).then(() => {
                  toast.info("邮箱地址已复制到剪贴板");
                });
              }}
            >
              {message.username + "（点击用户名复制邮箱地址）"}
            </button>
          </div>
          <div
            className="card-body position-relative"
            style={{ minHeight: "300px" }}
          >
            <div className="mb-3">{"邮箱地址： " + message.email}</div>
            <div className="mb-1">联络内容：</div>
            <div className="mb-3" style={{ whiteSpace: "pre-wrap" }}>
              {message.msg}
            </div>
            <div className="position-absolute end-0 bottom-0 translate-middle-y pe-3">
              {user.role === "su" ? (
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleSolve(message)}
                >
                  确认解决
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function reportRecordCard(message, index) {
    return (
      <div className="col-12 col-sm-6 px-1 pb-3" key={keyArray.current[index]}>
        <div className="card text-dark bg-light mb-3">
          <div className="card-header">
            <div className="btn p-0">{message.username}</div>
          </div>
          <div className="card-body" style={{ minHeight: "300px" }}>
            <div className="mb-3">
              <div className="mb-1">
                {"关卡： " +
                  message.record.operation +
                  " " +
                  message.record.cn_name}
              </div>
              <div className="mb-1">{"攻略者： " + message.record.raider}</div>
              <div>{"队伍组成： " + message.record.team}</div>
            </div>
            <div className="mb-1">联络内容：</div>
            <div className="mb-3" style={{ whiteSpace: "pre-wrap" }}>
              {message.msg}
            </div>
            <div className="position-absolute end-0 bottom-0 translate-middle-y pe-3">
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => handleUpdate(message)}
              >
                发往审核
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() => handleSolve(message)}
              >
                确认解决
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!messages) return null;
  return (
    <div className="">
      <h4 className="text-center mb-3">纪录反馈</h4>
      <div className="row mb-4">
        {messages
          .filter((message) => message.type === "report-record")
          .map((message, index) => reportRecordCard(message, index))}
      </div>
      <h4 className="text-center mb-3">用户联络</h4>
      <div className="row mb-4">
        {messages
          .filter((message) => message.type === "contact")
          .map((message, index) => contactCard(message, index))}
      </div>
    </div>
  );
}
