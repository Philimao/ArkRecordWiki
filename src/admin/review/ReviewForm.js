import React, { useEffect, useRef, useState } from "react";
import FloatingInputBox from "../../shared/FloatingInputBox";
import { toast } from "react-toastify";
import Modal from "../../shared/Modal";
import { nanoid } from "nanoid";

export default function Review({
  menu,
  pendingArray,
  setPendingArray,
  index,
  setIndex,
  operators,
}) {
  const [_id, setId] = useState();
  const [submitter, setSubmitter] = useState("");
  const [raider, setRaider] = useState("");
  const [story, setStory] = useState("");
  const [episode, setEpisode] = useState("");
  const [operation, setOperation] = useState("");
  const [cnName, setCnName] = useState("");
  const [operationType, setOperationType] = useState("");
  const [team, setTeam] = useState("");
  const [url, setURL] = useState("");
  const [group, setGroup] = useState("");
  const [remark0, setRemark0] = useState("");
  const [remark1, setRemark1] = useState("");

  const [level, setLevel] = useState("");
  const [backOP, setBackOP] = useState("");
  const [OPSkin, setOPSkin] = useState("e1");

  const [reviewMsg, setReviewMsg] = useState("");

  const card_feedback = useRef();

  const [storyObject, setStoryObject] = useState(menu.childNodes[0]);
  const [episodeObject, setEpisodeObject] = useState(storyObject.childNodes[0]);
  const [operationNodes, setOperationNodes] = useState(
    episodeObject.childNodes
  );

  function resetForm() {
    setSubmitter("");
    setRaider("");
    setStory("");
    setEpisode("");
    setOperation("");
    setCnName("");
    setOperationType("");
    setTeam("");
    setURL("");
    setGroup("");
    setRemark0("");
    setRemark1("");
    setLevel("");
    setBackOP("");
    setOPSkin("");
    setReviewMsg("");
  }

  useEffect(() => {
    if (!pendingArray || !pendingArray[0] || !pendingArray[index])
      return resetForm();
    setId(pendingArray[index]._id);
    setSubmitter(pendingArray[index].submitter);
    setRaider(pendingArray[index].raider);
    setStory(pendingArray[index].story);
    setEpisode(pendingArray[index].episode);
    setOperation(pendingArray[index].operation);
    setCnName(pendingArray[index].cn_name);
    setOperationType(pendingArray[index].operationType);
    setURL(pendingArray[index].url);
    if (Array.isArray(pendingArray[index].team)) {
      setTeam(pendingArray[index].team.join("+"));
    } else {
      setTeam(pendingArray[index].team);
    }
    if (!pendingArray[index].group || pendingArray[index].group === "") {
      setGroup("");
    } else {
      setGroup(pendingArray[index].group);
    }
    if (!pendingArray[index].remark0) {
      setRemark0("");
    } else {
      setRemark0(pendingArray[index].remark0);
    }
    if (!pendingArray[index].remark1) {
      setRemark1("");
    } else {
      setRemark1(pendingArray[index].remark1);
    }
    if (!pendingArray[index].level) {
      setLevel("");
    } else {
      setLevel(pendingArray[index].level);
    }
    if (!pendingArray[index].backOP) {
      setBackOP("");
    } else {
      setBackOP(pendingArray[index].backOP);
    }
    if (!pendingArray[index].OPSkin) {
      setOPSkin("");
    } else {
      setOPSkin(pendingArray[index].OPSkin);
    }
  }, [pendingArray, index]);

  useEffect(() => {
    if (pendingArray && pendingArray.length !== 0) {
      for (let object of menu.childNodes) {
        if (object.story === story) {
          setStoryObject(object);
          break;
        }
      }
    } else {
      setStoryObject(menu.childNodes[0]);
    }
  }, [menu, pendingArray, story]);

  useEffect(() => {
    if (storyObject && episode) {
      for (let object of storyObject.childNodes) {
        if (object.episode === episode) {
          setEpisodeObject(object);
          break;
        }
      }
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

  useEffect(() => {
    for (let object of operationNodes) {
      if (object.operation === operation) {
        setCnName(object.cn_name);
        break;
      }
    }
  }, [operation, operationNodes]);

  function prevRecord(evt) {
    if (evt) evt.preventDefault();
    if (pendingArray.length === 0) {
      setIndex(0);
      resetForm();
      return;
    }
    if (index >= 1) {
      setIndex(index - 1);
    }
  }

  function nextRecord(evt) {
    evt.preventDefault();
    if (pendingArray.length === 0) {
      setIndex(0);
      resetForm();
      return;
    }
    if (index < pendingArray.length - 1) {
      setIndex(index + 1);
    }
  }

  async function handleSubmit(evt) {
    if (evt) {
      evt.preventDefault();
      if (!evt.target.checkValidity()) {
        return evt.target.classList.add("was-validated");
      }
    }
    const data = {
      _id: _id,
      story: story,
      episode: episode,
      submitter: submitter,
      raider: raider,
      operation: operation,
      cn_name: cnName,
      operationType: operationType,
      team: team,
      url: url,
      group: group,
      remark0: remark0,
      remark1: remark1,
      level: level,
      backOP: backOP,
      OPSkin: OPSkin,
      msg: reviewMsg,
    };
    const resRaw = await fetch("/record/accept-pending", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await resRaw.text();
    if (!resRaw.ok) {
      toast.warning("提交失败\n" + res);
    } else {
      toast.info(res);
      setPendingArray((prev) => {
        const newArray = JSON.parse(JSON.stringify(prev));
        newArray.splice(index, 1);
        return newArray;
      });
      prevRecord();
      setReviewMsg("");
    }
  }

  async function handleDelete() {
    if (window.confirm("确认是否删除该纪录？")) {
      const resRaw = await fetch("/record/delete-pending", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: _id, msg: reviewMsg }),
      });
      if (!resRaw.ok) {
        resRaw.text().then((res) => {
          toast.warning("删除失败\n" + res);
        });
      } else {
        toast.info("删除成功");
        setPendingArray((prev) => {
          const newArray = JSON.parse(JSON.stringify(prev));
          newArray.splice(index, 1);
          return newArray;
        });
        prevRecord();
        setReviewMsg("");
      }
    }
  }

  function reviewMessage() {
    const id = nanoid();
    return (
      <div className="px-2">
        <label className="form-label" htmlFor={id}>
          给用户的留言将会被展示在审核通过/不通过的系统消息中（可选）：
        </label>
        <textarea
          value={reviewMsg}
          onChange={(evt) => setReviewMsg(evt.target.value)}
          className="form-control"
          id={id}
          rows="10"
        />
      </div>
    );
  }

  return (
    <form id="record_submit_form" onSubmit={handleSubmit}>
      <h4 className="mb-3">审核纪录</h4>
      <FloatingInputBox
        value={submitter}
        onChange={(evt) => setSubmitter(evt.target.value)}
        required={true}
        id="review_submitter"
        label="提交者"
        disabled={!pendingArray[0]}
      />
      <FloatingInputBox
        value={raider}
        onChange={(evt) => setRaider(evt.target.value)}
        required={true}
        id="review_raider"
        label="攻略者"
        disabled={!pendingArray[0]}
      />
      <div className="form-floating mb-3">
        <select
          className="form-select"
          id="review_story"
          value={story}
          onChange={(evt) => setStory(evt.target.value)}
          disabled={!pendingArray[0]}
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
          disabled={!pendingArray[0]}
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
      <div className="form-floating mb-3">
        <select
          className="form-select"
          id="submit_operation"
          value={operation}
          onChange={(evt) => setOperation(evt.target.value)}
          disabled={!pendingArray[0]}
          required
        >
          {operationNodes.map((operation, index) => (
            <option value={operation.operation} key={"Operation-" + index}>
              {operation.operation + " " + operation.cn_name}
            </option>
          ))}
        </select>
        <label htmlFor="submit_operation">关卡名称</label>
      </div>
      <div className="form-floating mb-3">
        <select
          className="form-select"
          id="review_operationType"
          value={operationType}
          onChange={(evt) => setOperationType(evt.target.value)}
          disabled={!pendingArray[0]}
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
        disabled={!pendingArray[0]}
      />
      <div className="d-flex">
        <div className="flex-grow-1 me-3">
          <FloatingInputBox
            value={url}
            onChange={(evt) => setURL(evt.target.value)}
            required={true}
            id="review_url"
            label="B站视频链接"
            disabled={!pendingArray[0]}
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
          disabled={!pendingArray[0]}
        />
        <label htmlFor="review_group">纪录分组</label>
        <datalist id="review_group_datalist">
          <option value="bug修复记录失效" />
          <option value="开荒记录（不使用关卡实装后才上线的干员）" />
        </datalist>
      </div>
      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          placeholder="remark"
          id="review_remark"
          value={remark0}
          onChange={(evt) => setRemark0(evt.target.value)}
          style={{ minHeight: "8rem" }}
          disabled={!pendingArray[0]}
        />
        <label htmlFor="review_remark">提交者备注（不会显示在网页上）</label>
      </div>
      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          placeholder="remark"
          id="review_remark1"
          value={remark1}
          onChange={(evt) => setRemark1(evt.target.value)}
          style={{ minHeight: "8rem" }}
          disabled={!pendingArray[0]}
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
      <div className="mb-3 d-sm-flex">
        <div className="me-auto mb-2 mb-sm-0">
          <button
            type="submit"
            className="btn btn-primary me-2"
            disabled={!pendingArray[0]}
          >
            通过
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={(evt) => evt.preventDefault()}
            data-bs-toggle="modal"
            data-bs-target="#approve_message_modal"
            disabled={!pendingArray[0]}
          >
            提供反馈并通过
          </button>
          <button
            className="btn btn-danger me-auto"
            onClick={(evt) => evt.preventDefault()}
            data-bs-toggle="modal"
            data-bs-target="#reject_message_modal"
            disabled={!pendingArray[0]}
          >
            删除
          </button>
        </div>
        <button
          className="btn btn-primary me-2"
          onClick={prevRecord}
          disabled={!pendingArray[0]}
        >
          上一个
        </button>
        <button
          className="btn btn-primary"
          onClick={nextRecord}
          disabled={!pendingArray[0]}
        >
          下一个
        </button>
      </div>
      <Modal
        id="approve_message_modal"
        handleSubmit={handleSubmit}
        Content={reviewMessage}
        header="通过纪录-审核反馈"
      />
      <Modal
        id="reject_message_modal"
        handleDelete={handleDelete}
        Content={reviewMessage}
        header="删除纪录-审核反馈"
      />
    </form>
  );
}
