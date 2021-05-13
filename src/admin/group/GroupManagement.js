import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ReactSortable } from "react-sortablejs";
import { nanoid } from "nanoid";
import QueryRecords from "../../shared/QueryRecords";
import FloatingInputBox from "../../shared/FloatingInputBox";

export default function GroupManagement({ user }) {
  const [reload, setReload] = useState(true);
  const [groupArray, setGroupArray] = useState();
  const [list, setList] = useState();
  const [query, setQuery] = useState();
  const [group, setGroup] = useState();

  useEffect(() => {
    fetch("/menu/group-array").then((resRaw) => {
      if (!resRaw.ok) {
        resRaw.text().then((res) => {
          toast.warning(res);
        });
      } else {
        resRaw.json().then((res) => {
          setGroupArray(res);
        });
      }
    });
  }, [reload]);

  useEffect(() => {
    if (groupArray !== undefined) {
      setList(
        groupArray.map((group) => {
          return {
            id: nanoid(),
            name: group,
          };
        })
      );
    }
  }, [groupArray]);

  async function handleSubmit() {
    const array = list.map((item) => {
      return item.name === "默认项，请勿移动" ? "" : item.name;
    });
    const resRaw = await fetch("/menu/set-group-array", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupArray: array,
      }),
    });
    if (!resRaw.ok) {
      const res = await resRaw.text();
      toast.warning(res);
    } else {
      toast.info("修改成功！");
    }
  }

  async function handleUpdateGroup(evt) {
    evt.preventDefault();
    const resRaw = await fetch("/menu/update-group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        group: query.group,
        new_group: group,
      }),
    });
    if (!resRaw.ok) {
      const res = await resRaw.text();
      toast.warning(res);
    } else {
      toast.info("更新成功！");
      setReload((prev) => !prev);
    }
  }

  async function handleDelete(evt) {
    evt.preventDefault();
    const resRaw = await fetch("/menu/delete-group", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    });
    if (!resRaw.ok) {
      const res = await resRaw.text();
      toast.warning(res);
    } else {
      toast.info("删除成功！");
      setReload((prev) => !prev);
      setQuery(undefined);
    }
  }

  if (list === undefined) return null;
  return (
    <div>
      <h3 className="mb-4">拖动下列组名进行排序</h3>
      <div className="mb-3">
        <ReactSortable list={list} setList={setList} filter={".not-draggable"}>
          {list.map((item) => (
            <div
              className={
                "d-flex list-group-item" +
                (item.name === "默认项，请勿移动" ? " not-draggable" : "")
              }
              key={item.id}
              role="button"
            >
              <div className="me-auto align-self-center">
                {item.name === "" ? "默认项，请勿移动" : item.name}
              </div>
              <button
                className="btn btn-outline-primary mx-2 flex-shrink-1"
                onClick={() => {
                  setQuery({ group: item.name });
                  setGroup(item.name);
                }}
                style={{ whiteSpace: "nowrap" }}
              >
                关联记录
              </button>
              <button
                className="btn btn-outline-primary mx-2 flex-shrink-1"
                onClick={() => {
                  navigator.clipboard.writeText(item.name).then(() => {});
                }}
                style={{ whiteSpace: "nowrap" }}
              >
                复制内容
              </button>
            </div>
          ))}
        </ReactSortable>
      </div>
      <button className="btn btn-primary mb-5" onClick={handleSubmit}>
        提交更改
      </button>
      {!query ? null : (
        <div>
          <QueryRecords user={user} query={query} />
          <form onSubmit={handleUpdateGroup}>
            <FloatingInputBox
              value={group}
              onChange={(evt) => setGroup(evt.target.value)}
              id="update-group"
              label="更新组名"
              required={true}
            />
            <button className="btn btn-primary me-2">更新组名</button>
            <button className="btn btn-danger" onClick={handleDelete}>
              删除分组
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
