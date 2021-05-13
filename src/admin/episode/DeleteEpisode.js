import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function DeleteEpisode({ menu, updateMenu }) {
  const [story, setStory] = useState(menu.childNodes[0].story);
  const [storyObject, setStoryObject] = useState(menu.childNodes[0]);
  const [episode, setEpisode] = useState(
    menu.childNodes[0].childNodes[0].episode
  );

  useEffect(() => {
    for (let object of menu.childNodes) {
      if (object.story === story) {
        setStoryObject(object);
        break;
      }
    }
  }, [menu, story]);

  useEffect(() => {
    setEpisode(storyObject.childNodes[0]);
  }, [storyObject.childNodes]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (window.confirm("确认删除？")) {
      if (window.confirm("请再次确认是否删除")) {
        const data = {
          story: story,
          episode: episode,
        };
        const resRaw = await fetch("/menu/remove-episode", {
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
          toast.info("章节删除成功");
        }
      }
    }
  }

  return (
    <form id="remove_episode_form" className="my-5" onSubmit={handleSubmit}>
      <h4 className="mb-3">删除主线章节/活动</h4>
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
      <button type="submit" className="btn btn-danger">
        删除
      </button>
    </form>
  );
}
