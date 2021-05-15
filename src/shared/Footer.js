import React from "react";
import { Link } from "react-router-dom";

function toTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer({ setVisitor }) {
  return (
    <div
      className="container-fluid py-4"
      style={{ backgroundColor: "#222529" }}
    >
      <div className="container-xl">
        <div className="row" id="footer">
          {/*CHANGELOG*/}
          <div className="col-12 col-md-6 px-4">
            此页面最后编辑于2021年5月14日。
            <br />
            <br />
            本网站由《明日方舟》游戏爱好者搭建，游戏视频链接由管理员与用户共同上传，如果您不希望自己的视频被收录，请联系网站管理员删除。{" "}
            <br />
            网站内使用的游戏图片、动画、音频、文本原文仅用于更好地表现游戏资料，其版权属于
            Arknights/上海鹰角网络科技有限公司。 <br />
            人物动画提取使用了Aloento/SuperSpineViewer项目中的功能，本声明参考了prts站，在此表示感谢。{" "}
            <br />
          </div>
          <div className="col-12 col-md-3 px-4 py-5 py-md-0">
            <div className="mb-2 fw-bold">网站相关</div>
            <div className="mb-1">
              <Link to="/FAQ" className="footer-link" onClick={toTop}>
                常见问题
              </Link>
            </div>
            <div
              className="mb-1"
              role="button"
              onClick={() => {
                document.cookie =
                  "visitorIntro= ; expires=Thu, 01 Jan 1970 00:00:00 GMT; userIntro= ; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                setVisitor(true);
              }}
            >
              用户指引
            </div>
            <div
              className="mb-1"
              role="button"
              data-bs-toggle="modal"
              data-bs-target="#submit_simple_guide"
            >
              投稿指引
            </div>
            <div
              className="mb-1"
              role="button"
              data-bs-toggle="modal"
              data-bs-target="#submit_detailed_guide"
            >
              收录原则
            </div>
            <Link to="/changelog" className="footer-link" onClick={toTop}>
              变更日志
            </Link>
          </div>
          <div className="col-12 col-md-3 px-4 py-5 py-md-0">
            <div className="mb-2 fw-bold">友情链接</div>
            <div>暂无</div>
          </div>
        </div>
      </div>
    </div>
  );
}
