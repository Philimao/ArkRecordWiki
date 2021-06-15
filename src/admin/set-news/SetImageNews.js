import React, { useEffect, useRef, useState } from "react";
import FloatingInputBox from "../../shared/FloatingInputBox";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import Modal from "../../shared/Modal";

export default function SetImageNews({ news, setNews, setRefresh }) {
  const [header, setHeader] = useState("");
  const [num, setNum] = useState(1);
  const [value, setValue] = useState([]);
  const keyArray = useRef([]);

  useEffect(() => {
    if (news && Array.isArray(news.value)) {
      setHeader(news.header);
      if (news.value.length !== 0) {
        setNum(news.value.length);
        setValue(news.value);
      }
    }
  }, [news]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      return evt.target.classList.add("was-validated");
    }
    toast.info("更新中，请稍后...");
    let resRaw;
    if (news) {
      resRaw = await fetch("/admin/update-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          news_id: news._id,
          header: header,
          value: value,
        }),
      });
    } else {
      resRaw = await fetch("/admin/set-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ header: header, value: value }),
      });
    }
    if (!resRaw.ok) {
      resRaw.text().then((res) => {
        toast.warning("更新失败\n" + res);
      });
    } else {
      setRefresh((prev) => !prev);
      toast.info("公告更新成功");
    }
  }

  function Content() {
    return (
      <form onSubmit={handleSubmit} noValidate>
        <FloatingInputBox
          id="image_news_header"
          value={header}
          onChange={(evt) => setHeader(evt.target.value)}
          label="公告标题（请参考过往公告格式）"
          required={value[0] !== undefined}
          disabled={value[0] === undefined}
        />
        {Array.from(new Array(num)).map((item, index) => {
          if (!keyArray.current[index]) keyArray.current[index] = nanoid();
          return (
            <div className="d-flex" key={keyArray.current[index]}>
              <div className="flex-grow-1">
                <FloatingInputBox
                  value={value[index] ? value[index] : ""}
                  onChange={(evt) => {
                    setValue((prev) => {
                      const newArray = Array.from(prev);
                      newArray[index] = evt.target.value;
                      return newArray;
                    });
                  }}
                  id={"set_news_src" + keyArray.current[index]}
                  label="图片URL地址"
                  feedback="请填写正确的图片地址"
                  type="url"
                  required={value[index] !== undefined}
                  disabled={value[index] === undefined}
                />
              </div>
              <div className="mb-3 ms-3 d-flex">
                <button
                  className="btn btn-danger align-self-center"
                  onClick={(evt) => {
                    evt.preventDefault();
                    setValue((prev) => {
                      const newArray = Array.from(prev);
                      newArray.splice(index, 1);
                      return newArray;
                    });
                    if (num > 1) {
                      setNum(num - 1);
                    }
                  }}
                >
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>
          );
        })}
        <div className="d-flex">
          <button
            className="btn btn-primary me-2"
            onClick={(evt) => {
              evt.preventDefault();
              if (value[num - 1] !== undefined) {
                setNum(num + 1);
              }
              setValue((prev) => {
                const newArray = Array.from(prev);
                newArray.push("");
                return newArray;
              });
            }}
          >
            添加图片
          </button>
          <button className="d-none" id="image_news_submit_button" />
        </div>
      </form>
    );
  }

  return (
    <Modal
      id="set_image_news"
      header="设置图片公告"
      Content={Content}
      handleSubmit={() => {
        document.querySelector("#image_news_submit_button").click();
      }}
      handleClose={() => {
        setNews(undefined);
        setHeader("");
        setValue([]);
      }}
    />
  );
}
