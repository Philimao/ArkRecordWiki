import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Verify({ serverCode }) {
  const [code, setCode] = useState("");
  let history = useHistory();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const resRaw = await fetch("/mail/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code }),
      });
      if (!resRaw.ok) {
        const res = await resRaw.text();
        toast.warning(res);
      } else {
        toast.info("验证通过！请登录");
        history.push("/auth/login");
      }
    } catch (err) {
      alert(err);
      console.log("Err", err);
    }
  }

  return (
    <form className="form" id="verify_form" onSubmit={handleSubmit}>
      <h1 className="text-center mb-4">验证</h1>
      {serverCode ? (
        <div className="mb-3">
          由于注册人数过多邮箱每日发送量达到上限，因此请直接输入以下验证码：
          <strong>{serverCode}</strong>。此验证码有效期为10分钟。
        </div>
      ) : (
        <div className="mb-3">已经向您的邮箱发送了验证码</div>
      )}
      <div className="form-floating my-3">
        <input
          type="text"
          className="form-control"
          id="verify_code"
          name="verify_code"
          minLength="6"
          maxLength="6"
          value={code}
          onChange={(evt) => setCode(evt.target.value)}
          required
        />
        <label htmlFor="verify_code">请输入验证码</label>
      </div>
      <div className="mb-4 justify-content-center">
        <button type="submit" className="btn btn-primary">
          提交
        </button>
      </div>
      <div
        className="d-flex justify-content-end mb-2"
        onClick={() => {
          navigator.clipboard.writeText("1029020121").then(() => {
            toast.info("复制成功！");
          });
        }}
        role="button"
      >
        <OverlayTrigger
          placement="auto"
          overlay={
            <Tooltip id="security-tooltip">
              <div className="text-start p-2">
                首先请尝试更换现代浏览器（Chrome/Firefox/Edge等）访问，如果依然无法注册请通过主页联络表格联系我们，或是添加客服娘QQ：1029020121，单击即可复制
              </div>
            </Tooltip>
          }
        >
          <span>验证码不正确</span>
        </OverlayTrigger>
      </div>
    </form>
  );
}
