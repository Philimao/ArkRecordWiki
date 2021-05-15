import React, { useRef } from "react";
import { Steps } from "intro.js-react";
import { useHistory } from "react-router-dom";

export default function UserIntro({ user, enabled, setEnable }) {
  const intro = useRef();
  const history = useHistory();

  const steps = [
    {
      intro: `
      <div>
        <div class="mb-3">博士，我们又见面了！</div>
        <div class="mb-3">接下来将为您展示注册用户的一些功能，您依旧可以使用方向键前进，使用Esc退出，或是将来从页脚的<strong>用户指引</strong>呼出此引导。</div>
      </div>
      `,
      tooltipClass: "intro-lg",
    },
    {
      intro: "在关卡详情页，注册用户拥有更多的选项",
    },
    {
      element: "#quickSubmitButton",
      intro:
        "我们在每个关卡页面上都提供了快速提交的选项，能够快速向本关卡提交纪录",
    },
    {
      element: ".btn-favorite",
      intro:
        "注册用户能够收藏纪录，之后能够在个人主页的收藏夹中直接浏览这些纪录",
    },
    {
      element: ".btn-opacity",
      intro: `
      <div>
        <div class="mb-3">如果您发现我们的纪录存在问题，欢迎使用反馈功能进行提交。</div>
        <div class="mb-3">管理员人工审核难免出现疏漏，每一位用户的反馈都会让社区变得更好一点。</div>
      </div>
      
      `,
    },
    {
      element: "#submit_page",
      intro: "接下来我们将会前往纪录提交页",
    },
    {
      intro:
        "提交纪录是我们网站的核心功能，用户提交的纪录将会在管理员审核后放出。为了保证每一份纪录足够优质，我们有着非常详细的收录原则",
    },
    {
      element: "#submit_guide_buttons",
      intro:
        "点击这里可以查看详细的收录原则，在整个引导结束后欢迎来提交您的第一份纪录",
    },
    {
      element: "#profile_photo",
      intro: "点击头像可以前往个人主页",
    },
    {
      intro:
        "主页有多个分栏，默认为收藏夹页。您可以在之后对这些页面进行详细的探索，现在我们先前往一个需要更多讲解的地方",
    },
    {
      element: "#link_bilibili_form",
      intro: `
      <div>
        <div class="mb-3">我们的网站主要依托B站，因此也使用B站的用户名与头像来识别用户。</div>
        <div class="mb-3">我们通过使用B站的公开API获取用户的个人空间信息（不含有隐私信息），来完成账户链接操作，具体步骤和可能遇到的问题可以参考下方的图文讲解。</div>
      </div>
      `,
    },
    {
      intro: `
      <div>
        <div class="mb-3">到这里用户引导就告一段落了，其余的功能您可以通过自行游览来熟悉整个网站。</div>
        <div class="mb-3">如果您希望在将来为我们提交纪录，那么推荐尽快完成账户链接的步骤避免相关的关联数据丢失。</div>
        <div class="mb-3">如果您在使用中对我们的网站有任何意见或建议，欢迎通过主页的联络表格进行提交。</div>
        <div class="mb-3">Enjoy~</div>
      </div>
      `,
      tooltipClass: "intro-lg",
    },
  ];

  function onChange(index) {
    if (index === 6) document.querySelector(".navbar-toggler").click();
    if (index === 9) document.querySelector(".navbar-toggler").click();
  }

  function onBeforeChange(index) {
    if (index === 0) document.querySelector(".navbar-brand").click();
    if (index > 0 && index !== Object.keys(steps).length) {
      if (index === 1) document.querySelector("#btn30701").click();
      if (index === 5) document.querySelector(".navbar-toggler").click();
      if (index === 6) history.push("/submit");
      if (index === 8) document.querySelector(".navbar-toggler").click();
      if (index === 9) history.push("/home/favorite");
      if (index === 10) history.push("/home/link-bilibili");
      intro.current.updateStepElement(index);
    }
  }

  return (
    <Steps
      ref={intro}
      enabled={user && enabled}
      initialStep={0}
      steps={steps}
      onBeforeChange={onBeforeChange}
      onBeforeExit={() => window.confirm("是否退出用户指引？")}
      onExit={() => {
        document.cookie =
          "userIntro=true; path=/; expires=" +
          new Date(Date.now() + 365 * 864000).toUTCString();
        setEnable(false);
      }}
      onChange={onChange}
      options={{
        disableInteraction: true,
        prevLabel: "前一条",
        nextLabel: "下一条",
        doneLabel: "开始冲浪！",
      }}
    />
  );
}
