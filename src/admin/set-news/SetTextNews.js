import React, { useEffect, useState } from "react";
import Modal from "../../shared/Modal";
import InputBox from "../../shared/InputBox";
import { toast } from "react-toastify";

export default function SetTextNews({ news, setNews, setRefresh }) {
  const [header, setHeader] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (news && !Array.isArray(news.value)) {
      setHeader(news.header);
      setValue(news.value);
    }
  }, [news]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      return evt.target.classList.add("was-validated");
    }
    toast.info("更新中，请稍后...");
    let resRaw;
    if (news) {
      resRaw = await fetch("/admin/update-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          news_id: news._id,
          header: header,
          value: value,
        }),
      });
    } else {
      resRaw = await fetch("/admin/set-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          header: header,
          value: value,
        }),
      });
    }
    if (!resRaw.ok) {
      resRaw.text().then((res) => {
        toast.warning("更新失败\n" + res);
      });
    } else {
      setRefresh((prev) => !prev);
      toast.info("公告更新成功");
    }
  }

  function Content() {
    return (
      <form onSubmit={handleSubmit} noValidate>
        <InputBox
          id="text_news_header"
          value={header}
          onChange={(evt) => setHeader(evt.target.value)}
          label="公告标题"
          placeholder="请参考过往公告格式"
          feedback="请填写公告标题"
          required={true}
        />
        <div>
          <label className="form-label" htmlFor="text_news_content">
            公告内容
          </label>
          <textarea
            className="form-control"
            id="text_news_content"
            rows="15"
            value={value}
            onChange={(evt) => setValue(evt.target.value)}
            required={true}
          />
          <div className="invalid-feedback">请填写公告内容</div>
        </div>
        <button className="d-none" id="text_news_submit_button" />
      </form>
    );
  }

  return (
    <Modal
      id="set_text_news"
      header="设置文字公告"
      Content={Content}
      handleSubmit={() => {
        document.querySelector("#text_news_submit_button").click();
      }}
      handleClose={() => {
        setNews(undefined);
        setHeader("");
        setValue("");
      }}
    />
  );
}
