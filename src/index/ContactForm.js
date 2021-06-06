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
          欢迎使用联络表。您可以通过联络表联系网站管理员，我们在收到消息后会尽快通过邮件的方式联络您。
          <br />
          <br />
          遇到网站无法使用的问题，请先确定您是否使用的是现代浏览器。如果更换浏览器不能解决问题，请将引起问题的操作和页面情况、错误消息等提供在下方的正文内容中，网站管理员会尽快与您联络。
          <br />
          <br />
          如果问题比较复杂希望能够即时交流，可以添加客服娘的QQ：1029020121，我们会尽快与您联络。
        </div>
        <InputBox
          value={contactUser}
          onChange={(evt) => setContactUser(evt.target.value)}
          label="您的称呼"
          id="contact_user"
          placeholder="可以使用B站昵称"
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
