import React, { useEffect, useRef, useState } from "react";
import FloatingInputBox from "../../shared/FloatingInputBox";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

export default function SetNewsSrc() {
  const [num, setNum] = useState(1);
  const [value, setValue] = useState([]);
  const keyArray = useRef([]);

  useEffect(() => {
    fetch("/api/news").then((resRaw) => {
      if (resRaw.ok) {
        resRaw.json().then((res) => {
          if (res.length !== 0) {
            setNum(res.length);
          }
          setValue(res);
        });
      }
    });
  }, []);

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (!evt.target.checkValidity()) {
      return evt.target.classList.add("was-validated");
    }
    toast.info("更新中，请稍后...");
    const resRaw = await fetch("/api/set-news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: value }),
    });
    if (!resRaw.ok) {
      resRaw.text().then((res) => {
        toast.warning("更新失败\n" + res);
      });
    } else {
      toast.info("战报更新成功");
    }
  }

  return (
    <form className="mb-3" onSubmit={handleSubmit}>
      <h4 className="mb-3">设置战报</h4>
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
                label="战报图片URL地址"
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
      <div className="d-flex justify-content-end">
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
          <i className="fas fa-plus" />
        </button>
        <button className="btn btn-primary">提交</button>
      </div>
    </form>
  );
}
