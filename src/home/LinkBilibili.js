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

  const inst = "../images/static/link-bilibili-";

  return (
    <div className="mb-4">
      <h4 className="text-center mb-4">将账户链接到bilibili</h4>
      <div className="mb-4">
        <div className="mb-2">
          点击下方按钮，并将新窗口中的数据粘贴到下方表格内提交即可完成链接。
        </div>
        <div className="mb-2">
          账户链接后将可以使用<strong>b站头像和昵称</strong>
          ，用于本网站用户的登记与关联，以及更多后续功能的实现。
        </div>
        <div className="mb-2">
          在更新b站个人信息后可以随时在这里同步您的最新个人信息，但注意如果用户名发生了改变，之前关联在您名下的纪录可能将会丢失。因此最好请在提交纪录之前完成链接账户的操作。
        </div>
        <div className="mb-2">
          数据中不含有隐私信息，获取的仅仅是您个人空间中对外展示的公开信息。
        </div>
      </div>
      <form
        className="input-group mb-5"
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
          href="https://api.bilibili.com/x/space/myinfo"
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
      <div className="mb-5">
        <h4 className="text-center mb-4">操作步骤</h4>
        <div className="accordion accordion-flush" id="accordion-instr">
          <div className="accordion-item">
            <h2 className="accordion-header" id="ins-h0">
              <button
                className="accordion-button collapsed operation"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#ins-col0"
                aria-expanded="false"
                aria-controls="ins-col0"
              >
                0. 在本浏览器上登录过B站
              </button>
            </h2>
            <div
              id="ins-col0"
              className="accordion-collapse collapse"
              aria-labelledby="ins-h0"
              data-bs-parent="#accordion-instr"
            >
              <div className="accordion-body border bg-light">
                如果没有在此浏览器上
                <a
                  href="https://passport.bilibili.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  登陆过B站
                </a>
                ，B站无法识别到用户身份，自然不知道应该返回谁的用户名、头像等信息。
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="ins-h1">
              <button
                className="accordion-button collapsed operation"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#ins-col1"
                aria-expanded="false"
                aria-controls="ins-col1"
              >
                1. 点击“获取基本信息”按钮
              </button>
            </h2>
            <div
              id="ins-col1"
              className="accordion-collapse collapse"
              aria-labelledby="ins-h1"
              data-bs-parent="#accordion-instr"
            >
              <div className="accordion-body border bg-light">
                <img
                  src={inst + "0.png"}
                  className="border shadow w-100"
                  alt="ins0"
                />
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="ins-h2">
              <button
                className="accordion-button collapsed operation"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#ins-col2"
                aria-expanded="false"
                aria-controls="ins-col2"
              >
                2. 复制网页中所有内容
              </button>
            </h2>
            <div
              id="ins-col2"
              className="accordion-collapse collapse"
              aria-labelledby="ins-h2"
              data-bs-parent="#accordion-instr"
            >
              <div className="accordion-body border bg-light">
                <img
                  src={inst + "1.png"}
                  className="border shadow w-100"
                  alt="ins1"
                />
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="ins-h3">
              <button
                className="accordion-button collapsed operation"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#ins-col3"
                aria-expanded="false"
                aria-controls="ins-col3"
              >
                3. 粘贴到输入框，点击“链接到Bilibili”提交
              </button>
            </h2>
            <div
              id="ins-col3"
              className="accordion-collapse collapse"
              aria-labelledby="ins-h3"
              data-bs-parent="#accordion-instr"
            >
              <div className="accordion-body border bg-light">
                <img
                  src={inst + "2.png"}
                  className="border shadow w-100"
                  alt="ins2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <h4 className="text-center mb-4">常见问题</h4>
        <div className="accordion accordion-flush" id="accordion-faq">
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq-h1">
              <button
                className="accordion-button collapsed operation"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq-col1"
                aria-expanded="false"
                aria-controls="faq-col1"
              >
                0. 获取基本信息的链接内容是否安全
              </button>
            </h2>
            <div
              id="faq-col1"
              className="accordion-collapse collapse"
              aria-labelledby="faq-h1"
              data-bs-parent="#accordion-faq"
            >
              <div className="accordion-body border bg-light">
                链接指向的是B站的公开API，即访问的是B站的服务器。
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq-h2">
              <button
                className="accordion-button collapsed operation"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq-col2"
                aria-expanded="false"
                aria-controls="faq-col2"
              >
                1. 为什么操作这么麻烦
              </button>
            </h2>
            <div
              id="faq-col2"
              className="accordion-collapse collapse"
              aria-labelledby="faq-h2"
              data-bs-parent="#accordion-faq"
            >
              <div className="accordion-body border bg-light">
                我们的主要视频来源与用户都来自B站，而B站没有提供授权登录服务。让用户手输自己的个人信息不但麻烦而且容易出错，可能会带来各种不可预知的问题。至于为什么要让用户自己复制数据，主要是希望能让用户完全清楚自己的操作在做什么，而拥有完全的选择自主权。
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq-h3">
              <button
                className="accordion-button collapsed operation"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq-col3"
                aria-expanded="false"
                aria-controls="faq-col3"
              >
                2. 网站提示我格式错误
              </button>
            </h2>
            <div
              id="faq-col3"
              className="accordion-collapse collapse"
              aria-labelledby="faq-h3"
              data-bs-parent="#accordion-faq"
            >
              <div className="accordion-body border bg-light">
                请检查是否复制了全部的数据，是否遗漏了前后的括号等
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq-h4">
              <button
                className="accordion-button collapsed operation"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq-col4"
                aria-expanded="false"
                aria-controls="faq-col4"
              >
                3. 网站提示我请检查是否在此浏览器上登陆过Bilibili
              </button>
            </h2>
            <div
              id="faq-col4"
              className="accordion-collapse collapse"
              aria-labelledby="faq-h4"
              data-bs-parent="#accordion-faq"
            >
              <div className="accordion-body border bg-light">
                请检查是否登录过，如果确实已经登录，请尝试切换浏览器，从登录开始完成上述步骤
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq-h5">
              <button
                className="accordion-button collapsed operation"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq-col5"
                aria-expanded="false"
                aria-controls="faq-col5"
              >
                4. 网站提示我该账户已被关联
              </button>
            </h2>
            <div
              id="faq-col5"
              className="accordion-collapse collapse"
              aria-labelledby="faq-h5"
              data-bs-parent="#accordion-faq"
            >
              <div className="accordion-body border bg-light">
                如果您将要更新的B站ID曾是别人的曾用名，并且此用户正在本网站使用此用户名时，会提示此错误。请使用主页的联络表联系网站管理员解决。
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="faq-h6">
              <button
                className="accordion-button collapsed operation"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#faq-col6"
                aria-expanded="false"
                aria-controls="faq-col6"
              >
                5. 以上都不能解决问题
              </button>
            </h2>
            <div
              id="faq-col6"
              className="accordion-collapse collapse"
              aria-labelledby="faq-h6"
              data-bs-parent="#accordion-faq"
            >
              <div className="accordion-body border bg-light">
                首先请确认您是否使用的是现代浏览器（Chrome，Firefox，Edge，Safari等），然后请尝试刷新页面（有时可能刚好网站正在更新）。如果以上都不能解决问题，请使用主页的联络表，开发者将会尽快与您联系。非常感谢您的理解与支持!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
