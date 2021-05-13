import React, { useState } from "react";
import { toast } from "react-toastify";

export default function LinkBilibili() {
  const [json, setJson] = useState("");

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(json);
    const resRaw = await fetch("/user/link_bilibili", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: json }),
    });
    if (!resRaw.ok) {
      const res = await resRaw.text();
      toast.warning(res);
    } else {
      setJson("");
      toast.info("链接成功");
      window.location = "/";
    }
  }

  return (
    <div className="mb-4">
      <h4 className="text-center mb-4">将账户链接到bilibili</h4>
      <div className="mb-4">
        <div className="mb-1">
          点击下方按钮，并将新窗口中的数据粘贴到下方表格内提交即可完成链接。
        </div>
        <div className="mb-1">
          账户链接后将可以使用<strong>b站头像和昵称</strong>
          ，将纪录关联到您名下，并在每项纪录的攻略者栏显示您的
          <strong>b站主页链接</strong>。
        </div>
        <div className="mb-1">
          数据中不含有隐私信息，您也可以在不破坏文档结构的情况下自行删除部分域。
        </div>
      </div>
      <form
        className="input-group"
        id="link_bilibili_form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="link_bilibili_input" />
        <input
          type="text"
          className="form-control"
          placeholder="数据内容"
          id="link_bilibili_input"
          value={json}
          onChange={(evt) => setJson(evt.target.value)}
          required
        />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://api.bilibili.com/x/space/myinfo"
          className="btn btn-outline-secondary"
        >
          获取基本信息
        </a>
        <button
          className="btn btn-outline-secondary"
          type="submit"
          id="link_bilibili_btn"
        >
          链接到bilibili
        </button>
      </form>
    </div>
  );
}
