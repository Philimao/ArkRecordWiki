import React, { useState } from "react";
import { Link } from "react-router-dom";
import FloatingInputBox from "../shared/FloatingInputBox";
import { toast } from "react-toastify";

export default function Reset() {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      return evt.target.classList.add("was-validated");
    }
    setEmail("");
    toast.info("正在发送邮件，请稍后...");
    fetch("/authentication/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((resRaw) => {
        if (!resRaw.ok) {
          resRaw.text().then((res) => {
            toast.warning(res);
          });
        } else {
          if (resRaw.status === 204) {
            toast.info("邮件已发送！请检查邮箱");
          } else {
            resRaw.text().then((res) => {
              setResetLink(res);
            });
          }
        }
      })
      .catch((err) => {
        toast.warning(err);
      });
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h1 className="text-center mb-4">重置密码</h1>
      {resetLink ? (
        <div className="mb-3">
          由于邮箱每日发送邮件限额达到上限，请点击此<a href={resetLink}>链接</a>
          直接访问重置密码界面。此链接有效期为10分钟。
        </div>
      ) : null}
      <FloatingInputBox
        id="邮箱"
        label="邮箱"
        value={email}
        type="email"
        onChange={(evt) => setEmail(evt.target.value)}
        feedback="请输入合法的邮箱地址"
        required={true}
      />
      <div className="invalid-feedback">no!!!</div>
      <button className="mb-3 btn btn-primary text-center">提交</button>
      <div className="mb-2 d-flex justify-content-end">
        <Link className="text-end d-block" to="/auth/login">
          返回登录页
        </Link>
      </div>
    </form>
  );
}
