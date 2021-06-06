import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import ContactForm from "./ContactForm";
import DefaultIndexContent from "./content/DefaultIndexContent";
import RecordsByOperation from "./content/RecordsByOperation";
import "../stylesheets/Index.css";
import LoadingComp from "../shared/LoadingComp";
import { useHistory } from "react-router-dom";
import RecordsByOperator from "./content/RecordsByOperator";

export default function IndexPage({
  user,
  setUser,
  menu,
  menuButtons,
  activeButton,
  collapseMenu,
  operator,
  operators,
  categories,
  operation,
  setOperation,
}) {
  const [records, setRecords] = useState();
  const [story, setStory] = useState();
  const [episode, setEpisode] = useState();
  const [news, setNews] = useState(true);

  let history = useHistory();

  // for new-password
  if (history.location.hash.startsWith("#")) {
    history.push(history.location.hash.replace("#", ""));
  }

  useEffect(() => {
    if (menu && operation) {
      for (let storyObject of menu.childNodes) {
        for (let episodeObject of storyObject.childNodes) {
          if (episodeObject.childNodes) {
            for (let operationObject of episodeObject.childNodes) {
              if (
                operationObject.operation === operation.operation &&
                operationObject.cn_name === operation.cn_name
              ) {
                setStory(storyObject.story);
                setEpisode(episodeObject.episode);
                break;
              }
            }
          }
        }
      }
    }
  }, [menu, operation]);

  useEffect(() => {
    if (operator || (operation && records)) {
      setNews(false);
    } else {
      setNews(true);
    }
  }, [operation, operator, records]);

  function MobileButtons() {
    return (
      <div>
        <button
          className="btn position-fixed bottom-0 end-0 d-md-none me-4 mb-5"
          id="fold_menu_btn"
          onClick={collapseMenu}
          style={{ zIndex: "1000" }}
        >
          折叠目录
        </button>
        <button
          className="btn position-fixed bottom-0 end-0 d-md-none me-4 mb-2"
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
          style={{ zIndex: "1000" }}
        >
          回到顶部
        </button>
      </div>
    );
  }

  function renderContent() {
    if (records && operation) {
      return (
        <RecordsByOperation
          story={story}
          episode={episode}
          operation={operation}
          user={user}
          setUser={setUser}
          menu={menu}
          records={records}
          menuButtons={menuButtons}
          operators={operators}
          categories={categories}
        />
      );
    } else if (operator) {
      return (
        <RecordsByOperator
          user={user}
          setUser={setUser}
          operator={operator}
          menu={menu}
          operators={operators}
          categories={categories}
        />
      );
    } else {
      return <DefaultIndexContent />;
    }
  }

  if (!menu) {
    return <LoadingComp />;
  }
  return (
    <div className="container-xxl pt-2 pt-md-3 d-md-flex">
      <Menu
        menu={menu}
        setRecords={setRecords}
        setOperation={setOperation}
        activeButton={activeButton}
        menuButtons={menuButtons}
        news={news}
      />
      <div className="ms-md-4 mt-5 mt-md-0" id="content">
        {renderContent()}
      </div>
      <ContactForm />
      <MobileButtons />
    </div>
  );
}
