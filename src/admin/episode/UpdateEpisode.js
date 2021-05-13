import React, { useState, useEffect } from "react";
import FloatingInputBox from "../../shared/FloatingInputBox";
import { toast } from "react-toastify";

export default function UpdateEpisode({ menu, updateMenu }) {
  const [story, setStory] = useState(menu.childNodes[0].story);
  const [storyObject, setStoryObject] = useState(menu.childNodes[0]);
  const [episode, setEpisode] = useState(
    menu.childNodes[0].childNodes[0].episode
  );
  const [index, setIndex] = useState("");
  const [newEpisode, setNewEpisode] = useState("");

  useEffect(() => {
    for (let object of menu.childNodes) {
      if (object.story === story) {
        setStoryObject(object);
        break;
      }
    }
  }, [menu, story]);

  useEffect(() => {
    setEpisode(storyObject.childNodes[0].episode);
  }, [storyObject.childNodes]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (window.confirm("确认是否更新？")) {
      const data = {
        story: story,
        episode: episode,
        new_index: index,
        new_episode: newEpisode,
      };
      setIndex("");
      setNewEpisode("");
      const resRaw = await fetch("/menu/update-episode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!resRaw.ok) {
        resRaw.text().then((res) => {
          toast.warning("更新失败\n" + res);
        });
      } else {
        updateMenu((prev) => !prev);
        toast.info("章节更新成功");
      }
    }
  }

  return (
    <form id="update_episode_form" className="my-5" onSubmit={handleSubmit}>
      <h4 className="mb-3">更新主线章节/活动</h4>
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
        <label htmlFor="selectEpisode1">章节索引 - 名称</label>
      </div>
      <FloatingInputBox
        value={index}
        onChange={(evt) => setIndex(evt.target.value)}
        required={true}
        id="index"
        type="number"
        min={0}
        label="新章节索引"
      />
      <FloatingInputBox
        value={newEpisode}
        onChange={(evt) => setNewEpisode(evt.target.value)}
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
