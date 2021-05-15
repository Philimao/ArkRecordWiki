import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FloatingInputBox from "../shared/FloatingInputBox";
import { hashCode } from "../utils";
import { toast } from "react-toastify";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");
  const [toggle_visibility, setToggleVisibility] = useState("password");
  const [showVerify, setShowVerify] = useState(false);
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
          setTimeout(() => {
            if (window.location.path !== "/auth/verify") {
              setShowVerify(true);
            }
          }, 5000);
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
      {showVerify ? (
        <Link className="mb-3 btn btn-primary" to="/auth/verify">
          如果网页没有自动跳转，请点击此处
        </Link>
      ) : (
        <button className="mb-3 btn btn-primary text-center">注册</button>
      )}
      <div className="mb-2">
        <div className="mb-2 text-end">
          <Link className="text-end" to="/auth/login">
            返回登录页
          </Link>
        </div>
        <div className="d-flex justify-content-end">
          <OverlayTrigger
            placement="auto"
            overlay={
              <Tooltip id="security-tooltip">
                <div className="text-start p-2">
                  我们的网站使用SHA256与bcrypt进行双端哈希加密并加盐存储，全程无明文传输。
                  <br />
                  即使被拖库依然能保证您的密码安全。
                </div>
              </Tooltip>
            }
          >
            <span>关于数据安全</span>
          </OverlayTrigger>
        </div>
      </div>
    </form>
  );
}
