import React, { useEffect, useRef, useState } from "react";
import propTypes from "prop-types";
import { toast } from "react-toastify";
import "../stylesheets/RecordComp.css";
import cc_color_theme from "../theme/cc_color_theme";

export default function RecordComp(props) {
  const admin =
    props.user && (props.user.role === "su" || props.user.role === "admin");
  const container = useRef();
  const delButton = useRef();
  const [isVideoVisible, setVideoVisibility] = useState(false);
  const isFullScreen =
    !props.showOperation && props.record.story === "危机合约";
  const [isFavorite, setIsFavorite] = useState(false);

  let cardStyle;
  if (props.cardStyle) {
    cardStyle = props.cardStyle;
  } else if (props.record.story === "危机合约") {
    cardStyle = "cc";
  } else {
    cardStyle = "";
  }

  const hideCategory =
    !(
      props.record &&
      props.record.category &&
      props.record.category.length !== 1
    ) && !cardStyle.includes("showCategory");

  const hideTeam =
    !cardStyle.includes("detailed") && !cardStyle.includes("showTeam");

  const report = window.location.origin + "/images/icon/report.svg";
  const edit = window.location.origin + "/images/icon/edit.svg";
  const del = window.location.origin + "/images/icon/delete.svg";

  useEffect(() => {
    if (props.user && props.user.favorite) {
      for (let _id of props.user.favorite) {
        if (props.record._id === _id) {
          setIsFavorite(true);
        }
      }
    }
  }, [props.record, props.user]);

  async function deleteRecord() {
    if (!props.setRefresh) return;
    if (window.confirm("确认删除？")) {
      if (window.confirm("请再次确认是否删除")) {
        const resRaw = await fetch("/record/delete-record", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: props.record._id }),
        });
        if (!resRaw.ok) {
          resRaw.text().then((res) => {
            toast.warning("删除失败\n" + res);
          });
        } else {
          toast.info("纪录已删除");
          props.setRefresh((prev) => !prev);
        }
      }
    }
  }

  function restoreRecord(record) {
    if (window.confirm("是否恢复该归档纪录")) {
      fetch("/record/restore-record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: record._id }),
      }).then((resRaw) => {
        if (!resRaw.ok) {
          resRaw.text().then((res) => {
            toast.warning("恢复失败\n" + res);
          });
        } else {
          toast.info("纪录已发回审核页");
          props.setRefresh((prev) => !prev);
        }
      });
    }
  }

  function toggleVideoVisibility() {
    setVideoVisibility(!isVideoVisible);
  }

  function renderVideo() {
    if (props.record.url.indexOf("youtube") > 0) {
      let spec = props.record.url.split("?")[1];
      const query = {};
      if (spec) {
        spec = spec.split("&");
        spec.forEach((item) => {
          const key = item.split("=")[0];
          query[key] = item.split("=")[1];
        });
      }
      return (
        <div className="ratio ratio-16x9 my-3">
          <iframe
            src={"https://www.youtube.com/embed/" + query["v"]}
            title="ytb player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    } else {
      let url = props.record.url.split("/");
      let spec = url[url.length - 1];
      const bv = spec.split("?")[0];
      spec = spec.split("?")[1];
      const query = {};
      if (spec) {
        spec = spec.split("&");
        spec.forEach((item) => {
          const key = item.split("=")[0];
          query[key] = item.split("=")[1];
        });
      }
      return (
        <div className="ratio ratio-16x9 my-2">
          <iframe
            src={
              "https://player.bilibili.com/player.html?bvid=" +
              bv +
              "&as_wide=1&high_quality=1&danmaku=0&page=" +
              (query["p"] ? query["p"] : "1")
            }
            frameBorder="0"
            title={props.record.url}
            allow="fullscreen"
          />
        </div>
      );
    }
  }

  const cardHeader = () => {
    let header = "";
    if (cardStyle.includes("detailed") || cardStyle.includes("showOperation")) {
      header += props.record.operation + " " + props.record.cn_name;
    } else {
      if (Array.isArray(props.record.team)) {
        header += props.record.team.join("+");
      } else {
        header += props.record.team;
      }
    }
    return header;
  };

  async function handleFavorite() {
    const endpoint = isFavorite
      ? "/user/delete-favorite"
      : "/user/add-favorite";
    const resRaw = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: props.user.username,
        record_id: props.record._id,
      }),
    });
    if (!resRaw.ok) {
      resRaw.text().then((res) => {
        toast.warning("操作失败\n" + res);
      });
    } else {
      setIsFavorite((prev) => !prev);
      props.setUser((prev) => {
        const user = JSON.parse(JSON.stringify(prev));
        if (isFavorite) {
          const index = user.favorite.indexOf(props.record._id);
          if (index > -1) user.favorite.splice(index, 1);
        } else {
          user.favorite.push(props.record._id);
        }
        return user;
      });
    }
  }

  async function handleValidate() {
    const resRaw = await fetch("/record/validate-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        record_id: props.record._id,
      }),
    });
    if (!resRaw.ok) {
      resRaw.text().then((res) => {
        toast.warning("操作失败\n" + res);
      });
    } else {
      toast.info("纪录已验证通过");
      props.setRefresh((prev) => !prev);
    }
  }

  if (cardStyle.includes("cc")) {
    let index = 0;
    for (let i = 0; i < cc_color_theme.length; i++) {
      if (props.record.episode === cc_color_theme[i].name) {
        index = i;
        break;
      }
    }
    const color1 = cc_color_theme[index].color1;
    const color2 = cc_color_theme[index].color2;
    const color3 = cc_color_theme[index].color3;
    const color4 = cc_color_theme[index].color4;
    const logo = window.location.origin + cc_color_theme[index].logo;

    const btnStyle = {
      backgroundColor: color1,
      borderColor: color1,
      color: "white",
    };

    let background_url;
    if (props.operators && props.record.backOP && props.record.OPSkin) {
      for (let op of props.operators) {
        if (op.name1 === props.record.backOP) {
          background_url =
            "/images/char/" +
            op.name2 +
            "_" +
            props.record.OPSkin +
            "_bust.png";
          break;
        }
      }
    }

    return (
      <div
        ref={container}
        className={
          "record-comp col-12 mb-3 px-2" +
          (!props.sortable ? " not-draggable" : "")
        }
      >
        <div className="card overflow-hidden">
          <div
            className="card-header d-flex align-self-center"
            style={{
              width: "100%",
              background: `linear-gradient(to right, ${color1}, ${color2})`,
              color: "white",
              zIndex: "500",
            }}
          >
            <h5 className="me-auto align-self-center mb-0">{cardHeader()}</h5>
            {props.user ? (
              <button
                className="btn p-0 mx-1 fs-5 btn-opacity svg-btn"
                data-bs-toggle="modal"
                data-bs-target="#report_record"
                onClick={() => props.setReportRecord(props.record)}
                title="反馈问题"
                style={{
                  backgroundImage: `url(${report})`,
                }}
              />
            ) : null}
            {admin && props.setRefresh ? (
              <div>
                <button
                  className="btn p-0 mx-1 fs-5 btn-opacity svg-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#quick_edit"
                  onClick={() => props.setRecord(props.record)}
                  title="编辑纪录"
                  style={{
                    backgroundImage: `url(${edit})`,
                  }}
                />
                <button
                  className="btn p-0 mx-1 fs-5 btn-opacity svg-btn"
                  onClick={deleteRecord}
                  title="删除记录"
                  style={{
                    backgroundImage: `url(${del})`,
                  }}
                />
              </div>
            ) : null}
          </div>
          <div
            className="card-body d-flex flex-column position-relative"
            style={{ minHeight: "160px" }}
          >
            {background_url ? (
              <img
                className="position-absolute end-0 bottom-0"
                src={background_url}
                alt="background"
                style={{
                  transformOrigin: "bottom right",
                  transform: "scale(0.29)",
                }}
                draggable="false"
              />
            ) : null}
            <div
              className="position-absolute end-0 bottom-0 subscript"
              style={{
                width: "52px",
                height: "52px",
                background: `linear-gradient(135deg, transparent 50%, ${color3} 50%, ${color4})`,
              }}
            >
              {logo ? (
                <div
                  className="position-absolute end-0 bottom-0"
                  style={{
                    width: "45px",
                    height: "45px",
                    opacity: "0.3",
                    backgroundImage: `url(${logo})`,
                    filter: "invert(1) grayscale(100%) brightness(200%)",
                    backgroundSize: "contain",
                  }}
                />
              ) : null}
            </div>
            <div
              className="position-absolute end-0 bottom-0 text-white p-1 fs-5"
              style={{ fontFamily: "Novecento Wide Medium" }}
            >
              {props.record.level ? props.record.level : ""}
            </div>
            {background_url ? (
              <div
                className="position-absolute"
                style={{
                  width: "100%",
                  height: "100%",
                  left: "0",
                  top: "0",
                  backgroundImage:
                    "linear-gradient(to left, transparent, #FDFDFE, #FDFDFE)",
                }}
              />
            ) : null}
            <div
              className="mb-2 ms-2"
              style={{ fontSize: "1rem", zIndex: "500" }}
            >
              {props.record.raider}
            </div>
            <div
              className="mb-2 ms-2 text-secondary"
              style={{
                fontSize: "0.8rem",
                whiteSpace: "pre-wrap",
                zIndex: "500",
                maxWidth: "65%",
              }}
            >
              {props.record.remark1}
            </div>
            <div className="mt-auto record-buttons" style={{ zIndex: "500" }}>
              <button
                ref={delButton}
                className="btn m-2"
                style={btnStyle}
                onClick={toggleVideoVisibility}
              >
                {isVideoVisible ? "隐藏视频" : "显示视频"}
              </button>
              <a
                className="btn m-2"
                target="_blank"
                rel="noopener noreferrer"
                style={btnStyle}
                href={props.record.url}
              >
                跳转原址
              </a>
              {props.user ? (
                <button
                  className="btn m-2 btn-favorite"
                  style={btnStyle}
                  onClick={handleFavorite}
                >
                  {isFavorite ? "取消收藏" : "收藏纪录"}
                </button>
              ) : null}
            </div>
            {isVideoVisible ? renderVideo() : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={container}
      className={
        "record-comp col-12 mb-3 px-2" +
        (isFullScreen || isVideoVisible ? "" : " col-md-6") +
        (!props.sortable ? " not-draggable" : "")
      }
    >
      <div className="card">
        <div className="card-header d-flex align-content-center">
          <h5 className="me-auto align-self-center mb-0">{cardHeader()}</h5>
          {props.user ? (
            <button
              className="btn p-0 mx-1 fs-5 btn-opacity svg-btn svg-btn-invert"
              data-bs-toggle="modal"
              data-bs-target="#report_record"
              onClick={() => props.setReportRecord(props.record)}
              title="反馈问题"
              style={{
                backgroundImage: `url(${report})`,
              }}
            />
          ) : null}
          {admin && props.setRefresh ? (
            <div>
              {cardStyle.includes("archive") ? (
                <button
                  className="btn p-0 mx-1 fs-5 btn-opacity svg-btn svg-btn-invert"
                  onClick={() => restoreRecord(props.record)}
                  title="恢复归档纪录"
                  style={{ backgroundImage: `url(${edit})` }}
                />
              ) : (
                <button
                  className="btn p-0 mx-1 fs-5 btn-opacity svg-btn svg-btn-invert"
                  data-bs-toggle="modal"
                  data-bs-target="#quick_edit"
                  onClick={() => props.setRecord(props.record)}
                  title="编辑纪录"
                  style={{ backgroundImage: `url(${edit})` }}
                />
              )}
              <button
                className="btn p-0 mx-1 fs-5 btn-opacity svg-btn svg-btn-invert"
                onClick={deleteRecord}
                title="删除记录"
                style={{ backgroundImage: `url(${del})` }}
              />
            </div>
          ) : null}
        </div>
        <div
          className="card-body d-flex flex-column"
          style={{ minHeight: "140px" }}
        >
          <div className="mb-2 ms-2 fs-6">{props.record.raider}</div>
          {hideTeam ? null : (
            <div className="mb-2 ms-2 fs-6 fw-light">
              {Array.isArray(props.record.team)
                ? props.record.team.join("+")
                : props.record.team}
            </div>
          )}
          {hideCategory ? null : (
            <div className="ms-2 text-secondary" style={{ fontSize: "0.8rem" }}>
              {props.record.category.join("，")}
            </div>
          )}
          <div className="ms-2 text-secondary" style={{ fontSize: "0.8rem" }}>
            {props.record.remark1}
          </div>
          {admin && cardStyle.includes("detailed") ? (
            <div className="mb-2 ms-2 text-secondary">
              <hr />
              <div className="mb-1">{"提交者：" + props.record.submitter}</div>
              <div className="mb-1">
                {"提交者备注：" + props.record.remark0}
              </div>
              <div className="mb-1">{"分组名称：" + props.record.group}</div>
              <div className="mb-1">{"视频地址：" + props.record.url}</div>
              {props.record.date_created ? (
                <div className="mb-1">
                  {"提交日期：" +
                    new Date(props.record.date_created).toString()}
                </div>
              ) : null}
              {props.record.last_modified ? (
                <div className="mb-1">
                  {"最后修改：" +
                    new Date(props.record.last_modified).toString()}
                </div>
              ) : null}
              {props.record.reviewer ? (
                <div className="mb-1">{"负责人：" + props.record.reviewer}</div>
              ) : null}
            </div>
          ) : null}
          <div className="mt-auto record-buttons">
            <button
              ref={delButton}
              className="btn btn-primary m-2"
              onClick={toggleVideoVisibility}
            >
              {isVideoVisible ? "隐藏视频" : "显示视频"}
            </button>
            <a
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#dc7598", color: "white" }}
              href={props.record.url}
            >
              跳转原址
            </a>
            {props.user && !cardStyle.includes("validate") ? (
              <button
                className={
                  "btn-favorite btn m-2" +
                  (isFavorite ? " btn-outline-danger" : " btn-danger")
                }
                onClick={handleFavorite}
              >
                {isFavorite ? "取消收藏" : "收藏纪录"}
              </button>
            ) : null}
            {props.user && admin && cardStyle.includes("validate") ? (
              <button className="btn btn-danger m-2" onClick={handleValidate}>
                验证通过
              </button>
            ) : null}
          </div>
          {isVideoVisible ? renderVideo() : null}
        </div>
      </div>
    </div>
  );
}

RecordComp.propTypes = {
  user: propTypes.object,
  setUser: propTypes.func,
  record: propTypes.object.isRequired,
  setRefresh: propTypes.func,
  operators: propTypes.array,
  showOperation: propTypes.bool,
  cardStyle: propTypes.string,
  sortable: propTypes.bool,
  setRecord: propTypes.func,
};
