import React, { useEffect, useRef, useState } from "react";
import SetImageNews from "./SetImageNews";
import SetTextNews from "./SetTextNews";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

export default function SetNewsPage() {
  const [refresh, setRefresh] = useState(false);
  const [news, setNews] = useState();
  const [newsArray, setNewsArray] = useState([]);
  const [updateNews, setUpdateNews] = useState();

  function fetchNews(skip) {
    fetch("/api/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skip: skip,
      }),
    }).then((resRaw) => {
      if (resRaw.ok) {
        resRaw.json().then((res) => {
          if (res.length === 0) {
            toast.info("暂无更多公告");
          } else {
            setNewsArray((prev) => prev.concat(res));
          }
        });
      }
    });
  }

  useEffect(() => {
    setNewsArray([]);
  }, [refresh]);

  useEffect(() => {
    fetchNews(0);
  }, [refresh]);

  function NewsPreview() {
    const keyArray = useRef([]);

    if (!news) return null;
    return (
      <div>
        <h3 className="mb-4">公告预览</h3>
        <div className="shadow p-3">
          <div className="fw-bold fs-4 mb-3">{news.header}</div>
          {Array.isArray(news.value) ? (
            <div className="mb-4">
              {news.value.map((url, index) => {
                if (!keyArray.current[index])
                  keyArray.current[index] = nanoid();
                return (
                  <div
                    className="d-flex justify-content-center"
                    key={keyArray.current[index]}
                  >
                    <img src={url} alt="news" className="img-fluid mb-3" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mb-4" style={{ whiteSpace: "pre-wrap" }}>
              {news.value}
            </div>
          )}
          <div className="d-flex">
            <button
              className="btn btn-outline-danger me-2"
              onClick={() => setNews(undefined)}
            >
              清空预览
            </button>
            <button
              className="btn btn-outline-primary me-auto"
              data-bs-toggle="modal"
              data-bs-target={
                Array.isArray(news.value) ? "#set_image_news" : "#set_text_news"
              }
              onClick={() => setUpdateNews(news)}
            >
              更新公告
            </button>
            <button className="btn btn-outline-danger" onClick={handleDelete}>
              删除公告
            </button>
          </div>
        </div>
      </div>
    );
  }

  async function handleDelete() {
    if (window.confirm("是否删除该公告？")) {
      if (window.confirm("是否确认删除该公告？")) {
        setNews(undefined);
        const resRaw = await fetch("/admin/delete-news", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            news_id: news._id,
          }),
        });
        if (!resRaw.ok) {
          toast.warning("删除失败！");
        } else {
          setRefresh((prev) => !prev);
          toast.info("删除成功！");
        }
      }
    }
  }

  return (
    <div>
      <h3 className="mb-4">新建公告</h3>
      <div className="d-flex mb-5">
        <button
          className="btn btn-primary me-2"
          data-bs-toggle="modal"
          data-bs-target="#set_text_news"
        >
          设置文字公告
        </button>
        <button
          className="btn btn-primary me-2"
          data-bs-toggle="modal"
          data-bs-target="#set_image_news"
        >
          设置图片公告
        </button>
      </div>
      <h3 className="mb-4">历史公告</h3>
      <div className="mb-4 list-group">
        {newsArray.map((item, index) => (
          <button
            className="list-group-item list-group-item-action"
            onClick={() => setNews(newsArray[index])}
            key={item.header}
          >
            <div className="mb-1"> {item.header}</div>
            <div className="d-flex justify-content-end">
              <small className="fw-light">
                {Math.floor(
                  (new Date() - new Date(item.date_created)) / 86400000
                ) + "天前"}
              </small>
            </div>
          </button>
        ))}
      </div>
      <div className="mb-5">
        <button
          className="btn btn-outline-danger me-2"
          onClick={() => setNews(undefined)}
        >
          清空预览
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => fetchNews(newsArray.length)}
        >
          继续加载
        </button>
      </div>
      <NewsPreview />
      <SetImageNews
        news={updateNews}
        setNews={setUpdateNews}
        setRefresh={setRefresh}
      />
      <SetTextNews
        news={updateNews}
        setNews={setUpdateNews}
        setRefresh={setRefresh}
      />
    </div>
  );
}
