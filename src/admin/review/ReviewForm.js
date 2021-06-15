import React, { useEffect, useRef, useState } from "react";
import FloatingInputBox from "../../shared/FloatingInputBox";
import { toast } from "react-toastify";
import Modal from "../../shared/Modal";
import QueryRecords from "../../shared/QueryRecords";

export default function ReviewForm({
  menu,
  operators,
  categories,
  record,
  setRecord,
  groupArray,
}) {
  const [submitter, setSubmitter] = useState("");
  const [raider, setRaider] = useState("");
  const [story, setStory] = useState("");
  const [episode, setEpisode] = useState("");
  const [operation, setOperation] = useState("");
  const [cnName, setCnName] = useState("");
  const [operationType, setOperationType] = useState("");
  const [team, setTeam] = useState("");
  const [category, setCategory] = useState([]);
  const [editCategory, setEditCategory] = useState(false);
  const [url, setURL] = useState("");
  const [group, setGroup] = useState("");
  const [remark0, setRemark0] = useState("");
  const [remark1, setRemark1] = useState("");

  const [level, setLevel] = useState("");
  const [backOP, setBackOP] = useState("");
  const [OPSkin, setOPSkin] = useState("e1");

  const card_feedback = useRef();

  const [storyObject, setStoryObject] = useState(menu.childNodes[0]);
  const [episodeObject, setEpisodeObject] = useState(storyObject.childNodes[0]);
  const [operationNodes, setOperationNodes] = useState(
    episodeObject.childNodes
  );

  const isReviewPage = window.location.href.includes("/admin/review");

  useEffect(() => {
    setRecord((prev) => {
      if (!prev) return;
      prev.submitter = submitter;
      return prev;
    });
  }, [setRecord, submitter]);

  useEffect(() => {
    setRecord((prev) => {
      if (!prev) return;
      prev.raider = raider;
      return prev;
    });
  }, [setRecord, raider]);

  useEffect(() => {
    setRecord((prev) => {
      if (!prev) return;
      prev.story = story;
      return prev;
    });
  }, [setRecord, story]);

  useEffect(() => {
    setRecord((prev) => {
      if (!prev) return;
      prev.episode = episode;
      return prev;
    });
  }, [setRecord, episode]);

  useEffect(() => {
    setRecord((prev) => {
      if (!prev) return;
      prev.operation = operation;
      return prev;
    });
  }, [setRecord, operation]);

  useEffect(() => {
    setRecord((prev) => {
      if (!prev) return;
      prev.cn_name = cnName;
      return prev;
    });
  }, [setRecord, cnName]);

  useEffect(() => {
    setRecord((prev) => {
      if (!prev) return;
      prev.operationType = operationType;
      return prev;
    });
  }, [setRecord, operationType]);

  useEffect(() => {
    setRecord((prev) => {
      if (!prev) return;
      prev.team = team;
      return prev;
    });
  }, [setRecord, team]);

  useEffect(() => {
    setRecord((prev) => {
      if (!prev) return;
      prev.category = category;
      return prev;
    });
  }, [setRecord, category]);

  useEffect(() => {
    setRecord((prev) => {
      if (!prev) return;
      prev.url = url;
      return prev;
    });
  }, [setRecord, url]);

  useEffect(() => {
    setRecord((prev) => {
      if (!prev) return;
      prev.group = group;
      return prev;
    });
  }, [setRecord, group]);

  useEffect(() => {
    setRecord((prev) => {
      if (!prev) return;
      prev.remark0 = remark0;
      return prev;
    });
  }, [setRecord, remark0]);

  useEffect(() => {
    setRecord((prev) => {
      if (!prev) return;
      prev.remark1 = remark1;
      return prev;
    });
  }, [setRecord, remark1]);

  useEffect(() => {
    setRecord((prev) => {
      if (!prev) return;
      prev.level = level;
      return prev;
    });
  }, [setRecord, level]);

  useEffect(() => {
    setRecord((prev) => {
      if (!prev) return;
      prev.backOP = backOP;
      return prev;
    });
  }, [setRecord, backOP]);

  useEffect(() => {
    setRecord((prev) => {
      if (!prev) return;
      prev.OPSkin = OPSkin;
      return prev;
    });
  }, [setRecord, OPSkin]);

  function resetForm() {
    setSubmitter("");
    setRaider("");
    setStory("");
    setEpisode("");
    setOperation("");
    setCnName("");
    setOperationType("");
    setTeam("");
    setCategory([]);
    setURL("");
    setGroup("");
    setRemark0("");
    setRemark1("");
    setLevel("");
    setBackOP("");
    setOPSkin("");
  }

  useEffect(() => {
    if (!record) return resetForm();
    setSubmitter(record.submitter);
    setRaider(record.raider);
    setStory(record.story);
    setEpisode(record.episode);
    setOperation(record.operation);
    setCnName(record.cn_name);
    setOperationType(record.operationType);
    setURL(record.url);
    if (Array.isArray(record.team)) {
      setTeam(record.team.join("+"));
    } else {
      setTeam(record.team);
    }
    if (!record.category) {
      setCategory(["常规队"]);
    } else {
      setCategory(record.category);
    }
    if (!record.group || record.group === "") {
      setGroup("");
    } else {
      setGroup(record.group);
    }
    if (!record.remark0) {
      setRemark0("");
    } else {
      setRemark0(record.remark0);
    }
    if (!record.remark1) {
      setRemark1("");
    } else {
      setRemark1(record.remark1);
    }
    if (!record.level) {
      setLevel("");
    } else {
      setLevel(record.level);
    }
    if (!record.backOP) {
      setBackOP("");
    } else {
      setBackOP(record.backOP);
    }
    if (!record.OPSkin) {
      setOPSkin("");
    } else {
      setOPSkin(record.OPSkin);
    }
  }, [record]);

  useEffect(() => {
    if (record) {
      let flag = true;
      for (let object of menu.childNodes) {
        if (object.story === story) {
          setStoryObject(object);
          flag = false;
          break;
        }
      }
      if (flag) setStoryObject(menu.childNodes[0]);
    } else {
      setStoryObject(menu.childNodes[0]);
    }
  }, [record, menu, story]);

  useEffect(() => {
    if (storyObject && episode) {
      let flag = true;
      for (let object of storyObject.childNodes) {
        if (object.episode === episode) {
          setEpisodeObject(object);
          flag = false;
          break;
        }
      }
      if (flag) setEpisodeObject(storyObject.childNodes[0]);
    } else {
      setEpisodeObject(storyObject.childNodes[0]);
    }
  }, [episode, storyObject]);

  useEffect(() => {
    if (episodeObject && episodeObject.childNodes) {
      setOperationNodes(episodeObject.childNodes);
    } else {
      setOperationNodes([]);
    }
  }, [episodeObject]);

  function OperationPreview() {
    const query = { operation: operation, cn_name: cnName };
    return <QueryRecords query={query} cardStyle="showCategory" />;
  }

  return (
    <form id="record_review_form">
      <h4 className="mb-3">审核纪录</h4>
      <FloatingInputBox
        value={submitter}
        onChange={(evt) => setSubmitter(evt.target.value)}
        required={true}
        id="review_submitter"
        label="提交者"
        disabled={!record}
      />
      <FloatingInputBox
        value={raider}
        onChange={(evt) => setRaider(evt.target.value)}
        required={true}
        id="review_raider"
        label="发布账号"
        disabled={!record}
      />
      <div className="form-floating mb-3">
        <select
          className="form-select"
          id="review_story"
          value={story}
          onChange={(evt) => setStory(evt.target.value)}
          disabled={!record}
          required
        >
          {menu.childNodes.map((story, index) => (
            <option value={story.story} key={"Story-" + index}>
              {story.story}
            </option>
          ))}
        </select>
        <label htmlFor="review_story">故事类型</label>
      </div>
      <div className="form-floating mb-3">
        <select
          className="form-select"
          id="review_episode"
          value={episode}
          onChange={(evt) => setEpisode(evt.target.value)}
          disabled={!record}
          required
        >
          {storyObject.childNodes.map((episode, index) => (
            <option value={episode.episode} key={"Episode-" + index}>
              {episode.episode}
            </option>
          ))}
        </select>
        <label htmlFor="review_episode">章节名称</label>
      </div>
      <div className="mb-3 d-flex">
        <div
          className={
            "form-floating flex-grow-1" + (isReviewPage ? " me-3" : "")
          }
        >
          <select
            className="form-select"
            id="review_operation"
            value={operation + "+" + cnName}
            onChange={(evt) => {
              const targetOp = evt.target.value.split("+")[0];
              const targetCN = evt.target.value.split("+")[1];
              setOperation(targetOp);
              setCnName(targetCN);
            }}
            disabled={!record}
            required
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
        {isReviewPage ? (
          <button
            className="btn btn-primary d-flex flex-column justify-content-center"
            data-bs-toggle="modal"
            data-bs-target="#operation_preview"
            disabled={!record}
            onClick={(evt) => evt.preventDefault()}
          >
            <i className="bi bi-window" />
          </button>
        ) : null}
      </div>
      <FloatingInputBox
        id="review_user_op"
        value={operation + " " + cnName}
        onChange={() => {}}
        label="确保与上方一致再提交"
        disabled={true}
      />
      <div className="form-floating mb-3">
        <select
          className="form-select"
          id="review_operationType"
          value={operationType}
          onChange={(evt) => setOperationType(evt.target.value)}
          disabled={!record}
          required
        >
          <option value="normal">普通</option>
          <option value="challenge">突袭</option>
        </select>
        <label htmlFor="review_operationType">关卡类型</label>
      </div>
      <FloatingInputBox
        value={team}
        onChange={(evt) => setTeam(evt.target.value)}
        required={true}
        id="review_team"
        label="队伍组成"
        disabled={!record}
      />
      <div className="d-flex">
        <div className="flex-grow-1 me-3">
          <FloatingInputBox
            value={category.join("，")}
            onChange={() => {}}
            required={true}
            id="review_category"
            label="流派分类"
            disabled={!record}
          />
        </div>
        <button
          className="btn btn-primary mb-3 d-flex flex-column justify-content-center"
          onClick={(evt) => {
            evt.preventDefault();
            setEditCategory((prev) => !prev);
          }}
          disabled={!record}
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
      <div className="d-flex">
        <div className="flex-grow-1 me-3">
          <FloatingInputBox
            value={url}
            onChange={(evt) => setURL(evt.target.value)}
            required={true}
            id="review_url"
            label="B站视频链接"
            disabled={!record}
          />
        </div>
        <a
          className="btn mb-3 d-flex flex-column justify-content-center"
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: "#dc7598", color: "white" }}
          href={url}
        >
          <i className="bi bi-tv" />
        </a>
      </div>
      <div className="form-floating mb-3">
        <input
          list="review_group_datalist"
          className="form-control"
          id="review_group"
          value={group}
          onChange={(evt) => setGroup(evt.target.value)}
          placeholder="group"
          disabled={!record}
        />
        <label htmlFor="review_group">纪录分组</label>
        <datalist id="review_group_datalist">
          {groupArray.map((item) => (
            <option value={item} key={item} />
          ))}
        </datalist>
      </div>
      <div className="d-flex">
        <div className="flex-grow-1 form-floating me-3 mb-3">
          <textarea
            className="form-control"
            placeholder="remark"
            id="review_remark"
            value={remark0}
            onChange={(evt) => setRemark0(evt.target.value)}
            style={{ minHeight: "8rem" }}
            disabled={true}
          />
          <label htmlFor="review_remark">
            提交者备注（不会显示在网页上，点击按钮复制）
          </label>
        </div>
        <button
          className="btn btn-primary mb-3 d-flex flex-column justify-content-center"
          onClick={(evt) => {
            evt.preventDefault();
            setRemark1(remark0);
          }}
        >
          <i className="bi bi-scissors" />
        </button>
      </div>
      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          placeholder="remark"
          id="review_remark1"
          value={remark1}
          onChange={(evt) => setRemark1(evt.target.value)}
          style={{ minHeight: "8rem" }}
          disabled={!record}
        />
        <label htmlFor="review_remark1">纪录备注（通关时间等说明文字）</label>
      </div>
      {story === "危机合约" ? (
        <div>
          <FloatingInputBox
            value={level}
            onChange={(evt) => setLevel(evt.target.value)}
            id="review_level"
            label="危机等级"
            type="number"
            min={0}
          />
          <FloatingInputBox
            value={backOP}
            onChange={(evt) => setBackOP(evt.target.value)}
            id="review_backOP"
            label="背景干员"
          />
          <div className="mb-3">
            <div className="d-flex">
              <div className="form-floating flex-grow-1 me-3">
                <select
                  id="review_OPSkin"
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
                <label htmlFor="review_OPSkin">
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
      {isReviewPage ? (
        <Modal
          id="operation_preview"
          header={operation + " " + cnName}
          Content={OperationPreview}
        />
      ) : null}
    </form>
  );
}
