import React from "react";

export default function Changelog() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-0 col-md-2" />
        <div className="col">
          {/*CHANGELOG*/}
          <h4 className="fw-bold mb-5">变更日志</h4>

          <div className="row">
            <div className="col-4 px-0 row">
              <div className="col-4">v2.8.0</div>
              <div className="col-8">2021.05.12</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增功能：</div>
              <ul>
                <li>更加清晰的排序模式</li>
                <li>新增免审核用户组</li>
                <li>在管理员页的全部纪录中新增以下功能：</li>
                <ul>
                  <li>默认只返回最新纪录，减小服务器负担</li>
                  <li>新增多个检索快捷按钮</li>
                  <li>新增快速搜索功能</li>
                </ul>
                <li>改进不同页面下的卡片样式</li>
                <li>启用回收站</li>
                <li>新增不同操作的时间戳</li>
                <li>管理员可以解决纪录反馈</li>
                <li>自动爬取头像功能（测试中）</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-4 px-0 row">
              <div className="col-4">v2.7.0</div>
              <div className="col-8">2021.05.11</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增功能：</div>
              <ul>
                <li>在关卡页可以快速向该关卡提交纪录</li>
                <li>管理员在关卡页可以快速呼出审核页</li>
                <li>注册用户可以向管理员反馈纪录问题</li>
                <li>超管可以解决用户反馈</li>
                <li>收藏夹功能上线</li>
                <li>新增用户时自动爬取头像</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-4 px-0 row">
              <div className="col-4">v2.6.0</div>
              <div className="col-8">2021.05.10</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增功能：</div>
              <ul>
                <li>危机合约卡片样式补全</li>
                <li>日替限时开放免审核投稿功能</li>
                <li>管理员可见用户联络</li>
                <li>管理员可以对关卡纪录进行排序</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-4 px-0 row">
              <div className="col-4">v2.5.0</div>
              <div className="col-8">2021.05.09</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增功能：</div>
              <ul>
                <li>为危机合约设计了专属卡片样式</li>
                <li>提交页与审核页新增合约相关域</li>
                <li>新增干员信息数据库</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-4 px-0 row">
              <div className="col-4">v2.4.0</div>
              <div className="col-8">2021.05.07</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增功能：</div>
              <ul>
                <li>按干员名称搜索纪录试运行中</li>
                <li>克隆已有危机合约关卡以减少工作量</li>
                <li>修改了纪录域，目前必须包含故事类型与章节名称</li>
                <li>更新了提交纪录和审核纪录页面，选择关卡的逻辑</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-4 px-0 row">
              <div className="col-4">v2.3.1</div>
              <div className="col-8">2021.05.03</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增功能与修复：</div>
              <ul>
                <li>管理员自定义分组</li>
                <li>更新目录中“当前活动”显示逻辑</li>
                <li>修复网速不佳时目录列表无法加载的问题</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-4 px-0 row">
              <div className="col-4">v2.3.0</div>
              <div className="col-8">2021.05.03</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增功能：</div>
              <ul>
                <li>对Youtube链接的支持</li>
                <li>主页快速切换关卡</li>
                <li>服务端用户头像储存</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-4 px-0 row">
              <div className="col-4">v2.2.1</div>
              <div className="col-8">2021.05.03</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">修复问题：</div>
              <ul>
                <li>剿灭关卡无法正确创建</li>
                <li>创建关卡改变故事类型时，最新关卡无法正确同步</li>
                <li>显示多余的“-”中间层</li>
                <li>清空本地cookie后无法正确登录</li>
                <li>无搜索结果时错误未正确捕获</li>
                <li>审核通过最后一项纪录引起数组溢出</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-4 px-0 row">
              <div className="col-4">v2.2.0</div>
              <div className="col-8">2021.05.01</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增功能：</div>
              <ul>
                <li>管理员新建关卡时支持自定义域</li>
                <li>新增临时版投稿指引</li>
                <li>提交纪录与搜索纪录今后需要关卡代号+中文名称</li>
                <li>
                  目的是解決覆潮之下活动与乌萨斯的熊孩子活动关卡代号冲突问题
                </li>
                <ul>
                  <li>eg: GT-1 日正当中</li>
                </ul>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-4 px-0 row">
              <div className="col-4">v2.1.0</div>
              <div className="col-8">2021.04.30</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增功能：</div>
              <ul>
                <li>管理员更新关卡</li>
                <li>主页信息</li>
                <li>提交记录时支持指定特定分p</li>
                <ul>
                  <li>eg: BV1?p=2</li>
                </ul>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-4 px-0 row">
              <div className="col-4">v2.0.0</div>
              <div className="col-8">2021.04.17</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">将项目迁移到React，方便开发与维护</div>
              <div className="mb-1">新增功能：</div>
              <ul>
                <li>主页搜索栏联想搜索</li>
                <li>
                  站内信功能，在审核通过或退回时将收到站内信提醒，消息保留14天
                </li>
                <li>重复纪录提交检查</li>
                <li>全部纪录页的分页显示</li>
                <li>更加fancy的通知效果🤣</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-4 px-0 row">
              <div className="col-4">v1.0.0</div>
              <div className="col-8">2021.03.31</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">
                基于Node.js+Express+Mongodb+Bootstrap 5+Vanilla JS的初版
              </div>
              <div className="mb-1">
                实现了用户认证，工单提交，工单审核，关卡管理，纪录管理等基本功能
              </div>
            </div>
          </div>
        </div>
        <div className="col-0 col-md-2" />
      </div>
    </div>
  );
}
