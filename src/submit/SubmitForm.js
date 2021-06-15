import React, { useEffect, useRef, useState } from "react";
import FloatingInputBox from "../shared/FloatingInputBox";
import { toast } from "react-toastify";
import specialOpen from "./SpecialOpen";

export default function SubmitForm({
  user,
  menu,
  operators,
  categories,
  pStory,
  pEpisode,
  pOperation,
  pCnName,
  setRefresh,
}) {
  const [story, setStory] = useState(menu.childNodes[0].story);
  const [storyObject, setStoryObject] = useState(menu.childNodes[0]);
  const [episode, setEpisode] = useState(storyObject.childNodes[0].episode);
  const [episodeObject, setEpisodeObject] = useState(storyObject.childNodes[0]);
  const [operationNodes, setOperationNodes] = useState(
    episodeObject.childNodes
  );
  const [operation, setOperation] = useState("");
  const [cnName, setCnName] = useState("");

  const [raider, setRaider] = useState("");
  const [operationType, setOperationType] = useState("normal");
  const [team, setTeam] = useState("");
  const [url, setURL] = useState("");
  const [category, setCategory] = useState([categories[0]]);
  const [editCategory, setEditCategory] = useState(false);
  const [group, setGroup] = useState("");
  const [groupArray, setGroupArray] = useState([
    "bug修复记录失效",
    "开荒记录（不使用关卡实装后才上线的干员）",
  ]);
  const [remark0, setRemark0] = useState("");
  const [remark1, setRemark1] = useState("");

  const [level, setLevel] = useState("");
  const [backOP, setBackOP] = useState("");
  const [OPSkin, setOPSkin] = useState("e1");

  const card_feedback = useRef();

  const su = user.role === "su";
  const admin = su || user.role === "admin";

  useEffect(() => {
    if (pStory) setStory(pStory);
  }, [pStory]);

  useEffect(() => {
    for (let object of menu.childNodes) {
      if (object.story === story) {
        setStoryObject(object);
        break;
      }
    }
  }, [menu, story]);

  useEffect(() => {
    setEpisodeObject(storyObject.childNodes[0]);
    setEpisode(storyObject.childNodes[0].episode);
  }, [storyObject]);

  useEffect(() => {
    if (pEpisode) setEpisode(pEpisode);
  }, [pEpisode, storyObject]);

  useEffect(() => {
    for (let object of storyObject.childNodes) {
      if (object.episode === episode) {
        setEpisodeObject(object);
        break;
      }
    }
  }, [episode, storyObject]);

  useEffect(() => {
    if (episodeObject.childNodes) {
      setOperationNodes(episodeObject.childNodes);
    } else {
      setOperationNodes([]);
    }
  }, [episodeObject]);

  useEffect(() => {
    if (operationNodes[0]) {
      setOperation(operationNodes[0].operation);
      setCnName(operationNodes[0].cn_name);
    } else {
      setOperation("");
      setCnName("");
    }
  }, [operationNodes]);

  useEffect(() => {
    if (pOperation && pCnName) {
      setOperation(pOperation);
      setCnName(pCnName);
    }
  }, [pOperation, pCnName, operationNodes]);

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (!user.username) {
      return toast.warning("用户身份丢失，请刷新网页重新提交");
    }

    if (url.indexOf("？") >= 0) {
      return toast.warning("链接中含有中文问号字符，请确认");
    }

    if (team.includes("＋")) {
      return toast.warning("组队中含有中文加号字符，请确认");
    }

    // if the url is a short bv link, make it a full link
    let newURL = url.trim();
    if (newURL.startsWith("www")) {
      newURL = "https://" + newURL;
    }
    if (newURL.indexOf("bv") === 0) {
      newURL = "https://www.bilibili.com/video/" + newURL.replace("bv", "BV");
    } else if (newURL.indexOf("BV") === 0) {
      newURL = "https://www.bilibili.com/video/" + newURL;
    }
    // leave out all queries but p
    if (newURL.includes("BV") && newURL.includes("?")) {
      const newURLArray = newURL.split("?");
      newURL = newURLArray[0];
      const queryArray = newURLArray[1].split("&");
      if (queryArray.length !== 0) {
        for (let query of queryArray) {
          if (query.includes("p=")) {
            newURL = newURL + "?" + query;
          }
        }
      }
    }
    newURL = newURL.trim();

    // sort category
    if (category.length === 0) {
      category.push("常规队");
    }
    category.sort((a, b) => {
      const indexA = categories.indexOf(a);
      const indexB = categories.indexOf(b);
      return indexA - indexB;
    });

    // validate operator name
    for (let op of team.split("+")) {
      let flag = true;
      for (let opObj of operators) {
        if (opObj.name1 === op.slice(0, op.length - 1) || opObj.name1 === op) {
          flag = false;
          break;
        }
      }
      if (flag) {
        return toast.warning("队伍组成中 " + op + " 无法解析，请检查");
      }
    }

    // add new group to the datalist
    setGroupArray((prev) => {
      const set = new Set(prev);
      set.add(group);
      return Array.from(set);
    });

    const data = {
      submitter: user.username,
      story: story,
      episode: episode,
      raider: raider,
      operation: operation,
      cn_name: cnName,
      operationType: operationType,
      team: team,
      category: category,
      group: group,
      url: newURL,
      level: level,
      backOP: backOP,
      OPSkin: OPSkin,
      remark0: remark0,
      remark1: remark1,
    };

    setTeam("");
    setURL("");
    setRemark0("");
    setRemark1("");
    let resRaw;
    // admin submit form
    if (admin) {
      resRaw = await fetch("/record/admin-submit-record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else if (
      user.review_free ||
      (specialOpen() &&
        story === "危机合约" &&
        episode === "#5光谱行动" &&
        operation.indexOf("常驻") < 0)
    ) {
      resRaw = await fetch("/record/review-free-submit-record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    // user submit form
    else {
      resRaw = await fetch("/record/submit-record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    const res = await resRaw.text();
    if (!resRaw.ok) {
      toast.warning(res);
    } else {
      toast.info(res);
    }
    if (setRefresh) {
      setRefresh((prev) => !prev);
    }
  }

  // return (
  //   <div className="text-center" style={{ marginTop: "20vh" }}>
  //     <h1>由于新活动索引冲突，本站暂时关闭投稿，敬请谅解！</h1>
  //   </div>
  // );

  return (
    <div>
      <form id="record_submit_form" onSubmit={handleSubmit}>
        <div className="d-flex mb-2">
          <h4 className="mb-0 me-auto align-self-center">提交纪录</h4>
          <div id="submit_guide_buttons">
            <button
              className="btn btn-outline-primary me-2"
              data-bs-toggle="modal"
              data-bs-target="#submit_simple_guide"
              onClick={(evt) => {
                evt.preventDefault();
              }}
            >
              投稿指引
            </button>
            <button
              className="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#submit_detailed_guide"
              onClick={(evt) => {
                evt.preventDefault();
              }}
            >
              收录原则
            </button>
          </div>
        </div>
        {specialOpen() ? (
          <div className="mb-3">光谱行动日替免审核投稿开放中</div>
        ) : null}
        {pStory ? null : (
          <div className="form-floating mb-3">
            <select
              className="form-select"
              id="submit_story"
              value={story}
              onChange={(evt) => setStory(evt.target.value)}
              required
            >
              {menu.childNodes.map((story, index) => (
                <option value={story.story} key={"Story-" + index}>
                  {story.story}
                </option>
              ))}
            </select>
            <label htmlFor="submit_story">故事类型</label>
          </div>
        )}
        {pEpisode ? null : (
          <div className="form-floating mb-3">
            <select
              className="form-select"
              id="submit_episode"
              value={episode}
              onChange={(evt) => setEpisode(evt.target.value)}
              required
            >
              {storyObject.childNodes.map((episode, index) => (
                <option value={episode.episode} key={"Episode-" + index}>
                  {episode.episode}
                </option>
              ))}
            </select>
            <label htmlFor="submit_episode">章节名称</label>
          </div>
        )}
        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="submit_operation"
            value={operation + "+" + cnName}
            onChange={(evt) => {
              setOperation(evt.target.value.split("+")[0]);
              setCnName(evt.target.value.split("+")[1]);
            }}
            required
            disabled={pOperation !== undefined}
          >
            {operationNodes.map((operation, index) => (
              <option
                value={operation.operation + "+" + operation.cn_name}
                key={"Operation-" + index}
              >
                {operation.operation + " " + operation.cn_name}
              </option>
            ))}
          </select>
          <label htmlFor="submit_operation">关卡名称</label>
        </div>
        <FloatingInputBox
          value={raider}
          onChange={(evt) => setRaider(evt.target.value)}
          required={true}
          id="submit_raider"
          label="发布账号"
        />
        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="submit_operationType"
            value={operationType}
            onChange={(evt) => setOperationType(evt.target.value)}
            required
          >
            <option value="normal">普通</option>
            <option value="challenge">突袭</option>
          </select>
          <label htmlFor="submit_operationType">关卡类型</label>
        </div>
        <FloatingInputBox
          value={team}
          onChange={(evt) => setTeam(evt.target.value)}
          required={true}
          id="submit_team"
          label="队伍组成（例：银灰3+史尔特尔3，使用+分隔）"
        />
        <div className="d-flex">
          <div className="flex-grow-1 me-3">
            <FloatingInputBox
              value={category.join("，")}
              onChange={() => {}}
              required={true}
              id="submit_category"
              label="流派分类"
            />
          </div>
          <button
            className="btn btn-primary mb-3 d-flex flex-column justify-content-center"
            onClick={(evt) => {
              evt.preventDefault();
              setEditCategory((prev) => !prev);
            }}
          >
            {editCategory ? (
              <i className="bi bi-chevron-double-down" />
            ) : (
              <i className="bi bi-chevron-double-up" />
            )}
          </button>
        </div>
        {editCategory ? (
          <div className="mb-3 row mx-0">
            {categories.map((item) => (
              <div className="form-check col-6" key={item}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={item}
                  onChange={() => {
                    const tmp = Array.from(category);
                    if (category.includes(item)) {
                      tmp.splice(tmp.indexOf(item), 1);
                    } else {
                      tmp.push(item);
                    }
                    setCategory(tmp);
                  }}
                  checked={category.includes(item)}
                />
                <label htmlFor={item} className="form-check-label">
                  {item}
                </label>
              </div>
            ))}
          </div>
        ) : null}
        <FloatingInputBox
          value={url}
          onChange={(evt) => setURL(evt.target.value)}
          required={true}
          id="submit_url"
          label="支持B站和Youtube链接，详情请参考投稿指引"
        />
        {admin ? (
          <div className="form-floating mb-3">
            <input
              list="submit_group_datalist"
              className="form-control"
              id="submit_group"
              value={group}
              onChange={(evt) => setGroup(evt.target.value)}
              placeholder="group"
            />
            <label htmlFor="submit_group">纪录分组</label>
            <datalist id="submit_group_datalist">
              {groupArray.map((item) => (
                <option value={item} key={item} />
              ))}
            </datalist>
          </div>
        ) : null}
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            placeholder="remark"
            id="submit_remark"
            value={remark0}
            onChange={(evt) => setRemark0(evt.target.value)}
            style={{ minHeight: "8rem" }}
          />
          <label htmlFor="submit_remark">备注内容（仅管理员可见）</label>
        </div>
        {admin ? (
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder="remark"
              id="submit_remark1"
              value={remark1}
              onChange={(evt) => setRemark1(evt.target.value)}
              style={{ minHeight: "8rem" }}
            />
            <label htmlFor="submit_remark1">
              纪录备注（通关时间等说明文字）
            </label>
          </div>
        ) : null}
        {story === "危机合约" ? (
          <div>
            <FloatingInputBox
              value={level}
              onChange={(evt) => setLevel(evt.target.value)}
              id="submit_level"
              label="危机等级"
              type="number"
              min={0}
              required={story === "危机合约"}
            />
            <FloatingInputBox
              value={backOP}
              onChange={(evt) => setBackOP(evt.target.value)}
              id="submit_backOP"
              label="背景干员"
            />
            <div className="mb-3">
              <div className="d-flex">
                <div className="form-floating flex-grow-1 me-3">
                  <select
                    id="submit_OPSkin"
                    className="form-select"
                    value={OPSkin}
                    onChange={(evt) => setOPSkin(evt.target.value)}
                  >
                    <option value="e1">精一立绘</option>
                    <option value="e2">精二立绘</option>
                    <option value="skin1">皮肤 1</option>
                    <option value="skin2">皮肤 2</option>
                    <option value="skin3">皮肤 3</option>
                  </select>
                  <label htmlFor="submit_OPSkin">
                    干员立绘（请点击右侧按钮确认立绘是否可用）
                  </label>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={(evt) => {
                    evt.preventDefault();
                    let url = "/images/char/";
                    for (let op of operators) {
                      if (op.name1 === backOP) {
                        url += op.name2 + "_" + OPSkin + "_bust.png";
                        break;
                      }
                    }
                    if (url.indexOf("png") < 0) {
                      return toast.warning("干员不存在");
                    }
                    fetch(url).then((resRaw) => {
                      if (resRaw.headers.get("Content-Type") !== "image/png") {
                        card_feedback.current.innerText =
                          "卡背图片未录入，请更换或联系管理员";
                        card_feedback.current.className =
                          "invalid-feedback d-block";
                      } else {
                        card_feedback.current.innerText = "此卡背可以使用";
                        card_feedback.current.className =
                          "valid-feedback d-block";
                      }
                    });
                  }}
                >
                  <i className="bi bi-image" />
                </button>
              </div>
              <div className="d-none" ref={card_feedback} />
            </div>
          </div>
        ) : null}
        <button type="submit" className="btn btn-primary">
          提交
        </button>
      </form>
    </div>
  );
}
