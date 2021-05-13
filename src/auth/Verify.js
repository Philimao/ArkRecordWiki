import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function Verify() {
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
      <div>已经向您的邮箱发送了验证码</div>
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
    </form>
  );
}
