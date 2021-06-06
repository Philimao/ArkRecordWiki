import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { ReactSortable } from "react-sortablejs";
import QueryRecords from "../../shared/QueryRecords";
import FloatingInputBox from "../../shared/FloatingInputBox";

export default function CategoryManagement({ user }) {
  const [reload, setReload] = useState(true);
  const [categoryArray, setArray] = useState();
  const [list, setList] = useState();
  const [query, setQuery] = useState();
  const [category, setCategory] = useState();
  const [newCategory, setNewCategory] = useState("常规队");

  useEffect(() => {
    fetch("/api/categories").then((resRaw) => {
      if (!resRaw.ok) {
        resRaw.text().then((res) => {
          toast.warning(res);
        });
      } else {
        resRaw.json().then((res) => {
          setArray(res);
        });
      }
    });
  }, [reload]);

  useEffect(() => {
    if (categoryArray !== undefined) {
      setList(
        categoryArray.map((item) => ({
          id: nanoid(),
          name: item,
        }))
      );
    }
  }, [categoryArray]);

  async function handleSubmit() {
    const array = list.map((item) => {
      return item.name === "常规队，请勿移动" ? "常规队" : item.name;
    });
    const resRaw = await fetch("/api/sort-categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categories: array,
      }),
    });
    if (!resRaw.ok) {
      const res = await resRaw.text();
      toast.warning(res);
    } else {
      toast.info("修改成功！");
    }
  }

  async function handleCreate(evt) {
    evt.preventDefault();
    const resRaw = await fetch("/api/create-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: newCategory,
      }),
    });
    if (!resRaw.ok) {
      const res = await resRaw.text();
      toast.warning(res);
    } else {
      toast.info("创建成功！");
      setReload((prev) => !prev);
    }
  }

  async function handleUpdate(evt) {
    evt.preventDefault();
    const resRaw = await fetch("/api/update-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: query.category,
        new_category: category,
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
    const resRaw = await fetch("/api/delete-category", {
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
      <h3 className="mb-4">拖动下列流派名称进行排序</h3>
      <div className="mb-3">
        <ReactSortable list={list} setList={setList} filter={".not-draggable"}>
          {list.map((item) => (
            <div
              className={
                "d-flex list-group-item" +
                (item.name === "常规队，请勿移动" ? " not-draggable" : "")
              }
              key={item.id}
              role="button"
            >
              <div className="me-auto align-self-center">
                {item.name === "常规队" ? "常规队，请勿移动" : item.name}
              </div>
              <button
                className="btn btn-outline-primary mx-2 flex-shrink-1"
                onClick={() => {
                  setQuery({ category: item.name });
                  setCategory(item.name);
                }}
                style={{ whiteSpace: "nowrap" }}
              >
                关联记录
              </button>
            </div>
          ))}
        </ReactSortable>
      </div>
      <button className="btn btn-primary mb-5" onClick={handleSubmit}>
        提交更改
      </button>
      <form onSubmit={handleCreate} className="mb-5">
        <FloatingInputBox
          value={newCategory}
          onChange={(evt) => setNewCategory(evt.target.value)}
          id="new-category"
          label="新流派名称"
          required={true}
        />
        <button className="btn btn-primary">新建流派</button>
      </form>
      {!query ? null : (
        <div>
          <QueryRecords user={user} query={query} />
          <form onSubmit={handleUpdate}>
            <FloatingInputBox
              value={category}
              onChange={(evt) => setCategory(evt.target.value)}
              id="update-category"
              label="更新流派"
              required={true}
            />
            <button className="btn btn-primary me-2">更新流派</button>
            <button className="btn btn-danger" onClick={handleDelete}>
              删除流派
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
