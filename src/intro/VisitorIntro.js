import React, { useRef } from "react";
import { Steps } from "intro.js-react";
import { useHistory } from "react-router-dom";

export default function VisitorIntro({
  enabled,
  setEnable,
  setNext,
  collapseMenu,
}) {
  const intro = useRef();
  const history = useHistory();

  const steps = [
    {
      intro: `
      <div>
        <h5 class="fw-bold mb-3">欢迎来到明日方舟少人Wiki</h5>
        <div class="mb-3">欢迎收看小刻也能看懂的网站使用说明！</div>
        <div class="mb-3">
          您可以使用方向键来切换到下一条介绍，也可以使用Esc键退出。您将来也随时能够从页脚的<strong>用户指引</strong>呼出此引导。
        </div>
        <div class="mb-3">
          本站是一个运行在浏览器里的网页应用，因此对浏览器的版本和安全性有较高要求。我们仅支持<strong>现代浏览器</strong>
          （<u>桌面端</u>推荐Chrome，Firefox，Edge，Safari，<u>ios端</u>常见浏览器都通过了测试，<u>安卓</u>默认浏览器与大部分国产浏览器均无法支持，推荐使用Chrome或UC）以及来自https的加密访问。
        </div>
        <div class="mb-3">
          那么就让我们开始简单的使用说明吧。
        </div>
      </div>
      `,
      tooltipClass: "intro-lg",
    },
    {
      element: "#Stories",
      intro: "这是目录部分，我们将所有活动分为了这些大类",
    },
    {
      element: "#btnCurrentEpisode",
      intro: "点击展开当前活动章节",
    },
    {
      element: "#currentEpisodeContent",
      intro:
        "这里是当前活动的所有开放的关卡，可能存在随着活动进程逐步补全的情况",
    },
    {
      element: ".operation",
      intro: "点击关卡名称可以加载当前关卡下的所有纪录",
    },
    {
      element: ".operation-comp",
      intro: "这里展示了本关卡的一些信息",
    },
    {
      element: ".operation-buttons",
      intro: "我们提供了可以在同一活动内快速切换关卡的快捷按钮",
    },
    {
      element: ".record-comp",
      intro: "每一张纪录卡片上都有组队信息，攻略者信息，以及对应的视频地址",
    },
    {
      element: ".record-buttons",
      intro:
        "我们为Bilibili与Youtube两个网站的视频提供了预览功能，另外也可以很方便的前往原址进行观看",
    },
    {
      element: "#search_form",
      intro:
        "上方搜索框默认支持对章节、活动、关卡的搜索，同时支持简单的智能联想功能",
    },
    {
      element: "#search_type",
      intro: "另外也可以根据干员名称进行搜索，请使用干员正确的官方名称进行搜索",
    },
    {
      element: ".navbar-brand",
      intro: "点击左上角的Logo可以回到默认页",
    },
    {
      element: "#contact_button",
      intro:
        "使用联络表格来对我们的网站提出您宝贵的意见与建议。如果您在使用中遇到任何查阅页脚的<u>常见问题</u>后仍无法解决的问题，也同样欢迎联系我们",
    },
    {
      intro: `
      <div>
        <div class="mb-3">
          对本网站简单的介绍就到这里，您可以点击页脚的<strong>用户指引</strong>再次呼出此指引。
        </div>
        <div class="mb-3">
          在使用中如果遇到问题，可以查阅页脚的<u>常见问题</u>页面，大部分的问题都可以通过更换现代浏览器解决。
        </div>
        <div class="mb-3">本网站不需要注册即可以使用大部分功能。如果您愿意为我们投稿更多的优秀视频，或是希望使用收藏等功能，欢迎成为我们的注册用户。</div>
        <div class="mb-3">祝您使用愉快！</div>
      </div>
      `,
      tooltipClass: "intro-lg",
    },
  ];

  function onChange(index, el) {
    if (index === 0) {
      history.push("/");
      collapseMenu();
    }
    if (index === 2 || index === 4 || index === 11) el.click();
  }

  function onBeforeChange(index) {
    if (index > 3 && index !== Object.keys(steps).length) {
      if (index === 9) document.querySelector(".navbar-toggler").click();
      if (index === 11) {
        document.querySelector(".navbar-toggler").click();
        document.querySelector("#btnCurrentEpisode").click();
      }
      intro.current.updateStepElement(index);
    }
  }

  return (
    <Steps
      ref={intro}
      enabled={enabled}
      initialStep={0}
      steps={steps}
      onBeforeChange={onBeforeChange}
      onBeforeExit={() => window.confirm("是否退出用户指引？")}
      onExit={() => {
        document.cookie =
          "visitorIntro=true; path=/; expires=" +
          new Date(Date.now() + 365 * 86400000).toUTCString();
        setEnable(false);
        setTimeout(() => {
          setNext(true);
        }, 1000);
      }}
      onChange={onChange}
      options={{
        disableInteraction: true,
        prevLabel: "前一条",
        nextLabel: "下一条",
        doneLabel: "开始冲浪！",
        overlayOpacity: 0.7,
      }}
    />
  );
}
