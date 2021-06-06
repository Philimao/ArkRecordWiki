import React from "react";
import { Steps } from "intro.js-react";

export default function Announcement({ user, enabled, setEnable }) {
  const steps = [
    {
      intro: `
      <div class="p-3">
        <div class="mb-3">尊敬的用户您好：</div>
        <div class="mb-3">
          由于昨天注册人数过多，达到了Outlook每日邮件发送上限，导致部分用户注册失败，对此带来的不便我们表示非常抱歉。为了应对这种情况，我们启用了备用机制改善了注册问题，如果需要注册的用户可以再次尝试。非常感谢您对明日方舟少人Wiki的支持！
        </div>
        <div class="text-end">明日方舟少人Wiki维护组</div>
      </div>
      `,
      tooltipClass: "intro-lg",
    },
  ];

  return (
    <Steps
      enabled={!user && enabled}
      initialStep={0}
      steps={steps}
      onExit={() => {
        document.cookie =
          "emailA=true; path=/; expires=" +
          new Date(Date.now() + 7 * 86400000).toUTCString();
        setEnable(false);
      }}
      options={{
        disableInteraction: true,
        prevLabel: "前一条",
        nextLabel: "下一条",
        doneLabel: "好的",
      }}
    />
  );
}
