import React, { useEffect, useState } from "react";
import FloatingInputBox from "../../shared/FloatingInputBox";
import { toast } from "react-toastify";
import CustomField from "./CustomField";

export default function CreateOperation({ menu, updateMenu }) {
  const [story, setStory] = useState(menu.childNodes[0].story);
  const [storyObject, setStoryObject] = useState(menu.childNodes[0]);
  const [episode, setEpisode] = useState();
  const [episodeObject, setEpisodeObject] = useState(storyObject.childNodes[0]);
  const [operationNodes, setOperationNodes] = useState(
    episodeObject.childNodes
  );
  const [index, setIndex] = useState(operationNodes.length);
  const [operation, setOperation] = useState("");
  const [cnName, setCnName] = useState("");
  const [description, setDescription] = useState("");
  const [challenge, setChallenge] = useState("");
  const [preview, setPreview] = useState("");

  const [custom, setCustom] = useState([]);

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
    setIndex(operationNodes.length);
  }, [operationNodes.length]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      return evt.target.classList.add("was-validated");
    }
    const data = {
      story: story,
      episode: episode,
      index: index,
      operation: operation,
      cn_name: cnName,
      description: description,
      challenge: challenge,
      preview: preview,
      custom: custom,
    };
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
    <form id="create_operation_form" className="mb-5" onSubmit={handleSubmit}>
      <h4 className="mb-3">创建关卡</h4>
      <div className="form-floating mb-3">
        <select
          className="form-select"
          id="selectStory0"
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
        <label htmlFor="selectStory0">故事类型</label>
      </div>
      <div className="form-floating mb-3">
        <select
          className="form-select"
          id="selectEpisode1"
          value={episode}
          onChange={(evt) => setEpisode(evt.target.value)}
          required
        >
          {storyObject.childNodes.map((episode, index) => (
            <option value={episode.episode} key={"Episode-" + index}>
              {episode.index + " - " + episode.episode}
            </option>
          ))}
        </select>
        <label htmlFor="selectEpisode1">章节名称</label>
      </div>
      <div className="form-floating mb-3">
        <select className="form-select" id="selectOperation4" disabled={true}>
          {operationNodes.map((operation, index) => {
            if (index + 1 !== operationNodes.length) return null;
            return (
              <option value={operation.operation} key={"Operation-" + index}>
                {operation.index +
                  " - " +
                  operation.operation +
                  " - " +
                  operation.cn_name}
              </option>
            );
          })}
        </select>
        <label htmlFor="selectOperation4">现有最新关卡索引 - 名称</label>
      </div>
      <FloatingInputBox
        value={index.toString()}
        onChange={(evt) => setIndex(evt.target.value)}
        required={true}
        id="index"
        type="number"
        label="关卡索引（用于关卡排序，请确认顺序再填写，从0起始）"
      />
      <FloatingInputBox
        value={operation}
        onChange={(evt) => setOperation(evt.target.value)}
        required={true}
        id="operation"
        label="关卡名称"
      />
      <FloatingInputBox
        value={cnName}
        onChange={(evt) => setCnName(evt.target.value)}
        required={true}
        id="cnName"
        label="中文名称"
      />
      <FloatingInputBox
        value={description}
        onChange={(evt) => setDescription(evt.target.value)}
        required={true}
        id="description"
        label="关卡描述"
      />
      <FloatingInputBox
        value={challenge}
        onChange={(evt) => setChallenge(evt.target.value)}
        id="challenge"
        label="突袭条件"
      />
      <FloatingInputBox
        value={preview}
        onChange={(evt) => setPreview(evt.target.value)}
        required={true}
        id="preview"
        label="关卡预览"
      />
      <CustomField custom={custom} setCustom={setCustom} />
      <div className="d-flex">
        <button type="submit" className="btn btn-primary me-auto">
          提交
        </button>
        <button
          className="btn btn-primary"
          onClick={(evt) => {
            evt.preventDefault();
            setCustom((prev) => {
              const custom = JSON.parse(JSON.stringify(prev));
              custom.push({ name: "", value: "" });
              return custom;
            });
          }}
        >
          <i className="fas fa-plus" />
        </button>
      </div>
    </form>
  );
}
