import React, { useRef } from "react";
import AccordionItem from "./AccordionItem";
import propTypes from "prop-types";
import { nanoid } from "nanoid";

export default function Menu(props) {
  const sprite_array = [
    "../images/gif/surtr_s3.gif",
    "../images/gif/blaze_s3.gif",
    "../images/gif/mudrock_s3.gif",
  ];
  const sprite_url = useRef(sprite_array[~~(Math.random() * 3)]);
  const keyArray = useRef(props.menu.childNodes.map(() => nanoid()));

  const currentEpisodeObject =
    props.menu.childNodes[0].childNodes[17].childNodes;

  return (
    <div id="menu">
      <div className="accordion accordion-flush" id="Stories">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed story"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#currentEpisodeContent"
            >
              当前活动
            </button>
          </h2>
          <div
            id="currentEpisodeContent"
            className="accordion-collapse collapse"
            data-bs-parent="#Stories"
          >
            <div className="accordion accordion-flush">
              {currentEpisodeObject.map((operation) => (
                <div className="accordion-item" key={operation.operation}>
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
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#contact_form_modal"
            >
              联系我们
            </button>
          </h2>
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
      </div>
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
