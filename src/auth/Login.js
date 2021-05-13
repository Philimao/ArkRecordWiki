import React, { useState } from "react";
import { Link } from "react-router-dom";
import { hashCode } from "../utils";
import FloatingInputBox from "../shared/FloatingInputBox";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      return evt.target.classList.add("was-validated");
    }
    setUsername("");
    setPassword("");
    const checked = document.querySelector(".form-check-input").checked;
    const hash = await hashCode(password);
    const data = {
      username: username,
      password: hash,
      checked: checked,
    };
    fetch("/authentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resRaw) => {
        if (!resRaw.ok) {
          resRaw.text().then((res) => {
            toast.warning(res);
          });
        } else {
          toast.info("登录成功");
          setTimeout(() => {
            window.location = "/";
          }, 1000);
        }
      })
      .catch((err) => {
        toast.warning(err);
      });
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h1 className="text-center mb-4">登录</h1>
      <FloatingInputBox
        id="用户名"
        label="用户名"
        value={username}
        onChange={(evt) => setUsername(evt.target.value)}
        feedback="请输入用户名或邮箱地址"
        required={true}
      />
      <FloatingInputBox
        id="密码"
        label="密码"
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
        type="password"
        feedback="请输入密码"
        required={true}
      />
      <div className="mb-3 form-check">
        <label className="form-check-label">
          保持登录状态
          <input type="checkbox" className="form-check-input" />
        </label>
      </div>
      <button className="mb-3 btn btn-primary text-center">登录</button>
      <div className="mb-2 d-flex justify-content-end">
        <Link className="text-end d-block" to="/auth/signup">
          还没有账号？点击注册
        </Link>
      </div>
      <div className="mb-2 d-flex justify-content-end">
        <Link className="text-end d-block" to="/auth/reset">
          重置密码
        </Link>
      </div>
    </form>
  );
}
