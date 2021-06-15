import RecordComp from "../../shared/RecordComp";
import React, { useEffect, useRef, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

export default function RecordsByGroup({
  group,
  category,
  header,
  user,
  setUser,
  showOperation,
  operators,
  cardStyle,
  setRecord,
  setReportRecord,
  setRefresh,
}) {
  const [sortable, setSortable] = useState(false);
  const [list, setList] = useState([]);
  const sort = "/images/icon/sort.svg";

  const keyArray = useRef([]);

  const admin = user && (user.role === "admin" || user.role === "su");
  const showSortIcon =
    window.location.pathname.includes("operation") &&
    window.matchMedia("(min-width: 768px)").matches &&
    admin;

  useEffect(() => {
    if (group && group.length !== 0 && category) {
      group.sort((r1, r2) => {
        if (r1.index !== undefined && r2.index !== undefined) {
          if (
            r1.index[category] !== undefined &&
            r2.index[category] !== undefined
          ) {
            return r1.index[category] - r2.index[category];
          }
        }
        return 0;
      });
    }
  }, [category, group]);

  useEffect(() => {
    if (group && group.length !== 0) {
      setList(
        group.map((item, index) => {
          return {
            name: item,
            id: index,
          };
        })
      );
      keyArray.current = group.map(() => nanoid());
    }
  }, [group]);

  function handleSortByStar() {
    const newList = JSON.parse(JSON.stringify(list));
    newList.sort((a, b) => {
      const teamA = a.name.team;
      const teamB = b.name.team;
      let starA = 0,
        starB = 0;
      for (let opA of teamA) {
        for (let op of operators) {
          if (opA.slice(0, opA.length - 1) === op.name1 || opA === op.name1) {
            starA += op.star;
            break;
          }
        }
      }
      for (let opB of teamB) {
        for (let op of operators) {
          if (opB.slice(0, opB.length - 1) === op.name1 || opB === op.name1) {
            starB += op.star;
            break;
          }
        }
      }
      return starA - starB;
    });
    setList(newList);
  }

  async function handleSubmitSort() {
    if (!list) return toast.warning("找不到纪录！");
    setSortable(false);
    toast.info("排序中，请稍等");
    const newList = list.map((item, index) => {
      if (item.name.index) {
        item.name.index[category] = index;
      } else {
        item.name.index = {};
        item.name.index[category] = index;
      }
      return item.name;
    });
    const resRaw = await fetch("/record/sort-record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ records: newList }),
    });
    if (!resRaw.ok) {
      resRaw.text().then((res) => {
        toast.warning("排序失败\n" + res);
      });
    } else {
      toast.info("排序结果已保存");
      setRefresh((prev) => !prev);
    }
  }

  if (!group || group.length === 0) return null;

  return (
    <div className={sortable ? " border border-5 border-danger" : ""}>
      <div className={"position-relative p-1"}>
        {header ? (
          <div>
            <div className="text-end mb-1 text-secondary">{header}</div>
            <hr className="mt-0 mb-3" />
          </div>
        ) : null}
        {sortable ? (
          <ReactSortable
            className="row"
            list={list}
            setList={setList}
            filter=".not-draggable"
          >
            {list.map((item, index) => (
              <RecordComp
                key={keyArray.current[index]}
                record={item.name}
                user={user}
                setUser={setUser}
                showOperation={showOperation}
                operators={operators}
                cardStyle={cardStyle ? cardStyle : ""}
                sortable={sortable}
                setRecord={setRecord}
              />
            ))}
          </ReactSortable>
        ) : (
          <div className="row">
            {list.map((item, index) => (
              <RecordComp
                key={keyArray.current[index]}
                record={item.name}
                user={user}
                setUser={setUser}
                showOperation={showOperation}
                operators={operators}
                cardStyle={cardStyle ? cardStyle : ""}
                sortable={false}
                setRecord={setRecord}
                setReportRecord={setReportRecord}
                setRefresh={setRefresh}
              />
            ))}
          </div>
        )}
        {showSortIcon ? (
          <button
            className="btn btn-opacity-black p-0 position-absolute top-50 end-0 fs-5 svg-btn"
            style={{
              transform: "translateX(150%)",
              backgroundImage: `url(${sort})`,
            }}
            onClick={() => setSortable((prev) => !prev)}
            title="开启排序"
          />
        ) : null}
      </div>
      {sortable ? (
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-3" onClick={handleSortByStar}>
            星级排序
          </button>
          <button className="btn btn-secondary" onClick={handleSubmitSort}>
            保存修改
          </button>
        </div>
      ) : null}
    </div>
  );
}
