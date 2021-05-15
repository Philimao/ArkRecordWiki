import React from "react";
import Modal from "../shared/Modal";

export default function AboutModal() {
  const about_content = () => (
    <div className="mb-3">
      <div className="mb-3">这是一个还没有想好放什么的彩蛋页😗</div>
      <div className="mb-3">
        本站的前身为
        <a
          href="https://docs.qq.com/doc/DQ0ZpT1pkRkt4YW9r"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "black" }}
        >
          极限少人打法收录文档
        </a>
        ，当中收录了大量精彩的优秀作战纪录。但随着时间过去数据量增长，本文档的维护和使用变得愈发困难。面对文档的危机，维护组站了出来。为了拯救这份珍贵的文档，维护组能做的事情就是...成为偶像（不是
      </div>
      <div className="mb-3">
        本Wiki项目最终由主页列出的诸位成员整理，并转移到网站上。项目前端地址为
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/Philimao/ArkRecordWiki"
          style={{ color: "black" }}
        >
          ArkRecordWiki
        </a>
        ，遵循MIT协议进行开源共享。由于维护组唯一的前端资历尚浅，如果有希望贡献代码的Web或Mobile开发都可以联系我们。
      </div>
      <div className="mb-3">最后祝您，身体健康，再见👻</div>
    </div>
  );

  return <Modal id="about_modal" header="关于本项目" Content={about_content} />;
}
