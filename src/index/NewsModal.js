import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Modal from "../shared/Modal";
import { getCookie } from "../utils";

export default function NewsModal({ latestNews, fetchNews, setUnread }) {
  const [newsArray, setNewsArray] = useState([]);
  const [header, setHeader] = useState("网站公告");
  const [imgSrc, setImgSrc] = useState();
  const [text, setText] = useState("");

  useEffect(() => {
    setNewsArray(latestNews);
  }, [latestNews]);

  function handleClick(index) {
    if (index === 0 && getCookie("news") !== newsArray[0].header) {
      setUnread(false);
      document.cookie =
        "news=" +
        newsArray[0].header +
        "; path=/; expires=" +
        new Date(Date.now() + 365 * 86400000).toUTCString();
    }
    setHeader(newsArray[index].header);
    if (Array.isArray(newsArray[index].value)) {
      setImgSrc(newsArray[index].value);
    } else {
      setText(newsArray[index].value);
    }
  }

  function NewsContent() {
    const keyArray = useRef([]);

    if (imgSrc && imgSrc.length !== 0) {
      return (
        <div className="my-3">
          {imgSrc.map((url, index) => {
            if (!keyArray.current[index]) keyArray.current[index] = nanoid();
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
      );
    } else if (text) {
      return (
        <div className="px-2 py-3" style={{ whiteSpace: "pre-wrap" }}>
          {text}
        </div>
      );
    } else {
      return (
        <div>
          <div className="mb-3 list-group">
            {newsArray.map((item, index) => (
              <button
                className="list-group-item list-group-item-action"
                onClick={() => handleClick(index)}
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
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                fetchNews(newsArray.length);
              }}
            >
              加载更多
            </button>
          </div>
        </div>
      );
    }
  }

  function handleClose() {
    setHeader("网站公告");
    setImgSrc(undefined);
    setText(undefined);
  }

  function backButton() {
    return (
      <button
        className={
          "btn btn-secondary me-auto" + (imgSrc || text ? "" : " d-none")
        }
        onClick={handleClose}
      >
        返回
      </button>
    );
  }

  return (
    <Modal
      id="news_modal"
      header={header}
      Content={NewsContent}
      backButton={backButton}
      handleClose={handleClose}
    />
  );
}
