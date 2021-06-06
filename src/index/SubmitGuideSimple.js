import React from "react";
import Modal from "../shared/Modal";

export default function SubmitGuideSimple() {
  const guide = () => {
    return (
      <div>
        <h4 className="mb-4 text-center">欢迎投稿，感谢支持</h4>
        <div className="mb-4">
          <h5 className="mb-3 fw-bold">对应关卡栏</h5>
          <ol>
            <li className="mb-2">
              请通过<b>下拉菜单</b>选择需要<b>对应的关卡</b>，或从<b>主页</b>
              前往<b>对应关卡</b>选择<b>快速提交</b>
            </li>
            <li className="mb-2">
              网站还在建设中，如<b>找不到想要投稿的关卡</b>，可通过主页左侧
              <b>“联系我们”</b>进行反馈
            </li>
          </ol>
        </div>
        <div className="mb-4">
          <h5 className="mb-3 fw-bold">发布账号栏</h5>
          <ol>
            <li className="mb-2">
              发布账号栏请填写视频发布账号<b>完整ID</b>，如
              Function_____，建议使用<b>复制</b>，移动端不便时可备注审核帮改
            </li>
            <li className="mb-2">
              若视频为代发或<b>搬运</b>，请在<b>简介</b>中写明攻略者，如
              攻略者：Matsuka_
            </li>
          </ol>
        </div>
        <div className="mb-4">
          <h5 className="mb-3 fw-bold">队伍组成栏</h5>
          <ol>
            <li className="mb-2">
              队伍组成请填写<b>完整正确的干员名</b>，如
              浊心斯卡蒂、炎狱炎熔、阿米娅（近卫），升变阿米娅用的是中文括号，即全角括号
            </li>
            <li className="mb-2">
              请使用<b>阿拉伯数字123</b>表示干员<b>携带技能</b>，如
              塞雷娅3、温蒂2
            </li>
            <li className="mb-2">
              某干员<b>没有技能</b>或者<b>在战斗中不使用技能</b>的情况
              <b>无需填写</b>，可在备注内容写明，如 “深海色不使用技能”，该干员
              <b>所有技能都可通关</b>的情况也<b>无需填写</b>，备注同上，如
              “刻刀全技能都可通关”
            </li>
            <li className="mb-2">
              队伍中各干员之间使用<b>+号分隔</b>，如
              泥岩2+瑕光1。此处请用半角加号，（一般键盘上的加号都是半角，在使用中文输入法时可能需要注意）
            </li>
            <li className="mb-2">
              关卡开局前<b>已在场上的干员</b>
              不需要写进队伍里，若该干员在此次作战中<b>没有参战</b>，则可
              <b>备注说明</b>，如 “铃兰不参战”
            </li>
          </ol>
        </div>
        <div className="mb-4">
          <h5 className="mb-3 fw-bold">网址链接栏</h5>
          <ol>
            <li className="mb-2">
              链接支持B站和油管的视频链接，其中油管视频仅支持完整链接，B站视频支持
              <b>BV号自动补全</b>，可直接<b>复制BV号粘贴</b>，<b>移动端</b>
              BV号在视频标题下，<b>长按</b>可复制，如 BV1aV411e7yw
            </li>
            <li className="mb-2">
              油管的完整链接格式为 https://www.youtube.com/watch?v=g27215wvJgQ
            </li>
            <li className="mb-2">
              B站视频支持录入<b>分P</b>，需要链接到分P时，请在BV号后
              <b>添加分P描述</b>，如
              BV1GV41127Yq?p=2，此处p=2前面的问号是英文问号，即<b>半角问号</b>
              ，注意，全角问号无法识别
            </li>
            <li className="mb-2">
              同一视频内含有同一关卡<b>批发多解</b>时，请<b>单独提交每种解法</b>
              ，若遇到提示“该记录已收录”时，可通过主页左侧“联系我们”进行反馈
            </li>
          </ol>
        </div>
      </div>
    );
  };

  // function toDetailed() {
  //   return (
  //     <button
  //       className="btn btn-primary"
  //       data-bs-toggle="modal"
  //       data-bs-target="#submit_detailed_guide"
  //       data-bs-dismiss="modal"
  //     >
  //       前往收录原则
  //     </button>
  //   );
  // }

  return (
    <Modal
      id="submit_simple_guide"
      header="投稿指引（页面内容可以复制）"
      Content={guide}
      // customButton={toDetailed}
    />
  );
}
