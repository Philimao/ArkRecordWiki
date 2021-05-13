import React, { useRef, useState } from "react";
import InputBox from "../shared/InputBox";
import Modal from "../shared/Modal";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [contactUser, setContactUser] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactBody, setContactBody] = useState("");
  const form = useRef();

  const contact_form_content = () => {
    return (
      <form className="p-3" id="contact_form" ref={form}>
        <div className="mb-3">
          联络表系统试运行中，希望得到快速反馈请联系卓荦zoro，QQ: 1243965887。
        </div>
        <InputBox
          value={contactUser}
          onChange={(evt) => setContactUser(evt.target.value)}
          label="您的称呼"
          id="contact_user"
          placeholder="草牛homo"
          required={true}
          feedback="请输入联系人"
        />
        <InputBox
          value={contactEmail}
          onChange={(evt) => setContactEmail(evt.target.value)}
          label="您的邮箱地址"
          id="contact_email"
          placeholder="name@example.com"
          required={true}
          type="email"
          feedback="请输入合法的邮箱地址"
        />
        <div className="mb-3">
          <label htmlFor="contact_body" className="form-label">
            意见或建议
          </label>
          <textarea
            className="form-control"
            id="contact_body"
            rows="8"
            value={contactBody}
            onChange={(evt) => setContactBody(evt.target.value)}
            placeholder="正文"
            required
          />
        </div>
      </form>
    );
  };

  async function handleSubmit() {
    if (!form.current.checkValidity()) {
      return form.current.classList.add("was-validated");
    }
    setContactUser("");
    setContactEmail("");
    setContactBody("");
    try {
      const resRaw = await fetch("/mail/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: contactUser,
          email: contactEmail,
          body: contactBody,
        }),
      });
      if (!resRaw.ok) {
        const res = await resRaw.text();
        toast.warning("提交失败！\n" + res);
      } else {
        toast.info("提交成功！");
      }
    } catch (err) {
      console.log(err);
      toast.warning(err);
    }
  }

  return (
    <Modal
      id="contact_form_modal"
      header="联系我们"
      handleSubmit={handleSubmit}
      Content={contact_form_content}
    />
  );
}
