import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import Modal from "../../shared/Modal";
import InputBox from "../../shared/InputBox";

export default function ContactMessage({ user }) {
  const [messages, setMessages] = useState();
  const [message, setMessage] = useState();
  const [updateContact, refreshPage] = useState(false);
  const keyArray = useRef([]);
  if (messages && messages.length > 0 && keyArray.current.length === 0) {
    keyArray.current = Array(messages.length)
      .fill(0)
      .map(() => nanoid());
  }

  const [replyHeader, setReplyHeader] = useState("对您反馈问题的回复");
  const [replyBody, setReplyBody] = useState("");

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
    const resRaw = await fetch("/record/review-record", {
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

  async function handleReply() {
    if (replyHeader.length === 0 || replyBody.length === 0) {
      return toast.warning("请完整填写！");
    }
    let resRaw;
    const data = {
      username: message.username,
      email: message.email,
      header: replyHeader,
      msg: replyBody,
    };
    setReplyHeader("对您反馈问题的回复");
    setReplyBody("");
    toast.info("发送中，请等待...");
    if (message.type === "contact") {
      resRaw = await fetch("/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      data.record = message.record;
      resRaw = await fetch("/admin/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    if (!resRaw.ok) {
      if (message.type === "contact") {
        toast.warning("邮件发送失败！");
      } else {
        toast.warning("站内信发送失败！");
      }
    } else {
      toast.info("发送成功！");
    }
  }

  function ReplyContent() {
    if (!message) return null;
    console.log(message);
    return (
      <div>
        <div className="mb-1 form-label">收件人：</div>
        <div className="mb-3">{message.username}</div>
        {message.type === "contact" ? (
          <div>
            <div className="mb-1 form-label">收件人地址：</div>
            <div className="mb-3">{message.email}</div>
          </div>
        ) : null}
        <InputBox
          value={replyHeader}
          onChange={(evt) => setReplyHeader(evt.target.value)}
          id="reply_header"
          label="邮件标题"
          placeholder="邮件标题"
        />
        <div className="mb-3">
          <label htmlFor="reply_body" className="form-label">
            邮件正文
          </label>
          <textarea
            className="form-control"
            id="reply_body"
            rows="8"
            value={replyBody}
            onChange={(evt) => setReplyBody(evt.target.value)}
            placeholder="正文"
            required
          />
        </div>
      </div>
    );
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
              <button
                className="btn btn-outline-primary me-2"
                data-bs-toggle="modal"
                data-bs-target="#reply_modal"
                onClick={() => setMessage(message)}
              >
                邮件回复
              </button>
              {user.role === "su" ? (
                <button
                  className="btn btn-outline-danger"
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
                className="btn btn-outline-primary me-2"
                data-bs-toggle="modal"
                data-bs-target="#reply_modal"
                onClick={() => setMessage(message)}
              >
                站内回复
              </button>
              <button
                className="btn btn-outline-danger"
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
      <Modal
        id="reply_modal"
        header="向联络人回信"
        Content={ReplyContent}
        handleSubmit={handleReply}
      />
    </div>
  );
}
