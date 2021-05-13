import React, { useState } from "react";
import FloatingInputBox from "../shared/FloatingInputBox";
import { useParams } from "react-router-dom";
import { hashCode } from "../utils";
import { toast } from "react-toastify";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");
  const [toggle_visibility, setToggleVisibility] = useState("password");

  let { credential } = useParams();

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
    setPassword("");
    setPasswordConfirm("");
    const hash = await hashCode(password);
    if (!credential) credential = "";
    fetch("/authentication/new-password?credential=" + credential, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
          toast.info("密码更新成功");
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
      <h1 className="text-center mb-4">修改密码</h1>
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
      <button className="mb-3 btn btn-primary text-center">提交</button>
    </form>
  );
}
