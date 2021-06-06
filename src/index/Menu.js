import React, { useEffect, useRef, useState } from "react";
import AccordionItem from "./AccordionItem";
import propTypes from "prop-types";
import { nanoid } from "nanoid";
import Modal from "../shared/Modal";

export default function Menu(props) {
  const sprite_array = [
    "../images/gif/surtr_s3.gif",
    "../images/gif/blaze_s3.gif",
    "../images/gif/mudrock_s3.gif",
  ];
  const sprite_url = useRef(sprite_array[~~(Math.random() * 3)]);
  const keyArray = useRef(props.menu.childNodes.map(() => nanoid()));

  const currentEpisodeObject =
    props.menu.childNodes[0].childNodes[18].childNodes;

  // const currentSVG = "../images/cc/spectrum/logo.svg";
  // const currentTitle = "../images/cc/spectrum/title.png";

  return (
    <div className="position-relative" id="menu">
      {props.news ? (
        <div className="latest-news d-flex justify-content-center">
          <button
            className="btn btn-news"
            data-bs-toggle="modal"
            data-bs-target="#news_modal"
          >
            合约总结
          </button>
        </div>
      ) : null}
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
              {/*/!* header *!/*/}
              {/*<div*/}
              {/*  className="position-absolute"*/}
              {/*  style={{*/}
              {/*    width: "10rem",*/}
              {/*    height: "1.8rem",*/}
              {/*    backgroundImage: `url(${currentTitle})`,*/}
              {/*    backgroundSize: "contain",*/}
              {/*    backgroundRepeat: "no-repeat",*/}
              {/*    top: "1rem",*/}
              {/*    opacity: "0.9",*/}
              {/*  }}*/}
              {/*/>*/}
              {/*/!* logo *!/*/}
              {/*<div*/}
              {/*  className="position-absolute"*/}
              {/*  style={{*/}
              {/*    width: "5rem",*/}
              {/*    height: "5rem",*/}
              {/*    backgroundImage: `url(${currentSVG})`,*/}
              {/*    backgroundSize: "contain",*/}
              {/*    backgroundRepeat: "no-repeat",*/}
              {/*    filter: "invert(1)",*/}
              {/*    opacity: "0.2",*/}
              {/*    right: "3.5rem",*/}
              {/*    top: "-1.5rem",*/}
              {/*  }}*/}
              {/*/>*/}
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
                        const button_id =
                          props.menuButtons.current[
                            operation.operation + " " + operation.cn_name
                          ].index;
                        document.querySelector("#btn" + button_id).click();
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
      <Modal id="news_modal" header="最新战报" Content={NewsContent} />
    </div>
  );
}

Menu.propTypes = {
  menu: propTypes.object.isRequired,
  setRecords: propTypes.func.isRequired,
  setOperation: propTypes.func.isRequired,
  activeButton: propTypes.object.isRequired,
  menuButtons: propTypes.object.isRequired,
};

function sortByIndex(a, b) {
  return parseInt(a.index) - parseInt(b.index);
}

function NewsContent() {
  const [imgSrc, setImgSrc] = useState();
  const keyArray = useRef([]);

  useEffect(() => {
    fetch("/api/news").then((resRaw) => {
      if (resRaw.ok) {
        resRaw.json().then((res) => {
          setImgSrc(res);
        });
      }
    });
  }, []);

  if (!imgSrc || imgSrc.length === 0) return null;
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
}
