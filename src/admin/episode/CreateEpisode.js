import React, { useEffect, useState } from "react";
import FloatingInputBox from "../../shared/FloatingInputBox";
import { toast } from "react-toastify";

export default function CreateEpisode({ menu, updateMenu }) {
  const [story, setStory] = useState(menu.childNodes[0].story);
  const [storyObject, setStoryObject] = useState(menu.childNodes[0]);
  const [index, setIndex] = useState(storyObject.childNodes.length);
  const [episode, setEpisode] = useState("");

  useEffect(() => {
    for (let object of menu.childNodes) {
      if (object.story === story) {
        setStoryObject(object);
        break;
      }
    }
  }, [menu, story]);

  useEffect(() => {
    setIndex(storyObject.childNodes.length);
  }, [storyObject.childNodes.length]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    const data = {
      story: story,
      index: index,
      episode: episode,
    };
    setEpisode("");
    const resRaw = await fetch("/menu/create-episode", {
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
      toast.info("章节创建成功");
    }
  }

  return (
    <form id="create_episode_form" className="mb-5" onSubmit={handleSubmit}>
      <h4 className="mb-3">创建主线章节/活动</h4>
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
      {/* no effects on the form */}
      <div className="form-floating mb-3">
        <select className="form-select" disabled={true}>
          {storyObject.childNodes.map((episode, index) => {
            if (index + 1 !== storyObject.childNodes.length) return null;
            return (
              <option value={episode.episode} key={"Episode-" + index}>
                {episode.index + " - " + episode.episode}
              </option>
            );
          })}
        </select>
        <label htmlFor="selectEpisode1">现有最新章节索引 - 名称</label>
      </div>
      <FloatingInputBox
        value={index.toString()}
        onChange={(evt) => setIndex(evt.target.value)}
        required={true}
        id="index"
        type="number"
        min={0}
        label="新章节索引（用于章节排序，请确认顺序再填写，从0起始）"
      />
      <FloatingInputBox
        value={episode}
        onChange={(evt) => setEpisode(evt.target.value)}
        required={true}
        id="episode"
        label="新章节名称"
      />
      <button type="submit" className="btn btn-primary">
        提交
      </button>
    </form>
  );
}
