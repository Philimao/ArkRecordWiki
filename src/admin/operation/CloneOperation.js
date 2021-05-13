import React, { useEffect, useState } from "react";
import FloatingInputBox from "../../shared/FloatingInputBox";
import { toast } from "react-toastify";

export default function CloneOperation({ menu, updateMenu }) {
  const story = menu.childNodes[2].story;
  const storyObject = menu.childNodes[2];
  const [episode, setEpisode] = useState(storyObject.childNodes[0].episode);
  const [episodeObject, setEpisodeObject] = useState(storyObject.childNodes[0]);
  const [targetEpisode, setTargetEpisode] = useState(episode);
  const [targetEpisodeObject, setTargetEpisodeObject] = useState(episodeObject);
  const [operationNodes, setOperationNodes] = useState([]);
  const [operation, setOperation] = useState("");
  const [operationObject, setOperationObject] = useState();
  const [index, setIndex] = useState(0);
  const [newOperation, setNewOperation] = useState("");

  useEffect(() => {
    for (let object of storyObject.childNodes) {
      if (object.episode === episode) {
        setEpisodeObject(object);
        break;
      }
    }
  }, [episode, storyObject]);

  useEffect(() => {
    for (let object of storyObject.childNodes) {
      if (object.episode === targetEpisode) {
        setTargetEpisodeObject(object);
        break;
      }
    }
  }, [targetEpisode, storyObject]);

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
    } else {
      setOperation("");
    }
  }, [operationNodes]);

  useEffect(() => {
    for (let object of operationNodes) {
      if (object.operation === operation) {
        setOperationObject(object);
        setNewOperation(object.operation);
        break;
      }
    }
  }, [operation, operationNodes]);

  useEffect(() => {
    if (targetEpisodeObject.childNodes) {
      setIndex(targetEpisodeObject.childNodes.length);
    } else {
      setIndex(0);
    }
  }, [targetEpisodeObject]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      return evt.target.classList.add("was-validated");
    }
    const data = JSON.parse(JSON.stringify(operationObject));
    data.story = story;
    data.episode = targetEpisode;
    data.operation = newOperation;
    data.index = index;
    const resRaw = await fetch("/menu/create-operation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!resRaw.ok) {
      resRaw.text().then((res) => {
        toast.warning("提交失败\n" + res);
      });
    } else {
      updateMenu((prev) => !prev);
      setIndex(index + 1);
      toast.info("关卡创建成功");
    }
  }

  return (
    <form className={"my-5"} onSubmit={handleSubmit}>
      <h4 className={"mb-3"}>合约关卡克隆</h4>
      <div className={"mb-3"}>
        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="cloneEpisode"
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
          <label htmlFor="cloneEpisode">合约名称</label>
        </div>
        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="cloneOperation"
            value={operation}
            onChange={(evt) => setOperation(evt.target.value)}
            required
          >
            {operationNodes.map((operation, index) => (
              <option value={operation.operation} key={"Operation-" + index}>
                {operation.operation + " - " + operation.cn_name}
              </option>
            ))}
          </select>
          <label htmlFor="cloneOperation">源日期 - 关卡</label>
        </div>
        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="cloneEpisode"
            value={targetEpisode}
            onChange={(evt) => setTargetEpisode(evt.target.value)}
            required
          >
            {storyObject.childNodes.map((episode, index) => (
              <option value={episode.episode} key={"Episode-" + index}>
                {episode.index + " - " + episode.episode}
              </option>
            ))}
          </select>
          <label htmlFor="cloneEpisode">目标合约名称</label>
        </div>
        <FloatingInputBox
          value={index.toString()}
          onChange={(evt) => setIndex(evt.target.value)}
          required={true}
          id="update_index"
          type="number"
          label="目标关卡索引"
        />
        <FloatingInputBox
          value={newOperation}
          onChange={(evt) => setNewOperation(evt.target.value)}
          required={true}
          id="clone_date"
          label="目标日期"
        />
      </div>
      <div className="d-flex">
        <button type="submit" className="btn btn-primary me-auto">
          提交
        </button>
      </div>
    </form>
  );
}
