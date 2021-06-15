import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AccordionItem from "./AccordionItem";
import propTypes from "prop-types";
import { nanoid } from "nanoid";
import { useHistory, Switch, Route } from "react-router-dom";
import NewsModal from "./NewsModal";
import { toast } from "react-toastify";
import { getCookie } from "../utils";

export default function Menu(props) {
  // sprite related
  const sprite_array = [
    "/images/gif/surtr_s3.gif",
    "/images/gif/blaze_s3.gif",
    "/images/gif/mudrock_s3.gif",
  ];
  const sprite_url = useRef(
    window.location.origin + sprite_array[~~(Math.random() * 3)]
  );

  // menu key array
  const keyArray = useRef(props.menu.childNodes.map(() => nanoid()));

  // current episode related
  const currentEpisodeObject =
    props.menu.childNodes[0].childNodes[18].childNodes;
  const history = useHistory();

  // CC only decoration
  const cc = false;
  function CCDecoration() {
    const currentSVG = "../images/cc/spectrum/logo.svg";
    const currentTitle = "../images/cc/spectrum/title.png";
    return (
      <div>
        {/* header */}
        <div
          className="position-absolute"
          style={{
            width: "10rem",
            height: "1.8rem",
            backgroundImage: `url(${currentTitle})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            top: "1rem",
            opacity: "0.9",
          }}
        />
        {/* logo */}
        <div
          className="position-absolute"
          style={{
            width: "5rem",
            height: "5rem",
            backgroundImage: `url(${currentSVG})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            filter: "invert(1)",
            opacity: "0.2",
            right: "3.5rem",
            top: "-1.5rem",
          }}
        />
      </div>
    );
  }

  // news related
  const [newsArray, setNewsArray] = useState([]);
  const [unread, setUnread] = useState(false);

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
    fetchNews(0);
  }, []);

  useEffect(() => {
    if (newsArray[0]) {
      if (getCookie("news") !== newsArray[0].header) {
        setUnread(true);
      }
    }
  }, [newsArray]);

  return (
    <div className="position-relative" id="menu">
      <Switch>
        <Route exact path="/">
          <div className="latest-news d-flex justify-content-center">
            <button
              className="btn btn-news position-relative"
              data-bs-toggle="modal"
              data-bs-target="#news_modal"
            >
              网站公告
              {unread ? (
                <span className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">
                  <span className="visually-hidden">unread messages</span>
                </span>
              ) : null}
            </button>
          </div>
        </Route>
      </Switch>
      <div className="accordion accordion-flush" id="Stories">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed position-relative overflow-hidden"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#currentEpisodeContent"
              id="btnCurrentEpisode"
              onClick={(evt) => {
                if (props.activeButton.current[0]) {
                  if (
                    props.activeButton.current[0].innerText ===
                    evt.target.innerText
                  ) {
                    props.activeButton.current[0] = undefined;
                  }
                } else {
                  props.activeButton.current[0] = evt.target;
                }
              }}
            >
              当前活动
              {cc ? <CCDecoration /> : null}
            </button>
          </h2>
          <div
            id="currentEpisodeContent"
            className="accordion-collapse collapse"
            data-bs-parent="#Stories"
          >
            <div className="accordion accordion-flush">
              {currentEpisodeObject.map((operation) => (
                <div
                  className="accordion-item"
                  key={operation.operation + operation.cn_name}
                >
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed operation"
                      onClick={() => {
                        history.push(
                          "/operation/" +
                            operation.operation
                              .replace("/", "_")
                              .replace("/", "_") +
                            "+" +
                            operation.cn_name
                        );
                      }}
                    >
                      {operation.operation + " " + operation.cn_name}
                    </button>
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
        {props.menu.childNodes.map((item, index) => (
          <AccordionItem
            key={keyArray.current[index]}
            index={index}
            parent="Stories"
            parentIndex={0}
            id={"Story" + index}
            header={item.story}
            self={item}
            content={item.childNodes.sort(sortByIndex)}
            setRecords={props.setRecords}
            setOperation={props.setOperation}
            menuButtons={props.menuButtons}
            activeButton={props.activeButton}
          />
        ))}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <Link
              className="accordion-button collapsed story link-flush"
              to="/links"
            >
              实用工具
            </Link>
          </h2>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed story"
              id="contact_button"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#contact_form_modal"
            >
              联系我们
            </button>
          </h2>
        </div>
      </div>
      <div className="d-none d-md-block" id="sprite_container">
        <div
          id="sprite"
          style={{
            backgroundImage: `url(${sprite_url.current})`,
            backgroundSize: "auto 350px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          id="about_modal_btn"
          data-bs-toggle="modal"
          data-bs-target="#about_modal"
        />
      </div>
      <NewsModal
        latestNews={newsArray}
        fetchNews={fetchNews}
        setUnread={setUnread}
      />
    </div>
  );
}

Menu.propTypes = {
  menu: propTypes.object.isRequired,
  activeButton: propTypes.object.isRequired,
  menuButtons: propTypes.object.isRequired,
};

function sortByIndex(a, b) {
  return parseInt(a.index) - parseInt(b.index);
}
