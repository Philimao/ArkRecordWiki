import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FloatingInputBox from "../shared/FloatingInputBox";
import { hashCode } from "../utils";
import { toast } from "react-toastify";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");
  const [toggle_visibility, setToggleVisibility] = useState("password");
  let history = useHistory();

  function handlePasswordConfirm(evt) {
    setPasswordConfirm(evt.target.value);
    if (evt.target.value !== password) {
      evt.target.classList.add("is-invalid");
    } else {
      evt.target.classList.remove("is-invalid");
    }
  }

  function handleToggleVisibility() {
    setToggleVisibility(toggle_visibility === "password" ? "text" : "password");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      return evt.target.classList.add("was-validated");
    }
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    const hash = await hashCode(password);
    fetch("/mail/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: hash,
      }),
    })
      .then((resRaw) => {
        console.log(resRaw);
        if (!resRaw.ok) {
          resRaw.text().then((res) => {
            toast.warning(res);
          });
        } else {
          toast.info("注册成功！请检查邮箱");
          history.push("/auth/verify");
        }
      })
      .catch((err) => {
        toast.warning(err);
      });
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h1 className="text-center mb-4">注册</h1>
      <FloatingInputBox
        id="邮箱"
        label="邮箱"
        value={email}
        type="email"
        onChange={(evt) => setEmail(evt.target.value)}
        feedback="请输入合法的邮箱地址"
        required={true}
      />
      <FloatingInputBox
        id="密码"
        label="密码"
        value={password}
        type={toggle_visibility}
        onChange={(evt) => setPassword(evt.target.value)}
        feedback="请输入密码"
        required={true}
      />
      <FloatingInputBox
        id="再次确认密码"
        label="再次确认密码"
        value={password_confirm}
        type={toggle_visibility}
        onChange={handlePasswordConfirm}
        feedback="两次输入的密码不匹配"
        required={true}
      />
      <div className="mb-3 form-check">
        <label className="form-check-label">
          <input
            type="checkbox"
            className="form-check-input"
            onClick={handleToggleVisibility}
          />
          显示密码
        </label>
      </div>
      <button className="mb-3 btn btn-primary text-center">注册</button>
      <div className="mb-2 d-flex justify-content-end">
        <Link className="text-end d-block" to="/auth/login">
          返回登录页
        </Link>
      </div>
    </form>
  );
}
