import React from "react";
import Modal from "../shared/Modal";

export default function AboutModal() {
  const about_content = () => (
    <div>
      <h5>基本功能</h5>
      <div>
        点击左侧目录可以查看活动、章节、以及单个关卡。点击关卡将替换右侧主页内容，显示该关卡下的记录。
      </div>
      <div>
        使用上方导航栏输入关卡名并提交，可以直接在目录中跳转到该项目，目前只支持简单的模糊搜索
      </div>
      <div>
        在单个作战记录卡片中点击<strong>显示视频</strong>
        可以快速浏览该视频（仅支持b站上传的视频）。但由于外链分辨率限制，查看高清视频请跳转至b站本部查看。
      </div>
      <h5 className="mt-4">注册用户</h5>
      <div>
        注册用户可以提交自己的作战记录，欢迎各位踊跃注册增加管理员的工作量（
      </div>
      <div>
        注册账号需要提供邮箱用于验证，验证码有效期为10分钟，请尽快填写。
      </div>
      <div>
        本网站仅支持<strong>现代浏览器</strong>（例：chrome, firefox,
        safari），如果发现网站功能出现问题可以尝试先切换到上述浏览器，如果仍然无法使用请联络网站管理员。
      </div>
      <div>
        注册用户可以与自己的b站账号关联，请在登录后点击头像前往个人主页进行关联。b站账户目前仅能关联一次，如希望切换账号，或遇到不可预知的问题请联络网站管理员。
      </div>
      <div>
        关联b站账户后，可以使用b站头像（不稳定）和b站用户名，同时在该用户的纪录下将显示指向攻略者主页的链接（咕咕咕）。
      </div>
      <h5 className="mt-4">提交纪录</h5>
      <div>
        提交纪录时请确认各项数据的准确性，尤其是队伍组成请用 <strong>+</strong>{" "}
        分割，多种同人数组队间请使 <strong>/</strong> 分割。
      </div>
      <div>
        提交纪录时请使用正确的干员名称以降低管理员的工作量，感谢各位用户的支持。
      </div>
      <div>
        纪录提交后将交给后台管理员审核再放出，通知功能目前尚在实现中，如有疑问可以联络网站管理员进行查询。
      </div>
      <h5 className="mt-4">关于本项目</h5>
      <div>
        本项目是
        <a
          href="https://github.com/Ziqing19/ArkRecordWiki"
          style={{ color: "black" }}
        >
          phiilmao
        </a>
        的个人web项目，如果对项目本身感兴趣并希望贡献自己的代码，欢迎加入我们。
      </div>
      <div>
        作者本人前端新人一枚缺乏经验，最近时间紧张仅完成了基本功能的搭建，目前生于黑夜活动期间试运行中。如果遇到功能失效，或是有改进意见，欢迎联系我们。
      </div>
    </div>
  );

  return (
    <Modal id="about_modal" header="站点使用说明" Content={about_content} />
  );
}
