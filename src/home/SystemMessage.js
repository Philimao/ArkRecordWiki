import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import LoadingComp from "../shared/LoadingComp";
import { nanoid } from "nanoid";

export default function SystemMessage() {
  const [messages, setMessages] = useState();
  const keyArray = useRef([]);
  const messageArray = useRef([]);
  if (messages && messages.length > 0 && keyArray.current.length === 0) {
    keyArray.current = Array(messages.length)
      .fill(0)
      .map(() => nanoid());
  }

  useEffect(() => {
    fetch("/user/message").then((resRaw) => {
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
  }, []);

  async function deleteMessage(message, index) {
    const resRaw = await fetch("/user/delete-message", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: message._id,
      }),
    });
    if (!resRaw.ok) {
      const res = await resRaw.text();
      toast.warning("删除失败\n", res);
    } else {
      toast.info("删除成功！");
      messageArray.current[index].classList.add("d-none");
    }
  }

  if (!messages) return <LoadingComp />;
  return (
    <div className="">
      <h4 className="text-center mb-4">系统消息</h4>
      <div className="row">
        {messages.map((message, index) => {
          let card;
          if (message.type === "submission-approved") {
            card = (
              <div className="card text-white bg-success mb-3">
                <div className="card-header d-flex">
                  <div>{message.header}</div>
                  <button
                    className="btn btn-close ms-auto"
                    onClick={() => deleteMessage(message, index)}
                  />
                </div>
                <div className="card-body" style={{ minHeight: "150px" }}>
                  <MessageBody body={message.body} />
                </div>
              </div>
            );
          } else if (message.type === "submission-not-approved") {
            card = (
              <div className="card text-white bg-secondary mb-3">
                <div className="card-header d-flex">
                  <div>{message.header}</div>
                  <button
                    className="btn btn-close ms-auto"
                    onClick={() => deleteMessage(message, index)}
                  />
                </div>
                <div className="card-body" style={{ minHeight: "150px" }}>
                  <MessageBody body={message.body} />
                </div>
              </div>
            );
          } else {
            card = null;
          }
          return (
            <div
              className="col-12 col-sm-6 px-1 pb-3"
              ref={(el) => {
                messageArray.current[index] = el;
              }}
              key={keyArray.current[index]}
            >
              {card}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MessageBody({ body }) {
  return (
    <div className="p-3 d-flex flex-column">
      <div className="mb-2">
        {"关卡名称： " + body.operation + " " + body.cn_name}
      </div>
      <div className="flex-grow-1">
        <div className="mb-2">
          {"队伍组成： " +
            (Array.isArray(body.team) ? body.team.join("+") : body.team)}
        </div>
        <div className="mb-2">
          视频链接： <a href={body.url}>视频地址</a>
        </div>
        {body.msg ? (
          <div className="mb-2">
            <div>管理员留言：</div>
            <div style={{ whiteSpace: "pre-wrap" }}>{body.msg}</div>
          </div>
        ) : null}
      </div>
      <div className="fw-light text-end" style={{ fontSize: "0.8rem" }}>
        {"消息将在" +
          Math.floor((body.expiration - Date.now()) / 86400000) +
          "天后过期"}
      </div>
    </div>
  );
}
