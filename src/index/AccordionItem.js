import React, { useRef } from "react";
import propTypes from "prop-types";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

/**
 * @param props.index
 * @param props.parent
 * @param props.parentIndex
 * @param props.id
 * @param props.header
 * @param props.self
 * @param props.content
 * @param props.setRecords
 * @param props.setOperation
 * @param props.menuButtons
 * @returns {JSX.Element}
 * @constructor
 */
export default function AccordionItem(props) {
  // random keys for map
  const keyArray = useRef();
  if (props.content && !keyArray.current) {
    keyArray.current = props.content.map(() => nanoid());
  }
  // generate an array in order
  let name, index, level;
  if (props.self.story) {
    level = "story";
    name = props.self.story;
    index = (props.index + 1) * 10000;
  } else if (props.self.episode) {
    level = "episode";
    name = props.self.episode;
    index = (props.index + 1) * 100 + props.parentIndex;
  } else if (props.self.operation) {
    level = "operation";
    name = props.self.operation + " " + props.self.cn_name;
    index = props.index + 1 + props.parentIndex;
  } else {
    console.log("err", props.self);
  }
  if (!props.menuButtons.current[name]) {
    props.menuButtons.current[name] = {
      index: index,
    };
  }

  async function getOperation() {
    const resRaw = await fetch("/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operation: props.self.operation,
        cn_name: props.self.cn_name,
      }),
    });
    if (!resRaw.ok) {
      const res = await resRaw.text();
      toast.warning(res);
    } else {
      const records = await resRaw.json();
      // console.log(records);
      props.setRecords(records);
      props.setOperation(props.self);
      // desktop
      if (window.matchMedia("(min-width: 768px)").matches) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const contentTop =
          document.querySelector("#content").getBoundingClientRect().top +
          window.scrollY;
        const scroll_to = contentTop - 60;
        setTimeout(() => {
          window.scroll({ top: scroll_to, behavior: "smooth" });
        }, 200);
      }
    }
  }

  function renderEpisode() {
    return (
      <div
        className="accordion accordion-flush"
        id={props.id + "ContentParent"}
      >
        {props.content.map((item, i) => (
          <AccordionItem
            key={keyArray.current[i]}
            index={i}
            parent={props.id + "ContentParent"}
            parentIndex={index}
            id={"Episode" + i}
            header={item.episode}
            self={item}
            content={
              item.childNodes ? item.childNodes.sort(sortByIndex) : undefined
            }
            setRecords={props.setRecords}
            setOperation={props.setOperation}
            menuButtons={props.menuButtons}
            activeButton={props.activeButton}
          />
        ))}
      </div>
    );
  }

  function renderOperation() {
    return (
      <div
        className="accordion accordion-flush"
        id={props.id + "ContentParent"}
      >
        {props.content.map((item, i) => (
          <AccordionItem
            key={keyArray.current[i]}
            index={i}
            parent={props.id + "ContentParent"}
            parentIndex={index}
            id={"Operation" + i}
            header={item.operation + " " + item.cn_name}
            self={item}
            setRecords={props.setRecords}
            setOperation={props.setOperation}
            menuButtons={props.menuButtons}
            activeButton={props.activeButton}
          />
        ))}
      </div>
    );
  }

  function render() {
    return (
      <div
        id={props.id + "Content"}
        className="accordion-collapse collapse"
        aria-labelledby={props.id}
        data-bs-parent={"#" + props.parent}
      >
        {props.self.story ? renderEpisode() : renderOperation()}
      </div>
    );
  }

  async function handleClick(evt) {
    if (props.self.story) {
      if (props.activeButton.current[0]) {
        if (props.activeButton.current[0].innerText === evt.target.innerText) {
          props.activeButton.current[0] = undefined;
        }
      } else {
        props.activeButton.current[0] = evt.target;
      }
    } else if (props.self.episode) {
      if (props.activeButton.current[1]) {
        if (props.activeButton.current[1].innerText === evt.target.innerText) {
          props.activeButton.current[1] = undefined;
        }
      } else {
        props.activeButton.current[1] = evt.target;
      }
    } else if (props.self.operation) {
      await getOperation();
    } else {
      console.log("err", props.self);
    }
  }

  if (level === "episode" && name === "-") {
    return props.content ? renderOperation() : null;
  }

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={props.id}>
        <button
          id={"btn" + index}
          className={"accordion-button collapsed " + level}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#" + props.id + "Content"}
          aria-expanded="false"
          aria-controls={props.id + "Content"}
          onClick={handleClick}
        >
          {props.header}
        </button>
      </h2>
      {props.content ? render() : null}
    </div>
  );
}

AccordionItem.propTypes = {
  parent: propTypes.string.isRequired,
  parentIndex: propTypes.number,
  id: propTypes.string.isRequired,
  header: propTypes.string.isRequired,
  self: propTypes.object.isRequired,
  setRecords: propTypes.func.isRequired,
  setOperation: propTypes.func.isRequired,
  menuButtons: propTypes.object.isRequired,
  index: propTypes.number.isRequired,
  activeButton: propTypes.object.isRequired,
  content: propTypes.array,
};

function sortByIndex(a, b) {
  return parseInt(a.index) - parseInt(b.index);
}
