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
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.12</div>
              <div className="col-12 col-sm-8">2021.06.16</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增功能与修复：</div>
              <ul>
                <li>架构更新，使用URL对关卡和干员页进行路由</li>
                <li>更新了关卡搜索和干员搜索的工作逻辑</li>
                <li>更新了对卡片进行更改时的页面更新逻辑</li>
                <li>更新了含有/的日替关卡的跳转路径</li>
                <li>修复了部分函数在低版本安卓浏览器上无法响应的问题</li>
                <li>修复了关卡详情页无法切换前后关卡的问题</li>
                <li>对提交页干员名称进行强制检查</li>
                <li>更新投稿指引</li>
                <li>将战报升级为网站公告，并实现了两种类型的公告发布与浏览</li>
                <li>修复了图片与资源无法固定从服务器根路径加载的问题</li>
                <li>修复了审核页留言小窗能够连续通过的问题</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.11.4</div>
              <div className="col-12 col-sm-8">2021.06.13</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">修复问题：</div>
              <ul>
                <li>
                  修复了快速提交中当关卡名称重复时，关卡没有正确加载的问题
                </li>
                <li>修复了问题反馈页ID重复的问题</li>
                <li>修复了流派显示的逻辑问题</li>
                <li>新增了分组的临时补全功能</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.11.3</div>
              <div className="col-12 col-sm-8">2021.06.11</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增功能与修复：</div>
              <ul>
                <li>修复了流派选择更新滞后的问题</li>
                <li>新增查看历史处理联络的功能</li>
                <li>修改了用户联络的权限</li>
                <li>新增了友情链接页面</li>
                <li>审核页新增了关卡预览功能</li>
                <li>关卡详情页新增按照星级排序功能</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.11.2</div>
              <div className="col-12 col-sm-8">2021.06.05</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">修复问题：</div>
              <ul>
                <li>修复了突袭关卡无法快速编辑的问题</li>
                <li>改进了BV号查重的逻辑</li>
                <li>将流派页改进为可多选</li>
                <li>增加了客服的联系方式</li>
                <li>修复了系统消息过期不会自动删除的问题</li>
                <li>新增卡背预览</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.11.1</div>
              <div className="col-12 col-sm-8">2021.05.31</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增功能：</div>
              <ul>
                <li>调整了新闻对齐</li>
                <li>新增了纪录详细显示的时间戳</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.11.0</div>
              <div className="col-12 col-sm-8">2021.05.28</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增功能：</div>
              <ul>
                <li>初步实现了流派分类分页功能</li>
                <li>在新闻中允许加入多张图片</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.10.1</div>
              <div className="col-12 col-sm-8">2021.05.23</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">改进功能：</div>
              <ul>
                <li>修复了合约角标字体加载问题</li>
                <li>改进了头像获取功能，改为运行时懒汉式获取头像</li>
                <li>新增复制用户留言至管理员留言功能</li>
                <li>实现了管理员站内信功能</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.10.0</div>
              <div className="col-12 col-sm-8">2021.05.17</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增页面与修复：</div>
              <ul>
                <li>更新计数器逻辑</li>
                <li>压缩了头像文件体积</li>
                <li>实现了管理员站内信功能</li>
                <li>实现了管理员站内直接邮件回复功能</li>
                <li>改进了搜索提交者的查询逻辑（改名后不会丢失）</li>
                <li>新增对免审核纪录的复核功能</li>
                <li>改进了卡背显示效果</li>
                <li>修复了每日战报遮挡UI的问题</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.9.2</div>
              <div className="col-12 col-sm-8">2021.05.16</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增页面与修复：</div>
              <ul>
                <li>修复了邮箱发送上限的问题</li>
                <li>新增临时公告功能</li>
                <li>新增最新战报功能</li>
                <li>修复了计数器功能逻辑异常的问题</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.9.1</div>
              <div className="col-12 col-sm-8">2021.05.15</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增页面与修复：</div>
              <ul>
                <li>进行文本校对与修正</li>
                <li>补全了常见问题页面</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.9.0</div>
              <div className="col-12 col-sm-8">2021.05.14</div>
            </div>
            <div className="col" style={{ marginBottom: "1rem" }}>
              <div className="mb-1">新增功能与修复：</div>
              <ul>
                <li>新增新用户指引，方便用户对整体使用的了解</li>
                <li>修复了更新章节、更新关卡时部分节点丢失的问题</li>
                <li>
                  实现了新版系统消息通知，在审核通过或拒绝时都可以附加管理员留言
                </li>
                <li>更新了投稿指引与收录原则</li>
                <li>链接Bilibili页新增图文指导</li>
                <li>实现了流量统计</li>
                <li>新增了归档功能，用于收录暂不显示的投稿</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.8.0</div>
              <div className="col-12 col-sm-8">2021.05.12</div>
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
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.7.0</div>
              <div className="col-12 col-sm-8">2021.05.11</div>
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
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.6.0</div>
              <div className="col-12 col-sm-8">2021.05.10</div>
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
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.5.0</div>
              <div className="col-12 col-sm-8">2021.05.09</div>
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
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.4.0</div>
              <div className="col-12 col-sm-8">2021.05.07</div>
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
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.3.1</div>
              <div className="col-12 col-sm-8">2021.05.03</div>
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
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.3.0</div>
              <div className="col-12 col-sm-8">2021.05.03</div>
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
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.2.1</div>
              <div className="col-12 col-sm-8">2021.05.03</div>
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
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.2.0</div>
              <div className="col-12 col-sm-8">2021.05.01</div>
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
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.1.0</div>
              <div className="col-12 col-sm-8">2021.04.30</div>
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
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v2.0.0</div>
              <div className="col-12 col-sm-8">2021.04.17</div>
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
            <div className="col-3 col-sm-4 px-0 row align-self-center">
              <div className="col-12 col-sm-4 mb-3 fw-bold">v1.0.0</div>
              <div className="col-12 col-sm-8">2021.03.31</div>
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
