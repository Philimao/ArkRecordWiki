import React from "react";

export default function DefaultIndexContent() {
  return (
    <div id="default-content">
      <div
        className="pb-2"
        style={{
          backgroundImage: "url('../images/banner.png')",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        <div className="dark-div">
          <h1 className="text-center text-white py-2">明日方舟少人Wiki</h1>
        </div>
        <div>
          <div className="dark-div row mx-0">
            <div className="col-8 p-4">
              <h2 className="text-white mb-4">明日方舟少人Wiki是？</h2>
              <p className="text-white">
                &#9830;
                是一个热爱明日方舟少人极限玩法的玩家社群所建立的收集明日方舟优秀作战记录的网站
              </p>
              <p className="text-white">
                &#9830; 我们依托B站视频，收录各关卡各活动的少人记录
              </p>
              <p className="text-white">
                &#9830;
                用户可注册账号提交记录，由管理员审核通过后就会展示在相应关卡界面
              </p>
              <p className="text-white">
                &#9830; 目前网站处于初创期，各种功能会逐步开发完善，敬请期待
              </p>
            </div>
            <div className="col-4 p-3">
              <img
                className=" ratio ratio-1x1"
                src="../../favicon/favicon.jpg"
                alt="favicon"
              />
            </div>
          </div>
        </div>
        <div className="p-3 dark-div">
          <p className="text-white motto fs-4 fst-italic">
            Building the future and keeping the past alive are one and the same
            thing.
          </p>
          <p className="text-end text-white fs-4 fst-italic motto">
            by Hideo Kojima
          </p>
        </div>
      </div>

      <div className="m-5 pb-5 dark-div">
        <div>
          <p className="text-white">
            数据来源： <a href="http://prts.wiki/id/1">PRTS</a>、
            <a href="https://www.bilibili.com/">
              哔哩哔哩(゜-゜)つロ干杯~-bilibili
            </a>
          </p>
          <p className="text-white">
            策划发起：{" "}
            <a href="https://space.bilibili.com/25615953">卓荦zoro</a>
            、Mathillda(已退坑)
          </p>
          <p className="text-white">
            技术支持： <a href="https://space.bilibili.com/759562">philimao</a>
            、<a href="https://space.bilibili.com/2643413">Matsu-ka</a>
          </p>
          <p className="text-white">
            美术设计： <a href="https://space.bilibili.com/2645146">银纸吹雪</a>
          </p>
          <p className="text-white">
            审核管理：{" "}
            <a href="https://space.bilibili.com/15771645">Function_____</a>、
            <a href="https://space.bilibili.com/291120953">Ari-Ver</a>
          </p>
          <p className="text-white">
            制表模范： <a href="https://space.bilibili.com/4129184">Enki安奇</a>
            、<a href="https://space.bilibili.com/437167862">Terpenes</a>、
            <a href="https://space.bilibili.com/473250091">快乐神猫</a>、
            <a href="https://space.bilibili.com/647733916">mirrorMK</a>
          </p>
          <p className="text-white">
            梦的开始：{" "}
            <a
              className="text-white"
              href="https://docs.qq.com/doc/DQ0ZpT1pkRkt4YW9r"
            >
              极限少人打法收录
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
