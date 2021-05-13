import React, { useEffect, useState } from "react";
import FloatingInputBox from "../../shared/FloatingInputBox";
import { toast } from "react-toastify";
import CustomField from "./CustomField";

export default function UpdateOperation({ menu, updateMenu }) {
  const [story, setStory] = useState(menu.childNodes[0].story);
  const [storyObject, setStoryObject] = useState(menu.childNodes[0]);
  const [episode, setEpisode] = useState(storyObject.childNodes[0].episode);
  const [episodeObject, setEpisodeObject] = useState(storyObject.childNodes[0]);
  const [operationNodes, setOperationNodes] = useState(
    episodeObject.childNodes
  );
  const [operation, setOperation] = useState("");
  const [index, setIndex] = useState(0);
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
    if (operationNodes[0]) {
      setOperation(operationNodes[0].operation);
    } else {
      setOperation("");
    }
  }, [operationNodes]);

  useEffect(() => {
    for (let object of operationNodes) {
      if (object.operation === operation) {
        setIndex(object.index);
        setCnName(object.cn_name);
        setDescription(object.description);
        setChallenge(object.challenge);
        setPreview(object.preview);
        if (object.custom) {
          setCustom(object.custom);
        } else {
          setCustom([]);
        }
        break;
      }
    }
  }, [operation, operationNodes]);

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
    const resRaw = await fetch("/menu/update-operation", {
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
      toast.info("关卡更新成功");
    }
  }

  return (
    <form className={"my-5"} onSubmit={handleSubmit}>
      <h4 className={"mb-3"}>更新关卡</h4>
      <div id="update_operationPreview" className="mb-3">
        <div className="text-center mb-3">
          <img
            src={preview}
            alt="previewImage"
            id="previewImage"
            className="img-fluid"
          />
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col" style={{ width: "20%" }}>
                域
              </th>
              <th scope="col" style={{ width: "80%" }}>
                值
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>关卡名称</td>
              <td id="previewOperation">{operation}</td>
            </tr>
            <tr>
              <td>中文名称</td>
              <td id="previewCNName">{cnName}</td>
            </tr>
            <tr>
              <td>关卡描述</td>
              <td id="previewDescription">{description}</td>
            </tr>
            <tr>
              <td>突袭条件</td>
              <td id="previewChallenge">{challenge}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={"mb-3"}>
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
          <label htmlFor="selectStory4">故事类型</label>
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
          <label htmlFor="selectEpisode4">章节名称</label>
        </div>
        <div className="form-floating mb-3">
          <select
            className="form-select"
            id="selectOperation4"
            value={operation}
            onChange={(evt) => setOperation(evt.target.value)}
            required
          >
            {operationNodes.map((operation, index) => (
              <option value={operation.operation} key={"Operation-" + index}>
                {operation.index +
                  " - " +
                  operation.operation +
                  " - " +
                  operation.cn_name}
              </option>
            ))}
          </select>
          <label htmlFor="selectOperation4">关卡索引 - 名称</label>
        </div>
        <FloatingInputBox
          value={operation}
          label="关卡名称（不可更改）"
          id="update_operation"
          onChange={() => {}}
          disabled={true}
        />
        <FloatingInputBox
          value={cnName}
          onChange={(evt) => setCnName(evt.target.value)}
          required={true}
          id="update_cnName"
          label="中文名称（不可更改）"
          disabled={true}
        />
        <FloatingInputBox
          value={index.toString()}
          onChange={(evt) => setIndex(evt.target.value)}
          required={true}
          id="update_index"
          type="number"
          label="关卡索引"
        />
        <FloatingInputBox
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
          required={true}
          id="update_description"
          label="关卡描述"
        />
        <FloatingInputBox
          value={challenge}
          onChange={(evt) => setChallenge(evt.target.value)}
          id="update_challenge"
          label="突袭条件"
        />
        <FloatingInputBox
          value={preview}
          onChange={(evt) => setPreview(evt.target.value)}
          required={true}
          id="update_preview"
          label="关卡预览"
        />
      </div>
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
