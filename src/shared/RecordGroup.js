import RecordComp from "./RecordComp";
import React, { useEffect, useRef, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { nanoid } from "nanoid";

export default function RecordGroup({
  group,
  header,
  user,
  setUser,
  showOperation,
  operators,
  cardStyle,
}) {
  const [sortable, setSortable] = useState(false);
  const [list, setList] = useState([]);
  const sort = "images/icon/sort.svg";

  const [reportRecord, setReportRecord] = useState();
  const [reportValue, setReportValue] = useState("");
  const keyArray = useRef([]);

  const admin = user && (user.role === "admin" || user.role === "su");
  const showSortIcon =
    window.location.pathname === "/" &&
    window.matchMedia("(min-width: 768px)").matches &&
    admin;

  useEffect(() => {
    if (group && group.length !== 0) {
      group.sort((r1, r2) => {
        if (
          r1.index === undefined ||
          r2.index === undefined ||
          r1.index === r2.index
        ) {
          return 0;
        } else if (r1.index > r2.index) {
          return 1;
        } else {
          return -1;
        }
      });
    }
  }, [group]);

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

  async function handleSubmitSort() {
    if (!list) return toast.warning("找不到纪录！");
    setSortable(false);
    toast.info("排序中，请稍等");
    const newList = list.map((item, index) => {
      item.name.index = index;
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
    }
  }

  async function handleReportSubmit() {
    if (reportValue.length === 0) return toast.warning("请填写具体问题！");
    setReportValue("");
    const resRaw = await fetch("/record/report-record", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "report-record",
        username: user.username,
        record: reportRecord,
        msg: reportValue,
        date_created: Date.now(),
      }),
    });
    if (!resRaw.ok) {
      resRaw.text().then((res) => {
        toast.warning("提交失败\n" + res);
      });
    } else {
      toast.info("我们已收到您的反馈，将会尽快处理！请关闭页面");
    }
  }

  function reportContent() {
    if (!reportRecord) return null;
    return (
      <form className="px-2">
        <div className="mb-3">
          <div className="mb-1">{"攻略者： " + reportRecord.raider}</div>
          <div>{"队伍组成： " + reportRecord.team}</div>
        </div>
        <label className="form-label" htmlFor="report_content">
          请填写具体问题
        </label>
        <textarea
          value={reportValue}
          onChange={(evt) => setReportValue(evt.target.value)}
          className="form-control"
          name="report_content"
          id="report_content"
          rows="10"
        />
      </form>
    );
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
                updateList={() => {
                  setList(list.filter((item) => item.id !== index));
                }}
                modalId={(header ? header : "") + "report_record"}
                setReportRecord={setReportRecord}
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
          <button className="btn btn-secondary" onClick={handleSubmitSort}>
            保存修改
          </button>
        </div>
      ) : null}
      {user ? (
        <Modal
          id={(header ? header : "") + "report_record"}
          header="这个纪录有问题"
          Content={reportContent}
          handleSubmit={handleReportSubmit}
        />
      ) : null}
    </div>
  );
}
