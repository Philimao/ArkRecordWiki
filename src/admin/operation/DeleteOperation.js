import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DeleteOperation({ menu, updateMenu }) {
  const [story, setStory] = useState(menu.childNodes[0].story);
  const [storyObject, setStoryObject] = useState(menu.childNodes[0]);
  const [episode, setEpisode] = useState(storyObject.childNodes[0].episode);
  const [episodeObject, setEpisodeObject] = useState(storyObject.childNodes[0]);
  const [operationNodes, setOperationNodes] = useState(
    episodeObject.childNodes
  );
  const [operation, setOperation] = useState("");
  const [cnName, setCnName] = useState("");
  const [description, setDescription] = useState("");
  const [challenge, setChallenge] = useState("");
  const [preview, setPreview] = useState("");

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
        setCnName(object.cn_name);
        setDescription(object.description);
        setChallenge(object.challenge);
        setPreview(object.preview);
        break;
      }
    }
  }, [operation, operationNodes]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (window.confirm("确认删除？")) {
      if (window.confirm("再次确定是否删除？")) {
        const data = {
          story: story,
          episode: episode,
          operation: operation,
        };
        const resRaw = await fetch("/menu/remove-operation", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!resRaw.ok) {
          resRaw.text().then((res) => {
            toast.warning("删除失败\n" + res);
          });
        } else {
          updateMenu((prev) => !prev);
          toast.info("关卡删除成功");
        }
      }
    }
  }

  return (
    <form id="remove_operation_form" className="my-5" onSubmit={handleSubmit}>
      <h4 className="mb-3">删除关卡</h4>
      <div id="operationPreview" className="mb-3">
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
      <button type="submit" className="btn btn-danger">
        删除
      </button>
    </form>
  );
}
